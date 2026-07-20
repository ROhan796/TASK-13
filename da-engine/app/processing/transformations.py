class DataTransformations:
    @staticmethod
    def celsius_to_fahrenheit(c: float) -> float:
        return round((c * 9.0 / 5.0) + 32.0, 1)

    @staticmethod
    def fahrenheit_to_celsius(f: float) -> float:
        return round((f - 32.0) * 5.0 / 9.0, 1)

data_transformations = DataTransformations()
