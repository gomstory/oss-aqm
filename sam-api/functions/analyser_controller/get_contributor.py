#!/usr/bin/env python3

# Metric: Get Contributor
# Description: The number of core developer and contributor in the last 6 month

def get_value(contributors = []):
    return len(contributors)

def get_score(contributors):
    if contributors == 0:
        contributors = 1
    score = 1

    if contributors < 5:
        score = 1
    elif contributors >= 5 and contributors <= 10:
        score = 2
    elif contributors > 10 and contributors <= 20:
        score = 3
    elif contributors > 20 and contributors <= 50:
        score = 4
    elif contributors > 50:
        score = 5

    return (score / 5) * 100