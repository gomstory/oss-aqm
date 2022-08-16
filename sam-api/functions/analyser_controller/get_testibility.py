def find_metric(arr, key):
    for item in arr:
        if item['metric'] == key:
            return item['value']

def get_value(data):
    measures = data['component']['measures']
    cyclo = find_metric(measures, 'complexity')
    function = find_metric(measures, 'functions')
    return int(cyclo)/int(function)


def get_score(avg_cyclimetric = 1):
    rank = 1

    if avg_cyclimetric > 50:
        rank = 1
    elif avg_cyclimetric >= 21 and avg_cyclimetric <= 50:
        rank = 2
    elif avg_cyclimetric >= 11 and avg_cyclimetric <= 20:
        rank = 3
    elif avg_cyclimetric >= 1 and avg_cyclimetric <= 10:
        rank = 4  

    return (rank / 4) * 100