from app.models.telemetry import NormalizedTelemetry

class SensorCalibration:
    @staticmethod
    def calibrate(telemetry: NormalizedTelemetry) -> NormalizedTelemetry:
        """
        Adjusts raw sensor telemetry for drift.
        Currently a placeholder returning unchanged telemetry, reserved for future calibration coefficients.
        """
        return telemetry

sensor_calibration = SensorCalibration()
