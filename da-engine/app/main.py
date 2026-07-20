from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import router as api_router
from app.acquisition.scheduler import polling_scheduler
from loguru import logger
import app.logging.logger  # registers and sets up loguru

app = FastAPI(
    title="AAI Smart Washroom Data Analysis (DA) Engine",
    version="1.0.0",
    description="Independent Python analytics service processing live airport washroom telemetry."
)

# Allow CORS for Next.js portal integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up Data Analysis Engine...")
    polling_scheduler.start()

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down Data Analysis Engine...")
    polling_scheduler.stop()

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "da-engine"}
