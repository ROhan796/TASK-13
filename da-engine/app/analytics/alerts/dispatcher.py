from typing import Dict, Any
from loguru import logger

class AlertDispatcher:
    async def dispatch_alert(self, incident: Dict[str, Any]):
        """
        Dispatches alerts via webhook, SMS, email, or message queues.
        Currently logs the alert dispatch operation.
        """
        logger.info(f"[ALERT DISPATCH] Fired active alert: {incident.get('title')} on device {incident.get('device_id')}")

alert_dispatcher = AlertDispatcher()
