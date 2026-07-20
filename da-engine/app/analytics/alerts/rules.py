from app.config.constants import AMMONIA_ALERT_PPM, SUPPLY_ALERT_PCT

class AlertRules:
    @staticmethod
    def is_ammonia_breach(val: float) -> bool:
        return val > AMMONIA_ALERT_PPM

    @staticmethod
    def is_supply_breach(val: float) -> bool:
        return val < SUPPLY_ALERT_PCT

alert_rules = AlertRules()
