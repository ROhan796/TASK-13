from typing import Dict, Any, List
from app.storage.cache import cache_store
from app.analytics.whi import WHIEngine

class AggregateEngine:
    @staticmethod
    def compute_summaries():
        """
        Groups all normalized telemetry snapshots in cache by terminal and floor level,
        calculates average WHI, active counts, and updates CacheStore.
        """
        telemetries = cache_store.get_all_telemetry()
        if not telemetries:
            return
            
        total_whi = 0.0
        online_count = 0
        terminal_groups: Dict[str, List[Any]] = {}
        
        for t in telemetries:
            total_whi += t.whi_score
            online_count += 1
            
            # Extract terminal id (T1, T2, CGO)
            parts = t.device_id.split("-")
            terminal_id = parts[0]
            level_num = parts[1] if len(parts) > 1 else "L1"
            
            if terminal_id not in terminal_groups:
                terminal_groups[terminal_id] = []
            terminal_groups[terminal_id].append((level_num, t))
            
        avg_whi = round(total_whi / online_count, 1) if online_count > 0 else 85.0
        
        # Calculate terminal summaries
        terminals_list = []
        for term_id, items in terminal_groups.items():
            term_total_whi = sum(item[1].whi_score for item in items)
            term_avg = round(term_total_whi / len(items), 1)
            
            # Group by floor
            floor_groups: Dict[str, List[Any]] = {}
            for level, t in items:
                if level not in floor_groups:
                    floor_groups[level] = []
                floor_groups[level].append(t)
                
            floors_list = []
            for lvl_num, f_items in floor_groups.items():
                floor_whi = sum(f.whi_score for f in f_items)
                floor_avg = round(floor_whi / len(f_items), 1)
                
                washrooms_list = []
                for f in f_items:
                    # Clean up label
                    washrooms_list.append({
                        "device_id": f.device_id,
                        "name": f"{term_id} Floor {lvl_num} Stall",
                        "whi": f.whi_score,
                        "status": WHIEngine.resolve_status(f.whi_score),
                        "occupancy": f.occupancy_count,
                        "ammonia_ppm": f.ammonia_ppm,
                        "soap_pct": f.soap_pct,
                        "paper_pct": f.paper_pct,
                        "sanitizer_pct": f.sanitizer_pct
                    })
                    
                floors_list.append({
                    "level_id": int(lvl_num.replace("L", "")) if "L" in lvl_num else 1,
                    "label": f"Level {lvl_num}",
                    "avg_whi": floor_avg,
                    "washrooms": washrooms_list
                })
                
            terminals_list.append({
                "terminal_id": term_id,
                "name": f"Terminal {term_id}",
                "code": term_id,
                "avg_whi": term_avg,
                "total_washrooms": len(items),
                "online_devices": len(items),
                "active_incidents": len([i for i in cache_store.active_incidents if i["device_id"].startswith(term_id)]),
                "floors": floors_list
            })
            
        # Update cache summaries
        cache_store.airport_summary = {
            "avg_whi": avg_whi,
            "total_washrooms": online_count,
            "online_devices": online_count,
            "active_incidents": len(cache_store.active_incidents),
            "terminals": terminals_list
        }
