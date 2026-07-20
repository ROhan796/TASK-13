from typing import Dict, Any
from loguru import logger
from app.analytics.alerts.dispatcher import alert_dispatcher

class NotificationService:
    async def notify_incident(self, incident: Dict[str, Any]):
        """
        Wrapper to dispatch incident notifications.
        """
        await alert_dispatcher.dispatch_alert(incident)

notification_service = NotificationService()
