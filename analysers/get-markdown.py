#!/usr/bin/env python3

import glob

project = 'angular'
code_folder_path = f'./raw-data/{project}/code'

def get_markdown_files():
    return len(glob.glob('**/*.md', root_dir=code_folder_path, recursive=True))

def get_total_files():
    return len(glob.glob("**", root_dir=code_folder_path, recursive=True))

def get_markdown_score():
    total_markdown = get_markdown_files()
    total_files = get_total_files()
    return total_markdown/total_files

# Run main program here
if __name__ == "__main__":
    markdown = get_markdown_files()
    total = get_total_files()
    score = get_markdown_score()
    print(markdown, total, score)