#!/usr/bin/env python3

import requests
import json
import os

repo = "angular"
owner = "angular"

# Get Primary Languages
response = requests.get(f'https://api.github.com/repos/{owner}/{repo}/languages');
data = response.json()

# # Get Primary Language
# sorted_langs = sorted(langs.items(), key=lambda x: x[1], reverse=True)
# print('Primary Language:', sorted_langs[0])

# export to file
file_path = os.path.join('.', 'raw-data', repo, 'language.json')
os.makedirs(os.path.dirname(file_path), exist_ok=True)
with open(file_path, 'a') as f:
    json.dump(data, f)