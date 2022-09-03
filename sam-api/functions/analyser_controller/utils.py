from datetime import datetime
from dateutil import parser, relativedelta

def get_days(created_date: str):
    now = datetime.now()
    temp = parser.parse(created_date)
    then = datetime(temp.year, temp.month, temp.day)
    diff = now - then
    days = diff.days
    return days

def get_year_month_days(created_date: str):
    temp = parser.parse(created_date)
    then = datetime(temp.year, temp.month, temp.day)
    now = datetime.now()
    diff = relativedelta.relativedelta(now, then)
    days = diff.years
    months = diff.months
    years = diff.years
    return '{0} years, {1} months, {2} days.'.format(years, months, days)