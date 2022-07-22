#!/usr/bin/env python3

import glob
import json

project = 'angular'
code_folder_path = f'./raw-data/{project}/code'
sonar_files = f'./raw-data/{project}/sonar-info.json'

def find_metric(arr, key):
    for item in arr:
        if item['metric'] == key:
            return item['value']

def get_markdown_files():
    return len(glob.glob('**/*.md', root_dir=code_folder_path, recursive=True))

def get_total_files():
    with open(sonar_files) as f:
        data = json.load(f)
        metrics = data['component']['measures']
        total_files = find_metric(metrics, 'files')
        return int(total_files)

def get_markdown_score():
    total_markdown = get_markdown_files()
    total_files = get_total_files()
    return (total_markdown/total_files)

# Run main program here
if __name__ == "__main__":
    markdown = get_markdown_files()
    total = get_total_files()
    score = get_markdown_score()
    print(markdown, total, score)