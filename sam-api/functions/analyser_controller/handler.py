import json
import boto3
import get_license
import get_primary_lang
import get_project_age
import datetime
import os
from decimal import Decimal
import re

# Connect to AWS services
s3 = boto3.resource('s3')
dynamo = boto3.resource('dynamodb')

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

def get_filename(link):
    result = re.search(r"([\w\d\-]+\.json)$", link)
    group = result.groups()
    name = group[0]
    return name

def lambda_handler(event, context):
    print(event)
    # Detech Env Local or AWS
    # data = json.loads(event)
    data = event
    owner = data['owner']
    repo = data["repo"]
    is_local = 'AWS_SAM_LOCAL' in os.environ
    s3_bucket_name = os.environ["S3_BUCKET"]
    oss_table_name = os.environ["OSS_TABLE"]
    tmp_folder = '/tmp'
    project_row = {}

    if is_local:
        s3_bucket_name = 'sam-app-srcbucket-1u946t1s7gggp'
        oss_table_name = 'sam-app-OSSTable-1RQGU0QP816EO'

    # Download all files and store to tmp
    bucket = s3.Bucket(s3_bucket_name)
    file_list = bucket.objects.filter(Prefix=f"{owner}/{repo}")
    
    for obj in file_list:
        file_name = get_filename(obj.key)
        bucket.download_file(obj.key, tmp_folder + '/' + file_name)

    # Calculate value, score base on given key, function, file name
    func_list = [
        ('license', get_license, 'license.json'), 
        ('age', get_project_age, 'repo-info.json'),
        ('primary_language', get_primary_lang, 'language.json')
    ]

    for field, func, file_name in func_list:
        file_path = f'{tmp_folder}/{file_name}'
        with open(file_path, 'r') as f:
            data = json.load(f)
            value = func.get_value(data)
            score = func.get_score(value)
            project_row[f"{field}_score"] = score
            project_row[f"{field}_value"] = value


    # Creating project info record
    with open(f'{tmp_folder}/repo-info.json', 'r') as f:
        repo_info = json.load(f)
        project_row['id'] = repo_info["full_name"]
        project_row["name"] = repo_info["name"]
        project_row["created_at"] = repo_info["created_at"]
        project_row["updated_at"] = repo_info["updated_at"]
        project_row["description"] = repo_info["description"]
        project_row["star"] = repo_info["stargazers_count"]
        project_row["website"] = repo_info["homepage"]

    # Save project to table
    oss_table = dynamo.Table(oss_table_name)
    row = oss_table.get_item(Key={'id': project_row['id']})

    if 'Item' not in row:
        # Create a new project record
        item = json.loads(json.dumps(project_row), parse_float=Decimal)
        new_row = oss_table.put_item(Item=item)

    return respond(None, 'OK')
