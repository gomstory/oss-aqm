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
    api_quata = 5000
    headers = None
    rows = []
    page = 1

    # Add access token when calling the Github api
    if 'access_token' in event:
        token_list = list(event['access_token'])
        access_token = token_list.pop()
        headers={ 'Authorization': f'Bearer {access_token}' }

    while has_next_page and api_quata > 0:
        # Get repository license
        response = requests.get(f'https://api.github.com/orgs/{owner}/members', 
            params={ 
                "per_page": 100, 
                "page": page 
            },
            headers=headers
        )

        # Checking API Quata Every call
        api_quata = int(response.headers["X-RateLimit-Remaining"])

        # Checking Next Page
        has_next_page = 'next' in response.links

        if response.status_code == 200:
            data = response.json()
            rows.extend(data)
            page = page + 1

        # Slow down for 2 sec
        time.sleep(2)

   # Throw error when exceed maxumum request
    if api_quata <= 0:
        raise respond(ValueError("Exceed maximum request from Github"))

    # Create json file to tmp folder
    file_name = 'core-team.json'
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
        MessageBody='core_team_status',
        MessageDeduplicationId=destination_url,
        MessageGroupId=repo,
        MessageAttributes={
            'function_name': {
                'StringValue': 'get_core_team',
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
