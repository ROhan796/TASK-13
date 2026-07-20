from typing import List, Dict
from app.models.telemetry import NormalizedTelemetry
from app.models.airport import AirportSummary
from app.analytics.terminal.aggregator import terminal_aggregator

class AirportAggregator:
    @staticmethod
    def aggregate(telemetries: List[NormalizedTelemetry], active_incidents: List[dict]) -> AirportSummary:
        """
        Aggregate all telemetries and active incidents into an AirportSummary.
        """
        if not telemetries:
            return AirportSummary(
                avg_whi=0.0,
                total_washrooms=0,
                online_devices=0,
                active_incidents=0,
                terminals=[]
            )

        total_whi = sum(t.whi_score for t in telemetries)
        avg_whi = round(total_whi / len(telemetries), 1)

        # Group by terminal ID
        terminal_groups: Dict[str, List[NormalizedTelemetry]] = {}
        for t in telemetries:
            terminal_groups.setdefault(t.terminal_id, []).append(t)

        terminals = []
        for term_id, term_telemetries in terminal_groups.items():
            # Count active incidents for this terminal
            term_incidents = [i for i in active_incidents if i.get("device_id", "").startswith(term_id)]
            terminals.append(terminal_aggregator.aggregate(term_id, term_telemetries, len(term_incidents)))

        return AirportSummary(
            avg_whi=avg_whi,
            total_washrooms=len(telemetries),
            online_devices=len(telemetries),
            active_incidents=len(active_incidents),
            terminals=terminals
        )

airport_aggregator = AirportAggregator()
