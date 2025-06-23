import boto3
import json
from urllib.parse import unquote
from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth

HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*"
}

region = "eu-central-1"
index_name = "stablesnap-index"
host = "search-opensearch-stablesnap-5tqvaof2f5me6wuwz5xlbop2su.eu-central-1.es.amazonaws.com"

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

s3 = boto3.client("s3")


def lambda_handler(event, context):
    raw_id = event.get("queryStringParameters", {}).get("id", "")
    image_id = unquote(raw_id)

    print(f"[INFO] Deleting image: '{image_id}'")

    if not image_id:
        print("[ERROR] mage ID is required.")
        return response(400, {"error": "Image ID is required."})
    if not image_id.startswith("s3://"):
        print("[ERROR] Invalid Image ID format. Must start with 's3://'.")
        return response(400, {"error": "Invalid Image ID format. Must start with 's3://'."})

    try:
        bucket, key = image_id.replace("s3://", "", 1).split("/", 1)
    except ValueError:
        print("[ERROR] Invalid S3 path format.")
        return response(400, {"error": "Invalid S3 path format."})

    try:
        print(f"[INFO] S3 Delete: bucket={bucket}, key={key}")
        s3.delete_object(Bucket=bucket, Key=key)
    except Exception as s3_err:
        print(f"[ERROR] S3 Deletion failed: {s3_err}")
        return response(500, {"error": f"S3 deletion failed: {str(s3_err)}"})

    try:
        print(f"[INFO] OpenSearch Delete: {image_id}")
        client.delete(index=index_name, id=image_id)
    except Exception as os_err:
        print(f"[ERROR] OpenSearch deletion failed: {os_err}")
        return response(500, {"error": f"OpenSearch deletion failed: {str(os_err)}"})

    return response(200, {"status": "deleted", "id": image_id})


def response(status_code, body_dict):
    return {
        "statusCode": status_code,
        "headers": HEADERS,
        "body": json.dumps(body_dict)
    }
