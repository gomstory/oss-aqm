import json
import boto3
import get_license
import get_primary_lang
import datetime
import os
from decimal import Decimal

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

def lambda_handler(event, context):
    print(event)
    # Detech Env Local or AWS
    is_local = 'AWS_SAM_LOCAL' in os.environ
    s3_bucket_name = os.environ["S3_BUCKET"]
    oss_table_name = os.environ["OSS_TABLE"]
    crawler_table_name = os.environ['CRAWLER_TABLE']

    if is_local:
        s3_bucket_name = 'sam-app-srcbucket-1u946t1s7gggp'
        oss_table_name = 'sam-app-OSSTable-1RQGU0QP816EO'
        crawler_table_name = 'sam-app-CrawlerTable-1A73KOOKC96LH'

    owner = event['owner']
    repo = event['repo']

    # Creating project info record
    project_info = {}
    project_info['id'] = f'{owner}-{repo}'
    project_info["name"] = repo
    project_info["updated_date"] = str(datetime.datetime.now())

    # Calculate value and score
    settings = {
        "owner": owner,
        "repo": repo,
        "s3_bucket": s3_bucket_name
    }

    # Get owner and repo from event
    func_list = [
        ('license', get_license), 
        # ('language', get_primary_lang)
    ]

    for field, func in func_list:
        func.s3_bucket = settings['s3_bucket']
        func.repo = settings['repo']
        func.owner = settings['owner']
        value = func.get_value()
        score = func.get_score(value)
        project_info[field] = {
            "score": score,
            "value": value
        }

    # Save project to table
    dynamo = boto3.resource('dynamodb')
    oss_table = dynamo.Table(oss_table_name)
    row = oss_table.get_item(Key={'id': project_info['id']})

    if 'Item' not in row:
        # Create a new project record
        item = json.loads(json.dumps(project_info), parse_float=Decimal)
        new_row = oss_table.put_item(Item=item)
        print(new_row)

    return respond(None, 'OK')
