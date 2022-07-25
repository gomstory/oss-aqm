#!/usr/bin/env python3

import requests
import json
import os

repo = "angular"
owner = "angular"

# Get Primary Languages
response = requests.get(f'https://api.github.com/repos/{owner}/{repo}/releases', {
    'per_page': 50
});

data = response.json()

# export to file
file_path = os.path.join('.', 'raw-data', repo, 'release.json')
os.makedirs(os.path.dirname(file_path), exist_ok=True)
with open(file_path, 'w') as f:
    json.dump(data, f)