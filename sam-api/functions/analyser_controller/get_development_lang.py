#!/usr/bin/env python3

import json
import boto3
import io


def get_value(langs):
    # Get language the most loc
    sorted_langs = sorted(langs.items(), key=lambda x: x[1], reverse=True)
    name, value = sorted_langs[0]
    return str.lower(name)


def get_score(lang):
    lowe_lang = str.lower(lang)
    switcher = {
        'julia': 1, 'cobol': 1, 'pascal': 1, 'fortran': 1,
        'rust': 2, 'objective-c': 2, 'dart': 2, 'scala': 2, 'perl': 2, 'haskell': 2,
        'kotlin': 3, 'ruby': 3, 'assembly': 3, 'vba': 3, 'swift': 3, 'r': 3,
        'typescript': 4, 'php': 4, 'c#': 4, 'c++': 4, 'c': 4, 'go': 4,
        'javascript': 5, 'html': 5, 'css': 5, 'python': 5, 'sql': 5, 'java': 5, 'shall': 5, 'bash': 5, 'powershell': 5
    }

    range = switcher.get(lowe_lang, 1)
    return (range / 5) * 100
