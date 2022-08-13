
# Metric: Popularity Rating Score
# Description: How much repository popularity

def get_value(data):
    if data is None:
        return (0,0)

    start = data['stargazers_count'] if 'stargazers_count' in data else 0
    number_watcher = data['watchers'] if 'watchers' in data else 0

    return (start, number_watcher)

def get_score(values):
    star, number_of_watcher = values
    return (star / number_of_watcher) * 100