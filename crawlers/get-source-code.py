#!/usr/bin/env python3

from git.repo.base import Repo

repo = "angular"
owner = "angular"

# Clone source code from github project
Repo.clone_from(f"https://github.com/{owner}/{repo}", f"./raw-data/{repo}/code")