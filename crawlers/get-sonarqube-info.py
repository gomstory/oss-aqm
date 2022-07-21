#!/usr/bin/env python3

from multiprocessing.dummy import Array
import requests
import json
import os

repo = "angular"
owner = "angular"
project_key = 'angular-lib'
metrics = [
    'ncloc','complexity',
    'violations',
    'comment_lines',
    'files','security_rating', 
    'reliability_rating',
    'sqale_rating', # maintainability rating,
    'comment_lines_density'
]

# Get all metrics from SonarQube
response = requests.get(f'http://localhost:9000/api/measures/component', auth=("***REMOVED***", "***REMOVED***"), params={
    'component': project_key,
    'metricKeys': ','.join(metrics)
})

data = response.json()

# export to file
file_path = os.path.join('.', 'raw-data', repo, 'sonar-info.json')
os.makedirs(os.path.dirname(file_path), exist_ok=True)
with open(file_path, 'a') as f:
    json.dump(data, f)
