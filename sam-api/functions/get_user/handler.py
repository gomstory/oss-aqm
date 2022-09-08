import json
import requests
import boto3
import os
import time
import requests
from bs4 import BeautifulSoup
import re

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
    data = {}
    repo = event['repo']
    owner = event['owner']
    has_next_page = True
    api_quata = 5000
    page = 1
    result = {
        # How many repository used by
        "used_by": 0,
        # Total of Stargazers who stared the repo
        "result": []
    }

    # Get used by repository
    github_url = f'https://github.com/{owner}/{repo}/network/dependents'
    r = requests.get(github_url)
    soup = BeautifulSoup(r.content, "html.parser")

    # Find total repositories that have been using
    used_by_div = soup.find('a', { 
        "class": "btn-link", 
        "href": f"/{owner}/{repo}/network/dependents?dependent_type=REPOSITORY" 
    })
        
    if used_by_div is not None:
        used_by_text = used_by_div.text
        used_by_total = used_by_text.replace("\n", "").replace("Repositories", "").replace(" ", "").replace(",", "")
        result['used_by'] = int(used_by_total)

    # Find startgazers list
    # Add access token when calling the Github api
    headers = None
    token_list = []

    if 'access_token' in event:
        token_list = list(event['access_token'])
        access_token = token_list.pop()
        headers={ 'Authorization': f'Bearer {access_token}' }

    while has_next_page and api_quata > 0:
        # Get repository license
        response = requests.get(f'https://api.github.com/repos/{owner}/{repo}/subscribers', 
            params={ 
                "state": 'all',
                "per_page": 100, 
                'page': page 
            },
            headers=headers
        )

        # Checking API Quata Every call
        api_quata = int(response.headers["X-RateLimit-Remaining"])

        # Fill API Quata by switching access token
        if has_next_page and api_quata == 0 and len(token_list) > 0:
            access_token = token_list.pop()
            headers={ 'Authorization': f'Bearer {access_token}' }
            api_quata = 5000

        # Checking Next Page
        has_next_page = 'next' in response.links

        # Status code is ok
        if response.status_code == 200:
            data = response.json()
            result["result"].extend(data)
            page = page + 1

        # Slow down for 1 sec
        time.sleep(1)

    # Throw error when exceed maxumum request
    if api_quata <= 0:
        raise respond(ValueError("Exceed maximum request from Github"))

    # Create json file to tmp folder
    file_name = 'user.json'
    file_path = os.path.join('/tmp', repo, file_name)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w') as f:
        json.dump(result, f)

    # Upload S3 bucket
    destination_url = f"{owner}/{repo}/{file_name}"
    s3.upload_file(file_path, bucket_name, destination_url)

    # Add queue to inform completion
    response = sqs.send_message(
        QueueUrl=queue_name,
        MessageBody='user_status',
        MessageGroupId=repo,
        MessageAttributes={
            'function_name': {
                'StringValue': 'get_user',
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
