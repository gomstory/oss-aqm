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
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super(DecimalEncoder, self).default(o)

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res, cls=DecimalEncoder),
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    
def lambda_handler(event, context):    
    # Default pagination
    per_page = 30
    search = ""
    page = 1
    
    if event["queryStringParameters"] is not None:
        params = event['queryStringParameters']
        search = params["search"] if "search" in params else ""
        per_page = int(params["per_page"]) if params["per_page"] != "" else 30
        page = int(params["page"]) if params["page"] != "" else 1
    
    oss_table = dynamo.Table(table_name)
    
    if search == "":
        scan_result = oss_table.scan(Limit=per_page)
    else:
        scan_result = oss_table.query(
            KeyConditionExpression=Key('id').begins_with(search),
            FilterExpression=Attr('name').contains(search),
            Limit=per_page
        )
    
    return respond(None, {
        "page": page,
        "per_page": per_page,
        "items": scan_result["Items"],
        "count": scan_result["Count"]
    })