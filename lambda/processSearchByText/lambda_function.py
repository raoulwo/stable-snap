import boto3
import json
from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth

# Config
region = "eu-central-1"
service = "es"
host = 'search-search-stablesnap-dev-g4zn3qof7ucg6qy7izlimgeota.eu-central-1.es.amazonaws.com'
index_name = "stablesnap-images"
s3_bucket = "stablesnap-upload-images"
S3_URL_EXPIRATION_IN_SECONDS = 300

credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(
    credentials.access_key,
    credentials.secret_key,
    region,
    service,
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


def extract_keywords_from_claude(query):
    prompt = (
        f"Human: Extract relevant visual tags (like AWS Rekognition would) from the following sentence. "
        f"Only return a JSON list of strings. No explanations. Sentence: \"{query}\"\n\nAssistant:"
    )

    body = {
        "prompt": prompt,
        "max_tokens_to_sample": 100,
    }

    response = bedrock.invoke_model(
        modelId="anthropic.claude-instant-v1",
        contentType="application/json",
        accept="application/json",
        body=json.dumps(body)
    )

    result = json.loads(response["body"].read())
    try:
        tags = json.loads(result["completion"])
        if isinstance(tags, list):
            return tags
        else:
            print("[WARN] Claude response not a list:", result["completion"])
            return []
    except Exception as e:
        print("[ERROR] Failed to parse Claude output:", e)
        return []


def lambda_handler(event, context):
    query = event.get("queryStringParameters", {}).get("q", "").strip()
    if not query:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Missing query parameter 'q'"})
        }
    print(f"[INFO] Search query: {query}")

    tags = extract_keywords_from_claude(query)
    if not tags:
        print("[WARN] Claude returned no keywords. Using as fallback the search query.")
        tags = [query]
    else:
        print(f"[INFO] Extracted keywords from Claude: {tags}")


    body = {
        "query": {
            "multi_match": {
                "query": query,
                "fields": ["description", "tags"],
                "fuzziness": "AUTO"
            }
        }
    }

    try:
        response = client.search(index=index_name, body=body)
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
        print(f"[MATCH {i + 1}] image_id: {image_id} | tags: {tags}")

        try:
            url = s3_client.generate_presigned_url(
                "get_object",
                Params={"Bucket": s3_bucket, "Key": doc["url_key"]},
                ExpiresIn=S3_URL_EXPIRATION_IN_SECONDS
            )
        except Exception as e:
            print(f"[ERROR] Failed to create S3 URL for image_id {image_id}: {e}")
            url = None

        results.append({
            "image_id": image_id,
            "timestamp": doc.get("timestamp", ""),
            "url": url,
            "description": doc.get("description", ""),
            "tags": tags
        })

    print(f"[INFO] Returning {len(results)} result(s) to client.")

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(results)
    }
