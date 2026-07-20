from typing import List
import numpy as np

class WHIHistoryHelper:
    @staticmethod
    def calculate_rolling_avg(history: List[float]) -> float:
        """
        Calculate rolling average of WHI scores.
        """
        if not history:
            return 85.0
        return round(float(np.mean(history)), 1)

whi_history_helper = WHIHistoryHelper()
