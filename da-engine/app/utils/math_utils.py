def safe_divide(numerator: float, denominator: float, fallback: float = 0.0) -> float:
    if denominator == 0.0:
        return fallback
    return numerator / denominator

def clamp(val: float, min_val: float, max_val: float) -> float:
    return max(min_val, min(val, max_val))
