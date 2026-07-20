class MetricsTracker:
    def __init__(self):
        self.request_counts = 0
        self.poll_latencies = []

    def record_request(self):
        self.request_counts += 1

    def record_poll_latency(self, seconds: float):
        self.poll_latencies.append(seconds)
        if len(self.poll_latencies) > 100:
            self.poll_latencies.pop(0)

metrics_tracker = MetricsTracker()
