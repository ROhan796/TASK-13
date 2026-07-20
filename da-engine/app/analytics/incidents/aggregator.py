from typing import List, Dict, Any

class IncidentAggregator:
    @staticmethod
    def aggregate_by_terminal(incidents: List[Dict[str, Any]]) -> Dict[str, int]:
        """
        Count active incidents by terminal ID.
        """
        counts = {}
        for incident in incidents:
            device_id = incident.get("device_id", "")
            terminal_id = device_id.split("-")[0] if device_id else "UNKNOWN"
            counts[terminal_id] = counts.get(terminal_id, 0) + 1
        return counts

incident_aggregator = IncidentAggregator()
