import json

import boto3
from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth

# Config
host = 'search-opensearch-stablesnap-5tqvaof2f5me6wuwz5xlbop2su.eu-central-1.es.amazonaws.com'
index_name = "stablesnap-index"
region = "eu-central-1"
s3_bucket = "stablesnap-upload-images"

credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(
    credentials.access_key,
    credentials.secret_key,
    region,
    "es",
    session_token=credentials.token
)

client = OpenSearch(
    hosts=[{"host": host, "port": 443}],
    http_auth=awsauth,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection
)

s3_client = boto3.client("s3")
bedrock = boto3.client("bedrock-runtime")


def build_opensearch_query_with_ai(query: str):
    prompt = (
        f"Human: You are a helpful assistant that translates natural language image search queries into OpenSearch JSON queries.\n"
        f"\n"
        f"    Instructions:\n"
        f"    - Only use the field \"tags\"\n"
        f"    - Use 'must' for included terms and 'must_not' for excluded ones\n"
        f"    - Use 'match' only\n"
        f"    - Return ONLY valid JSON. No text.\n"
        f"\n"
        f"    Examples:\n"
        f"\n"
        f"    Query: \"bulldozer without person\"\n"
        f"    Return:\n"
        f"    {{\n"
        f"      \"query\": {{\n"
        f"        \"bool\": {{\n"
        f"          \"must\": [{{ \"match\": {{ \"tags\": \"bulldozer\" }} }}],\n"
        f"          \"must_not\": [{{ \"match\": {{ \"tags\": \"person\" }} }}]\n"
        f"        }}\n"
        f"      }}\n"
        f"    }}\n"
        f"\n"
        f"    Query: \"person with bulldozer\"\n"
        f"    Return:\n"
        f"    {{\n"
        f"      \"query\": {{\n"
        f"        \"bool\": {{\n"
        f"          \"must\": [\n"
        f"            {{ \"match\": {{ \"tags\": \"person\" }} }},\n"
        f"            {{ \"match\": {{ \"tags\": \"bulldozer\" }} }}\n"
        f"          ]\n"
        f"        }}\n"
        f"      }}\n"
        f"    }}\n"
        f"\n"
        f"    Now create the JSON query for: \"{query}\"\n"
        f"\n"
        f"    Assistant:")

    body = {
        "prompt": prompt,
        "max_tokens_to_sample": 500,
    }

    try:
        response = bedrock.invoke_model(
            modelId="anthropic.claude-instant-v1",
            contentType="application/json",
            accept="application/json",
            body=json.dumps(body)
        )

        result = json.loads(response["body"].read())
        text = result.get("completion", "").strip()
        print(f"[DEBUG] Model raw response: {text}")

        parsed = json.loads(text)
        if isinstance(parsed, dict) and "query" in parsed:
            return parsed
        else:
            raise ValueError(f"[WARN] Invalid OpenSearch query format from model: {parsed}")
    except Exception as e:
        print(f"[ERROR] Failed to parse model output: {e}")
        return None


def lambda_handler(event, context):
    query = event.get("queryStringParameters", {}).get("q", "").strip()

    if not query:
        print("[INFO] Empty query – return all documents")
        opensearch_body = {
            "query": {"match_all": {}},
            "sort": [{"timestamp": {"order": "desc"}}],
            "size": 100
        }
    else:
        print(f"[INFO] Search query: '{query}'")
        opensearch_body = build_opensearch_query_with_ai(query)
        if opensearch_body is None:
            print("[WARN] Fallback to multi_match on 'tags'")
            opensearch_body = {
                "query": {
                    "multi_match": {
                        "query": query,
                        "fields": ["tags"],
                        "fuzziness": "AUTO"
                    }
                }
            }
        opensearch_body["sort"] = [{"_score": {"order": "desc"}}, {"timestamp": {"order": "desc"}}]
        opensearch_body["size"] = 100

    try:
        response = client.search(index=index_name, body=opensearch_body)
        hits = response["hits"]["hits"]
        print(f"[INFO] Found {len(hits)} matching documents.")
    except Exception as e:
        print(f"[ERROR] OpenSearch error: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Search failed"})
        }

    results = []
    for i, hit in enumerate(hits):
        doc = hit["_source"]
        image_id = doc.get("image_id", "N/A")
        tags = doc.get("tags", [])

        if not image_id or not tags:
            print(f"[WARN] Document {i + 1} missing image_id or tags, skipping.")
            continue

        print(f"[MATCH {i + 1}] image_id: {image_id} | tags: {tags}")

        try:
            url = s3_client.generate_presigned_url(
                "get_object",
                Params={"Bucket": s3_bucket, "Key": doc["url_key"]},
                ExpiresIn=500
            )
        except Exception as e:
            print(f"[ERROR] Failed to create S3 URL for image_id {image_id}: {e}")
            url = None

        results.append({
            "image_id": image_id,
            "timestamp": doc.get("timestamp", ""),
            "url": url,
            "tags": tags
        })

    print(f"[INFO] Returning {len(results)} result(s) to client.")

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        },
        "body": json.dumps(results)
    }
