import json
import boto3
import os

# connect to dynamoDb
region_name = os.environ['REGION_NAME']
dynamo = boto3.resource('dynamodb')
table_name = os.environ['CRAWLER_TABLE']


def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    }


def lambda_handler(event, context):
    oss_table = dynamo.Table(table_name)
    # TODO: Get Latest 10 and ordered rows 
    scan_result = oss_table.scan(Limit=10)
    return respond(None, {
        "items": scan_result["Items"],
        "count": scan_result["Count"]
    })
