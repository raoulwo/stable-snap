from datetime import datetime

import boto3
from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth

# Config
host = 'search-opensearch-stablesnap-5tqvaof2f5me6wuwz5xlbop2su.eu-central-1.es.amazonaws.com'
index_name = "stablesnap-index"
region = "eu-central-1"

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

rekognition = boto3.client("rekognition")

def create_index_if_not_exists():
    try:
        if client.indices.exists(index=index_name):
            return
        print(f"[INFO] Index '{index_name}' does not exist. Creating...")

        client.indices.create(index=index_name, body={
            "mappings": {
                "properties": {
                    "image_id": {"type": "keyword"},
                    "timestamp": {"type": "date"},
                    "tags": {"type": "text"},
                    "confidence": {
                        "type": "nested",
                        "properties": {
                            "tag": {"type": "keyword"},
                            "value": {"type": "float"}
                        }
                    },
                    "url_key": {"type": "keyword"}
                }
            }
        })
        print(f"[INFO] Index '{index_name}' created successfully.")
    except Exception as e:
        print(f"[ERROR] Failed to check/create index: {e}")


def lambda_handler(event, context):
    create_index_if_not_exists()

    record = event["detail"]["object"]
    bucket = event["detail"]["bucket"]["name"]
    key = record["key"]

    image_id = f"s3://{bucket}/{key}"
    url_key = key.split("/")[-1]
    timestamp = datetime.utcnow().isoformat() + "Z"

    print(f"[INFO] Processing image: {image_id}")

    rek_response = rekognition.detect_labels(
        Image={"S3Object": {"Bucket": bucket, "Name": key}},
        MaxLabels=15,
        MinConfidence=60
    )

    labels = rek_response.get("Labels", [])
    if not labels:
        print("[WARN] No labels found")
        return {"statusCode": 200, "body": "No labels"}

    tags = []
    confidence = []

    for label in labels:
        name = label["Name"]
        conf = round(float(label["Confidence"]), 1)
        tags.append(name)
        confidence.append({"tag": name, "value": conf})


    print(f"[INFO] Tags: {tags}")

    document = {
        "image_id": image_id,
        "timestamp": timestamp,
        "tags": tags,
        "confidence": confidence,
        "url_key": url_key
    }

    response = client.index(index=index_name, body=document, id=image_id)
    print(f"[INFO] OpenSearch index response: {response}")

    return {
        "statusCode": 200,
        "body": f"Indexed {image_id} with description"
    }
