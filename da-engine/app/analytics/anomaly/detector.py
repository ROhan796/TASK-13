from typing import List
import numpy as np

class AnomalyDetector:
    @staticmethod
    def detect_zscore_anomaly(history: List[float], current_value: float, threshold: float = 3.0) -> bool:
        """
        Detects if current_value is anomalous using Z-score on history.
        """
        if len(history) < 10:
            return False
        mean = np.mean(history)
        std = np.std(history)
        if std == 0.0:
            return False
        z_score = abs(current_value - mean) / std
        return z_score > threshold

    @staticmethod
    def detect_iqr_anomaly(history: List[float], current_value: float) -> bool:
        """
        Detects if current_value is anomalous using Interquartile Range (IQR).
        """
        if len(history) < 10:
            return False
        q75, q25 = np.percentile(history, [75, 25])
        iqr = q75 - q25
        lower_bound = q25 - (1.5 * iqr)
        upper_bound = q75 + (1.5 * iqr)
        return current_value < lower_bound or current_value > upper_bound

anomaly_detector = AnomalyDetector()
