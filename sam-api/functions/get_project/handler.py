import json
import requests
import boto3
import os
import decimal
from boto3.dynamodb.conditions import Key, Attr

# connect to dynamoDb
dynamo = boto3.resource('dynamodb')
table_name = os.environ['OSS_TABLE']

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, int):
            return str(o)
        if isinstance(o, decimal.Decimal):
            return "{:.0f}".format(o)
        return super(DecimalEncoder, self).default(o)

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res, cls=DecimalEncoder),
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    }
    
def lambda_handler(event, context):    
    # Default pagination
    per_page = 10
    search = ""
    page = 1
    
    if event["queryStringParameters"] is not None:
        params = event['queryStringParameters']
        page = int(params["page"]) if "page" in params else page
        search = params["search"] if "search" in params else ""
        per_page = int(params["per_page"]) if "per_page" in params else per_page
    
    oss_table = dynamo.Table(table_name)
    
    if search == "":
        scan_result = oss_table.scan(Limit=per_page)
    else:
        scan_result = oss_table.query(
            KeyConditionExpression=Key('id').eq(search),
            Limit=per_page
        )
    
    return respond(None, {
        "page": page,
        "per_page": per_page,
        "items": scan_result["Items"],
        "count": scan_result["Count"]
    })