from Calculator import ScoreCalculator

class AvailableForum(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.forum = data["forum"] if "forum" in data else []
        self.total_forum = 0
        self.forum_with_answer = 0

    def get_forum_with_answer(self):
        forum_w_ans = list(filter(lambda x: int(x["answers"]) > 0, self.forum))
        return forum_w_ans

    def get_value(self):
        self.total_forum = len(self.forum)
        self.forum_with_answer = len(self.get_forum_with_answer())
        self.value = self.forum_with_answer
        return self.value

    def get_score(self):
        range = 0
        
        if self.value > 720:
            range = 5
        elif self.value > 300:
            range = 4
        elif self.value > 150:
            range = 3
        elif self.value > 30:
            range = 2
        elif self.value <= 30:
            range = 1

        self.score = (range/5) * 100
        return self.score

    def __str__(self) -> str:
        return f"{self.forum_with_answer}"