from Calculator import ScoreCalculator
from get_maintainability import Maintainability
from get_learning_material import LearningMaterial
from get_support import Professional_Support

class OwnershipCost(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        super().__init__()
        self.metric_key = "cost"
        self.support = Professional_Support(data)
        self.maintain = Maintainability(data)
        self.material = LearningMaterial(data)

    def get_value(self) -> float:
        maintain_score = self.maintain.get_score()
        support_score = self.support.get_score()
        material_score = self.material.get_score()
        self.value = round((maintain_score + support_score + material_score), 3)
        return self.value

    def get_score(self) -> float:
        summation_score = self.get_value()
        if summation_score > 0:
            self.score = round((summation_score / 3), 2)
            return self.score
        else:
            self.score = 0
            return self.score
        
    def to_json(self) -> dict:
        date = super().to_json()
        date['maintain_score'] = self.maintain.get_score()
        date['support_score'] = self.support.get_score()
        date['material_score'] = self.material.get_score()
        return date
    
    def __str__(self) -> str:
        return f"{self.maintain.score}/{self.support.score}/{self.material.score}"