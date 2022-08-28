from datetime import datetime
from dateutil import parser, relativedelta

def get_age_label(created_date: str):
    temp = parser.parse(created_date)
    then = datetime(temp.year, temp.month, temp.day)
    now = datetime.now()
    diff = relativedelta.relativedelta(now, then)
    days = diff.years
    months = diff.months
    years = diff.years
    return '{0} years, {1} months, {2} days.'.format(years, months, days)