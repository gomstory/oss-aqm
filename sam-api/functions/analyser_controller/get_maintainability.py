from Calculator import ScoreCalculator

class Maintainability(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.sonar = data['sonar-info']
        self.metrics = self.sonar['component']['measures']

    def find_metric(self, key):
        for item in self.metrics:
            if item['metric'] == key:
                return item['value']

    def get_value(self):
        self.value = self.find_metric('sqale_rating')
        self.value = float(self.value)
        return self.value

    def get_score(self):
        switcher = {
            1.0: 100, # A
            2.0: 80,  # B
            3.0: 60,  # C
            4.0: 40,  # D
            5.0: 20   # E
        }

        self.score = switcher.get(self.value, 0)
        return self.score