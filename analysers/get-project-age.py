#!/usr/bin/env python3

import json
from datetime import date, datetime
from dateutil import parser

# Setting
project = 'angular'
file_path = f'./raw-data/{project}/repo-info.json'

def get_project_age():
    with open(file_path) as f:
        data = json.load(f)
        created_at = data['created_at']
        updated_at = data['updated_at']
        delta = parser.parse(updated_at) - parser.parse(created_at)
        total_days = delta.days
        return total_days

def get_age_score(days):
    age_range = 0

    if days < 60: 
        # < 3 mo
        age_range = 1
    elif days >= 60 and days < 365: 
        # 3 mo - 1 years
        age_range = 2
    elif days >= 365 and days < 730: 
        # > 1-2 years
        age_range = 3
    elif days >= 730 and days < 1095: 
        # > 2-3 years
        age_range = 4
    elif days >= 1095: 
        # > 3 years
        age_range = 5
    
    return (age_range / 5) * 100


# Run main program here
if __name__ == "__main__":
    days = get_project_age()
    score = get_age_score(days)
    print(days, score)