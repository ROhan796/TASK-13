from app.config.constants import SUPPLY_ALERT_PCT

class ConsumablesAnalyzer:
    @staticmethod
    def analyze_levels(soap: float, paper: float, sanitizer: float) -> dict:
        """
        Analyze consumable refill needs and estimate depletion.
        """
        needs_refill = soap < SUPPLY_ALERT_PCT or paper < SUPPLY_ALERT_PCT or sanitizer < SUPPLY_ALERT_PCT
        return {
            "soap_pct": soap,
            "paper_pct": paper,
            "sanitizer_pct": sanitizer,
            "needs_refill": needs_refill,
            "refill_details": {
                "soap": soap < SUPPLY_ALERT_PCT,
                "paper": paper < SUPPLY_ALERT_PCT,
                "sanitizer": sanitizer < SUPPLY_ALERT_PCT
            }
        }

consumables_analyzer = ConsumablesAnalyzer()
