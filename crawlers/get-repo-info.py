#!/usr/bin/env python3

import requests
import json
import os

repo = "angular"
owner = "angular"

# Get Primary Languages
response = requests.get(f'https://api.github.com/repos/{owner}/{repo}');
data = response.json()

# export to file
file_path = os.path.join('.', 'raw-data', repo, 'repo-info.json')
os.makedirs(os.path.dirname(file_path), exist_ok=True)
with open(file_path, 'a') as f:
    json.dump(data, f)
