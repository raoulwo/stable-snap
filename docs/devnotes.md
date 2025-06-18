# Impl

Info:

- Unter "https://eu-central-1.console.aws.amazon.com/rekognition/home?region=eu-central-1#/label-detection" könnt ihr
  mit Rekognition rumspielen.
- Alle Anwendungen sollten den AWS Tag "dashboard" haben:
  "https://eu-central-1.console.aws.amazon.com/console/applications/09klyok0rj1pog8ujajhyaco65?region=eu-central-1"

**API Gateway:**

- `stablesnap-search-api`
    - HTTP API
    - Invoke URL: `https://a7bcbzq751.execute-api.eu-central-1.amazonaws.com`
    - Example: GET `https://a7bcbzq751.execute-api.eu-central-1.amazonaws.com/search?q=bulldozer`
- `stablesnap-upload-api`
    - HTTP API
    - Invoke URL: `https://3v58kycltg.execute-api.eu-central-1.amazonaws.com`
    - Example: POST `https://3v58kycltg.execute-api.eu-central-1.amazonaws.com/upload-url`

**AWS Amplify:**

- APP-ID: `d3o6ne5iarnhgn`
- Domain: `https://main.d3o6ne5iarnhgn.amplifyapp.com/`

**S3 Bucket:**
`stablesnap-upload-images`

**AWS Rekognition:**

- wird von AWS Lambda `processUploadedImage` aufgerufen und erstellt Tags (z.B. Bulldozer, Light, Person, Building,
  House)

**Amazon Bedrock:**

- `anthropic.claude-instant-v1`
- wird von AWS Lambda `processSearchByText` aufgerufen
- `processSearchByText`:
    - Generiert die Opensearch Query anhand der User Search Query

**Lambdas:**

- `processUploadedImage`:
    - `arn:aws:lambda:eu-central-1:605134439536:function:processUploadedImage`
- `processSearchByText`:
    - `arn:aws:lambda:eu-central-1:605134439536:function:processSearchByText`
- `generatePresignedUploadUrl`
    - `arn:aws:lambda:eu-central-1:605134439536:function:generatePresignedUploadUrl`

**OpenSearch:**

- Domain: `opensearch-stablesnap`
- Index: `stablesnap-index`
- Host: `search-opensearch-stablesnap-5tqvaof2f5me6wuwz5xlbop2su.eu-central-1.es.amazonaws.com`
- Public access BUT Access policy
- Access Policy: only `processUploadedImage-role-h6phvayi` & `processSearchByText-role-5l94rlbo` have access (via ARN)

**EventBridge Rules:**

- `OnS3ImageUpload`:
    - Target: `arn:aws:lambda:eu-central-1:605134439536:function:processUploadedImage`
    - Code:
      ```
      {
        "source": ["aws.s3"],
        "detail-type": ["Object Created"],
        "detail": {
          "bucket": {
            "name": ["stablesnap-upload-images"]
          }
        }
      }
      ```

**Roles:**

- Lambda::`processUploadedImage`
    - `processUploadedImage-role-h6phvayi`
    - Polices:
        - s3:GetObject
        - rekognition:DetectLabels
        - es:ESHttpPost
        - es:ESHttpGet
        - es:ESHttpPut
- Lambda::`processSearchByText`
    - `processSearchByText-role-5l94rlbo`
    - Policies:
        - bedrock:InvokeModel
        - es:ESHttpPost
        - es:ESHttpGet
        - es:ESHttpPut
        - s3:GetObject
- Lambda::`generatePresignedUploadUrl`
    - `generatePresignedUploadUrl-role-z6zxs0nz`
    - Policies:
        - s3:PutObject
- EventBridge::`OnS3ImageUpload`
    - `Amazon_EventBridge_Invoke_Lambda_ProcessUploadedImage`
    - Policies.
        - `lambda:InvokeFunction`