import threading
from typing import List, Dict, Any

class StateSnapshotStore:
    def __init__(self):
        self.lock = threading.Lock()
        self.snapshots: List[Dict[str, Any]] = []

    def save_snapshot(self, snapshot: Dict[str, Any]):
        with self.lock:
            self.snapshots.append(snapshot)
            # Prune old snapshots (keep last 10000 to avoid memory leak)
            if len(self.snapshots) > 10000:
                self.snapshots = self.snapshots[-10000:]

    def get_snapshots(self) -> List[Dict[str, Any]]:
        with self.lock:
            return list(self.snapshots)

snapshot_store = StateSnapshotStore()
