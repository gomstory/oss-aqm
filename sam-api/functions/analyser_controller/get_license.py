import json
import boto3
import os
import io

file_name = 'license.json'
s3_bucket = ''
repo = ''
owner = ''

def get_s3():
    s3 = boto3.resource('s3')
    obj = s3.Object(s3_bucket, f'{repo}/{owner}/{file_name}')
    data = io.BytesIO()
    obj.download_fileobj(data)
    json_data = json.loads(data.getvalue().decode("utf-8"))
    return json_data

def get_value():
    # Get lincense file from raw data
    data = get_s3()
    license = data['license']['key']
    return license

def get_score(license):
    switcher = {
        "none": 1,
        "gpl-2.0": 2,
        "lgpl-2.1": 2,
        "mpl-2.0": 3, 
        "gpl-3.0": 3,
        "epl-2.0": 3,
        "agpl-3.0": 3,
        "cc0-1.0": 4,
        "bsl-1.0": 4,
        "bsd-2-clause": 4,
        "bsd-3-clause": 4,
        "mit": 4,
        "unlicense": 4,
        "apache-2.0": 5,
    }

    range = switcher.get(license, 1)
    score = (range / 5) * 100
    return score