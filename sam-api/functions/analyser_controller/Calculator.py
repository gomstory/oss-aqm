
from abc import ABC, abstractmethod

# Abstrac Class for all calculator
class OSS_Calculator(ABC):
    @abstractmethod
    def __init__(self, data: dict) -> None:
        """ Initial score, value, needed data """
        self.score = 0
        self.value = 0
        self.data = data

    @abstractmethod
    def get_value(self) -> dict:
        """ Get Caluclated Value """
        return self.value

    @abstractmethod
    def get_score(self) -> dict:
        """ Get Calculate Score (0, 100) """
        return self.score