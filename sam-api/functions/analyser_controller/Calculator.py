from abc import ABC, abstractmethod
from typing import Union

# Abstrac Class for all calculator
class ScoreCalculator(ABC):
    @abstractmethod
    def __init__(self, data: dict) -> None:
        """ Initial score, value, needed data """
        self.score = 0
        self.value = 0
        self.data = data

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

    def desc(self) -> str:
        "Get class description"
        return self.__doc__