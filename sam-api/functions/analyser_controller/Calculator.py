from abc import ABC, abstractmethod
from typing import Union

# Abstrac Class for all calculator
class ScoreCalculator(ABC):
    @abstractmethod
    def __init__(self) -> None:
        """ Initial score, value, needed data """
        self.metric_key = "key"
        self.score = 0
        self.value = 0

    @abstractmethod
    def get_value(self) -> Union[float, str]:
        """ Get Caluclated Value """
        return self.value

    @abstractmethod
    def get_score(self) -> float:
        """ Get Calculate Score (0, 100) """
        return self.score

    def __str__(self) -> str:
        return str(self.value)
    
    def to_json(self) -> dict:
        data = {}
        data['metric_key'] = self.metric_key
        data['value'] = self.get_value()
        data['score'] = self.get_score()
        data['label'] = str(self)
        return data