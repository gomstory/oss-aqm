#!/usr/bin/env python3

from git.repo.base import Repo

repo = "angular"
owner = "angular"

Repo.clone_from(f"https://github.com/{owner}/{repo}", f"./raw-data/{repo}/code")