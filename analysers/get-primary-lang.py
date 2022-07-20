#!/usr/bin/env python3

import json

# Setting
project = 'angular'
file_path = f'./raw-data/{project}/repo-info.json'

def get_primary_language():
    with open(file_path) as f:
        langs = json.load(f)
        sorted_langs = sorted(langs.items(), key=lambda x: x[1], reverse=True)
        return sorted_langs[0]