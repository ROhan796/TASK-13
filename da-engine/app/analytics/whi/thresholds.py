class WHIThresholds:
    @staticmethod
    def get_status(whi_score: float) -> str:
        if whi_score >= 75.0:
            return "GOOD"
        elif whi_score >= 60.0:
            return "FAIR"
        else:
            return "CRITICAL"

whi_thresholds = WHIThresholds()
