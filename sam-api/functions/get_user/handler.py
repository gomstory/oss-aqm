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
    max_pages = 10
    repo = event['repo']
    owner = event['owner']
    github_url = f'https://github.com/{owner}/{repo}/network/dependents'
    r = requests.get(github_url)
    soup = BeautifulSoup(r.content, "html.parser")

    # Initial values
    data['used_by'] = 0
    data["result"] = []

    # Find total repositories that have been using
    used_by_div = soup.find('a', { 
        "class": "btn-link", 
        "href": f"/{owner}/{repo}/network/dependents?dependent_type=REPOSITORY" 
    })
        
    if used_by_div is not None:
        used_by_text = used_by_div.text
        used_by_total = used_by_text.replace("\n", "").replace("Repositories", "").replace(" ", "").replace(",", "")
        data['used_by'] = int(used_by_total)
        data["result"] = []

    if data['used_by'] > 0:        
        for i in range(max_pages):
            r = requests.get(github_url)
            soup = BeautifulSoup(r.content, "html.parser")

            # Get repo name from html
            page_data = [
                "{}/{}".format(
                    t.find('a', {"data-repository-hovercards-enabled":""}).text,
                    t.find('a', {"data-hovercard-type":"repository"}).text
                )

                for t in soup.findAll("div", {"class": "Box-row"})
            ]

            # Store user and repo of users
            for row in page_data:
                result = re.search(r"([\w\d\-\_]+)\/([\w\d\-\_]+)", row)

                if result is not None:                    
                    group = result.groups()
                    owner_key = group[0]
                    repo_key = group[1]
                    data["result"].append({
                        "github_id": row,
                        "owner": owner_key,
                        "repo": repo_key
                    })

            # Find Next pagination
            paging_div = soup.find("div", {"class":"paginate-container"}).find('a')

            if paging_div:
                github_url = paging_div["href"]
            else:
                break

            # Slow down for a sec
            time.sleep(3)

    # Create json file to tmp folder
    file_name = 'user.json'
    file_path = os.path.join('/tmp', repo, file_name)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w') as f:
        json.dump(data, f)

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
