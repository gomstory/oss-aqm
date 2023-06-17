from Calculator import ScoreCalculator

class LearningMaterial(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        super().__init__()
        self.metric_key = "learning_material"

    def get_value(self):
        return 0

    def get_score(self):
        return 0