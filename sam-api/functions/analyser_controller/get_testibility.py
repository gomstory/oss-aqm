from Calculator import ScoreCalculator

class Testibility(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.metric_key = "testibility"
        self.sonar = data['sonar-info']
        self.metrics = self.sonar['component']['measures']
        self.complexity = 0

    def find_metric(self, arr, key):
        for item in arr:
            if item['metric'] == key:
                return item['value']
        return 0

    def get_value(self):
        metrics = self.metrics
        complexity = self.find_metric(metrics, 'file_complexity')
        self.complexity = float(complexity)
        self.value = float(complexity)
        return self.value


    def get_score(self) -> float:
        rank = 1
        avg_cyclimetric = self.value

        if avg_cyclimetric > 50:
            rank = 1
        elif avg_cyclimetric >= 21 and avg_cyclimetric <= 50:
            rank = 2
        elif avg_cyclimetric >= 11 and avg_cyclimetric <= 20:
            rank = 3
        elif avg_cyclimetric >= 1 and avg_cyclimetric <= 10:
            rank = 4  

        self.score = (rank / 4) * 100
        return self.score
    
    def to_json(self) -> dict:
        data = super().to_json()
        data['file_complexity'] = self.complexity
        return data