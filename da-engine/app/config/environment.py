from app.config.settings import settings

def is_development() -> bool:
    return settings.ENVIRONMENT.lower() == "development"

def is_production() -> bool:
    return settings.ENVIRONMENT.lower() == "production"

def is_staging() -> bool:
    return settings.ENVIRONMENT.lower() == "staging"
