class IncidentClassifier:
    @staticmethod
    def classify_severity(metric: str) -> str:
        """
        Classifies incident severity based on metric type.
        """
        if metric == "whi_score":
            return "CRITICAL"
        elif metric in ("ammonia_ppm"):
            return "HIGH"
        elif metric in ("soap_pct", "paper_pct", "sanitizer_pct", "occupancy_count"):
            return "MEDIUM"
        return "LOW"

incident_classifier = IncidentClassifier()
