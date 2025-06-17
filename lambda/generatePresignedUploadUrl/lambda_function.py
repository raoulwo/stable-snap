import json
import boto3
import uuid

s3 = boto3.client('s3')
BUCKET = 'stablesnap-upload-images'

def lambda_handler(event, context):
    image_id = f"{uuid.uuid4()}.jpg"

    url = s3.generate_presigned_url(
        'put_object',
        Params={'Bucket': BUCKET, 'Key': image_id, 'ContentType': 'image/jpeg'},
        ExpiresIn=300
    )

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"upload_url": url, "image_id": image_id})
    }
