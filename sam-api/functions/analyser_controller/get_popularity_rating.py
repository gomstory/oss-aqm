
# Metric: Popularity Rating Score
# Description: How much repository popularity

def get_value(data):
    if data is None:
        return 0

    star = data['stargazers_count'] if 'stargazers_count' in data else 0
    number_watcher = data['watchers'] if 'watchers' in data else 0

    return (star / number_watcher)

def get_score(star_per_watcher):
    return (star_per_watcher) * 100