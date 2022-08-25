from Calculator import ScoreCalculator

class AvailableForum(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        super().__init__(data)

    def get_value(self):
        return 0

    def get_score(self):
        return 0