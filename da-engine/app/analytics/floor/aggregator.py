from typing import List
from app.models.telemetry import NormalizedTelemetry
from app.models.floor import FloorSummary
from app.models.washroom import WashroomState
from app.analytics.whi.thresholds import whi_thresholds

class FloorAggregator:
    @staticmethod
    def aggregate(level_num: str, floor_telemetries: List[NormalizedTelemetry]) -> FloorSummary:
        """
        Aggregate a list of washroom telemetries into a FloorSummary.
        """
        if not floor_telemetries:
            return FloorSummary(
                level_id=int(level_num.replace("L", "")) if "L" in level_num else 1,
                label=f"Level {level_num}",
                avg_whi=0.0,
                washrooms=[]
            )
            
        total_whi = sum(t.whi_score for t in floor_telemetries)
        avg_whi = round(total_whi / len(floor_telemetries), 1)
        
        washrooms = []
        for t in floor_telemetries:
            # We map gender from device_id.
            # e.g., T1-L1-PPM-001 -> PPM is Men's stall (PPM = Public Male?) or similar.
            # Let's construct a friendly display name.
            gender_label = "Male" if "PPM" in t.device_id else "Female" if "PPF" in t.device_id else "Disabled" if "PPD" in t.device_id else "Staff"
            
            washrooms.append(WashroomState(
                device_id=t.device_id,
                name=f"{gender_label} Washroom {t.device_id.split('-')[-1]}",
                whi=t.whi_score,
                status=whi_thresholds.get_status(t.whi_score),
                occupancy=t.occupancy_count,
                ammonia_ppm=t.ammonia_ppm,
                soap_pct=t.soap_pct,
                paper_pct=t.paper_pct,
                sanitizer_pct=t.sanitizer_pct,
                battery_pct=t.battery_pct,
                recorded_at=t.recorded_at.isoformat()
            ))
            
        level_id_int = 1
        try:
            level_id_int = int(level_num.replace("L", ""))
        except ValueError:
            pass

        return FloorSummary(
            level_id=level_id_int,
            label=f"Level {level_num.replace('L', '')}",
            avg_whi=avg_whi,
            washrooms=washrooms
        )

floor_aggregator = FloorAggregator()
