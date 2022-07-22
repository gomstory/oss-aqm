#!/usr/bin/env python3

import json
from get_markdown import get_markdown_score

# Setting
project = 'angular'
file_path = f'./raw-data/{project}/sonar-info.json'

def find_metric(arr, key):
    for item in arr:
        if item['metric'] == key:
            return item['value']

def get_comment_lines():
    with open(file_path) as f:
        data = json.load(f)
        metrics = data['component']['measures']
        code_comment = find_metric(metrics, 'comment_lines')
        return int(code_comment)

def get_code_lines():
    with open(file_path) as f:
        data = json.load(f)
        metrics = data['component']['measures']
        total_lines = find_metric(metrics, 'ncloc')
        return int(total_lines)

def get_code_comment_density():
    comment_lines = get_comment_lines()
    code_lines = get_code_lines()
    return comment_lines / (comment_lines + code_lines)

def get_code_document_score():
    code_comment = get_code_comment_density();
    markdown_file = get_markdown_score()
    return ((code_comment + markdown_file)/2) * 100


# Run main program here
if __name__ == "__main__":
    code_comment = get_code_comment_density()
    markdown = get_markdown_score()
    score = get_code_document_score()
    print(code_comment, markdown, score)