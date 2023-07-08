from datetime import datetime, timedelta
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
    # Show info for debuging purpose
    print(event)
    
    # Get owner and repo from event
    repo = event['repo']
    owner = event['owner']
    today = datetime.now()
    six_month_early = today - timedelta(days=180)
    api_quata = 5000
    has_next_page = True
    rows = []
    issue_date = today
    page = 1
    
    # Add access token when calling the GitHub api
    headers = None
    token_list = []

    if 'access_token' in event and len(event['access_token']) > 0:
        token_list = list(event['access_token'])
        access_token = token_list.pop()
        headers={ 'Authorization': f'Bearer {access_token}' }

    while has_next_page and (api_quata > 0) and (issue_date > six_month_early):
        # Get repository license
        response = requests.get(f'https://api.github.com/repos/{owner}/{repo}/issues', 
            params={ 
                "state": 'all',
                "per_page": 100, 
                'page': page 
            },
            headers=headers
        )

        # Checking API Quata Every call
        api_quata = int(response.headers["X-RateLimit-Remaining"])
        print("API QUATA:", str(api_quata))

        # Fill API Quata by switching access token
        if api_quata == 0 and len(token_list) > 0:
            access_token = token_list.pop()
            print("Switch Access Token", str(access_token))
            headers={ 'Authorization': f'Bearer {access_token}' }
            api_quata = 5000

        # Checking Next Page
        has_next_page = 'next' in response.links

        # Status code is ok
        if response.status_code == 200:
            data = response.json()
            rows.extend(data)
            page = page + 1

            # Check issue date is reached yet or not
            if len(data) > 0:
                last_row = data[-1]
                issue_date = datetime.strptime(last_row['created_at'], "%Y-%m-%dT%H:%M:%SZ")

        # Slow down for 1 sec
        time.sleep(1)

    # Throw error when exceed maxumum request
    if api_quata <= 0:
        return respond(ValueError("Exceed maximum request from GitHub"))

    # Create json file to tmp folder
    file_name = 'issue.json'
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
        MessageBody='issue_status',
        MessageDeduplicationId=destination_url,
        MessageGroupId=repo,
        MessageAttributes={
            'function_name': {
                'StringValue': 'get_issue',
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
