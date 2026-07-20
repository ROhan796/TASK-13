import threading
from typing import Dict, List
from collections import deque
from app.config.settings import settings

class CircularHistoryBuffer:
    def __init__(self):
        self.lock = threading.Lock()
        # Maps device_id -> deque of WHI scores
        self.buffers: Dict[str, deque] = {}
        self.limit = settings.WHI_HISTORY_BUFFER_SIZE

    def add_reading(self, device_id: str, whi_score: float):
        with self.lock:
            if device_id not in self.buffers:
                self.buffers[device_id] = deque(maxlen=self.limit)
            self.buffers[device_id].append(whi_score)

    def get_history(self, device_id: str) -> List[float]:
        with self.lock:
            if device_id in self.buffers:
                return list(self.buffers[device_id])
            return []

device_history_buffer = CircularHistoryBuffer()
