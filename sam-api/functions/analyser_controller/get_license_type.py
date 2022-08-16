import json
import boto3
import os
import io

# Get lincense file from raw data
def get_value(data = None):
    if data is None:
        return 'none'

    if 'license' in data:
        license = data['license']['key']
        return license
        
    return 'none'

def get_score(license = "none"):
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