from typing import List, Dict
from app.models.telemetry import NormalizedTelemetry
from app.models.terminal import TerminalSummary
from app.analytics.floor.aggregator import floor_aggregator

class TerminalAggregator:
    @staticmethod
    def aggregate(terminal_id: str, terminal_telemetries: List[NormalizedTelemetry], active_incident_count: int) -> TerminalSummary:
        """
        Aggregate a list of washroom telemetries for a terminal into TerminalSummary.
        """
        if not terminal_telemetries:
            return TerminalSummary(
                terminal_id=terminal_id,
                name=f"Terminal {terminal_id}",
                code=terminal_id,
                avg_whi=0.0,
                total_washrooms=0,
                online_devices=0,
                active_incidents=0,
                floors=[]
            )

        total_whi = sum(t.whi_score for t in terminal_telemetries)
        avg_whi = round(total_whi / len(terminal_telemetries), 1)

        # Group by floor level
        floor_groups: Dict[str, List[NormalizedTelemetry]] = {}
        for t in terminal_telemetries:
            floor_groups.setdefault(t.floor_level, []).append(t)

        floors = []
        for level_num, f_telemetries in floor_groups.items():
            floors.append(floor_aggregator.aggregate(level_num, f_telemetries))

        # Sort floors by level_id
        floors.sort(key=lambda f: f.level_id)

        return TerminalSummary(
            terminal_id=terminal_id,
            name=f"Terminal {terminal_id}",
            code=terminal_id,
            avg_whi=avg_whi,
            total_washrooms=len(terminal_telemetries),
            online_devices=len(terminal_telemetries),
            active_incidents=active_incident_count,
            floors=floors
        )

terminal_aggregator = TerminalAggregator()
