from fileinput import filename
from decimal import Decimal
import json
import boto3
import os
import re
import get_license_type
import get_development_lang
import get_maturity
import get_contributor
import get_popularity_rating
import get_testibility

# Connect to AWS services
s3 = boto3.resource('s3')
dynamo = boto3.resource('dynamodb')
is_local = 'AWS_SAM_LOCAL' in os.environ
s3_bucket_name = os.environ["S3_BUCKET"]
oss_table_name = os.environ["OSS_TABLE"]

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
    data = event
    owner = data['owner']
    repo = data["repo"]
    tmp_folder = '/tmp'
    project_row = {}
    json_files = {}

    # Download all files and store to tmp
    bucket = s3.Bucket(s3_bucket_name)
    file_list = bucket.objects.filter(Prefix=f"{owner}/{repo}")
    
    for obj in file_list:
        json_filename = get_filename(obj.key)
        output_path = tmp_folder + '/' + json_filename
        bucket.download_file(obj.key, output_path)
        with open(output_path, 'r') as f:
            json_files[json_filename] = json.load(f)

    # Calculate value, score base on given key, function, file name
    func_list = [
        ('license', get_license_type, 'license.json'), 
        ('maturity', get_maturity, 'repo-info.json'),
        ('development_lang', get_development_lang, 'language.json'),
        ('contributor', get_contributor, 'contributor.json'),
        ('popularity', get_popularity_rating, 'repo-info.json'),
        ('testibility', get_testibility, 'sonar-info.json')
    ]

    for field, func, json_filename in func_list:
        print('func:', field, json_filename)
        data = json_files.get(json_filename)
        value = func.get_value(data)
        score = func.get_score(value)
        project_row[f"{field}_score"] = score
        project_row[f"{field}_value"] = value

    # Creating project info record
    repo_info = json_files.get("repo-info.json")
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

    return respond(None, project_row)