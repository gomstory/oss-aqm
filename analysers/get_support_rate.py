
import re

def get_owner_and_project(github_url):
    result = re.search(r"^https:\/\/github.com\/([a-z0-9A-Z]+)\/(([\w\d]+))", github_url)
    group = result.groups()
    owner = group[0]
    projec = group[1]
    return (owner, projec)


owner_name, project_name = get_owner_and_project('https://github.com/angular/components')
print(owner_name, project_name)