import json
import requests
import boto3
import os
import time

# Connect to AWS
bucket_name = os.environ['S3_BUCKET']
queue_name = os.environ['STOP_CRAWLER_QUEUE']
s3 = boto3.client('s3')
sqs = boto3.client('sqs')

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': str(err) if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

def lambda_handler(event, context):
    # Get owner and repo from event
    repo = event['repo']
    owner = event['owner']
    has_next_page = True
    headers = None
    api_qata = 5000
    page = 1
    rows = []

    # Add access token when calling the Github api
    if 'access_token' in event:
        token_list = list(event["access_token"])
        access_token = token_list.pop()
        headers={ 'Authorization': f'Bearer {access_token}' }

    while(has_next_page and api_qata > 0 and page < 5):
        # Get repository license
        response = requests.get(f'https://api.github.com/repos/{owner}/{repo}/releases',
            params={ 
                'per_page': 100,
                'page': page
            },
            headers=headers
        )

        if response.status_code == 200:
            data = response.json()
            rows.extend(data)
            page = page + 1

        # Checking Next Page
        has_next_page = 'next' in response.links

        # Checking API Quata
        api_qata = int(response.headers["X-RateLimit-Remaining"])

        # Slow down for 2 sec
        time.sleep(2)

    # Create json file to tmp folder
    file_name = 'release.json'
    file_path = os.path.join('/tmp', repo, file_name)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w') as f:
        json.dump(rows, f)

    # Upload S3 bucket
    destination_url = f"{owner}/{repo}/{file_name}"
    s3.upload_file(file_path, bucket_name, destination_url)

    # Add queue to inform completion
    response = sqs.send_message(
        QueueUrl=queue_name,
        MessageBody='release_status',
        MessageDeduplicationId=destination_url,
        MessageGroupId=repo,
        MessageAttributes={
            'function_name': {
                'StringValue': 'get_release',
                'DataType': 'String'
            },
            'owner': {
                'StringValue': owner,
                'DataType': 'String'
            },
            'repo': {
                'StringValue': repo,
                'DataType': 'String'
            },
            'upload_url': {
                'StringValue': destination_url,
                'DataType': 'String'
            },
            'status': {
                'StringValue': 'completed',
                'DataType': 'String'
            }
        }
    )

    return respond(None, 'OK')