from Calculator import ScoreCalculator

class CodeQuality(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.sonar = data['sonar-info']
        self.metrics = self.sonar['component']['measures']
        self.duplicated_lines_score = 0
        self.avg_cyclomatic_score = 0

    def find_metric(self, key):
        for item in self.metrics:
            if item['metric'] == key:
                return item['value']

    def get_duplicate_line(self):
        duplicated_lines = self.find_metric('duplicated_lines')
        lines = self.find_metric('lines')
        duplicated_ratio = int(duplicated_lines) / int(lines)
        self.duplicated_lines_score = (1 - duplicated_ratio)
        return self.duplicated_lines_score

    def get_uncomplex_code(self):
        complexity = self.find_metric('file_complexity')
        avg_cyclomatic = float(complexity)
        
        if avg_cyclomatic > 50:
            rank = 1
        elif avg_cyclomatic >= 21 and avg_cyclomatic <= 50:
            rank = 2
        elif avg_cyclomatic >= 11 and avg_cyclomatic <= 20:
            rank = 3
        elif avg_cyclomatic >= 1 and avg_cyclomatic <= 10:
            rank = 4  

        self.avg_cyclomatic_score =  (rank / 4)
        return self.avg_cyclomatic_score
    
    def get_value(self) -> float:
        dup = self.get_duplicate_line()
        cyclo = self.get_uncomplex_code()
        self.value = (dup + cyclo) / 2

    def get_score(self) -> float:
        self.score = self.value * 100
        return self.score

    def __str__(self) -> str:
        duplicate_round = "{:.2f}".format(self.duplicated_lines_score)
        cyclomatic_round = "{:.2f}".format(self.avg_cyclomatic_score)
        return f"{cyclomatic_round}/{duplicate_round}"