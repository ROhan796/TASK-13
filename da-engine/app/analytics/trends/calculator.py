from typing import List, Dict, Any
from datetime import datetime, date, timedelta
import pandas as pd

class TrendsCalculator:
    @staticmethod
    def calculate_trends(snapshots: List[Dict[str, Any]], days: int = 14) -> List[Dict[str, Any]]:
        """
        Calculates daily average WHI trends per terminal.
        """
        if not snapshots:
            return []
            
        df = pd.DataFrame(snapshots)
        # Convert timestamp to datetime
        df["recorded_at"] = pd.to_datetime(df["recorded_at"])
        df["date"] = df["recorded_at"].dt.date
        
        # Group by date and terminal_id
        grouped = df.groupby(["date", "terminal_id"])["whi_score"].mean().reset_index()
        
        # Sort and filter last N days
        cutoff = date.today() - timedelta(days=days)
        grouped = grouped[grouped["date"] >= cutoff]
        grouped = grouped.sort_values(by="date")
        
        trends = []
        for _, row in grouped.iterrows():
            trends.append({
                "date": row["date"].isoformat(),
                "avg_whi": round(float(row["whi_score"]), 1),
                "terminal_id": row["terminal_id"]
            })
        return trends

trends_calculator = TrendsCalculator()
