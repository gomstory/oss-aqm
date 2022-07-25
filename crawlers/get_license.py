#!/usr/bin/env python3
import requests
import json
import os

# Setting script
repo = "angular"
owner = "angular"

# Get repository license
response = requests.get(f'https://api.github.com/repos/{owner}/{repo}/license')
data = response.json()

# export to file
file_path = os.path.join('..', 'raw-data', repo, 'license.json')
os.makedirs(os.path.dirname(file_path), exist_ok=True)
with open(file_path, 'w') as f:
    json.dump(data, f)