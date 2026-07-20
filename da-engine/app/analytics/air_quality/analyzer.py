from app.processing.feature_engineering import feature_engineer

class AirQualityAnalyzer:
    @staticmethod
    def analyze_air(ammonia_ppm: float) -> dict:
        """
        Computes air quality score and yields ventilation suggestions.
        """
        air_score = feature_engineer.compute_air_score(ammonia_ppm)
        recommendation = "Normal ventilation"
        if air_score < 50.0:
            recommendation = "CRITICAL: Increase HVAC ventilation flow rate immediately"
        elif air_score < 75.0:
            recommendation = "WARNING: Ventilation adjustments recommended"
            
        return {
            "air_score": air_score,
            "ammonia_ppm": ammonia_ppm,
            "recommendation": recommendation
        }

air_quality_analyzer = AirQualityAnalyzer()
