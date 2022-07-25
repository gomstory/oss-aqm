#!/usr/bin/env python3

from ensurepip import version
import json
import re

# Setting
project = 'angular'
file_path = f'./raw-data/{project}/release.json'

def unique(list1):
    unique_list = []

    for x in list1:
        if x not in unique_list:
            unique_list.append(x)

    return unique_list

def get_release():
    with open(file_path) as f:
        data = json.load(f)
        major_releases = []
        all_releases = []

        for release in data:
            version = release['tag_name']
            # Get only manjor release, remove minor and patch
            major_version = re.search(r"^(\d{1,2}).+$", version)

            if major_version is not None:
                groups = major_version.groups()
                major = groups[0]
                all_releases.append(major)

        major_releases = unique(all_releases)
        return len(major_releases)

def get_release_score(number_of_major_release = 0):
    score_range = 1

    if number_of_major_release > 3: 
        score_range = 5
    elif number_of_major_release <= 3 and number_of_major_release > 1: 
        score_range = 3
    elif number_of_major_release <= 1: 
        score_range = 1

    return (score_range / 5) * 100

# Run main program here
if __name__ == "__main__":
    versions = get_release()
    score = get_release_score(versions)
    print(versions, score)