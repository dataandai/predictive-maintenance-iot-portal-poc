from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
import random

app = FastAPI(title="Predictive Maintenance API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Device(BaseModel):
    id: str
    name: str
    status: str
    health_score: int
    vibration: float
    temperature: float
    uptime: float

DEVICES = [
    {"id": "PUMP-001", "name": "Main Cooling Pump", "status": "Operational", "health_score": 98, "vibration": 0.12, "temperature": 42.5, "uptime": 1240.5},
    {"id": "TURB-042", "name": "Steam Turbine A", "status": "Warning", "health_score": 64, "vibration": 0.85, "temperature": 88.2, "uptime": 850.2},
    {"id": "COMP-009", "name": "Air Compressor", "status": "Critical", "health_score": 22, "vibration": 1.45, "temperature": 112.8, "uptime": 432.1},
    {"id": "CONV-012", "name": "Assembly Conveyor", "status": "Operational", "health_score": 91, "vibration": 0.24, "temperature": 38.4, "uptime": 2100.0}
]

@app.get("/api/stats")
def get_stats():
    return {
        "total_assets": len(DEVICES),
        "critical_alerts": sum(1 for d in DEVICES if d["status"] == "Critical"),
        "avg_health": sum(d["health_score"] for d in DEVICES) / len(DEVICES),
        "uptime_percentage": 99.8
    }

@app.get("/api/devices")
def get_devices():
    return DEVICES

@app.get("/api/alerts")
def get_alerts():
    return [
        {
            "id": 1,
            "timestamp": datetime.now().isoformat(),
            "severity": "High",
            "message": "Abnormal vibration detected on Steam Turbine A",
            "asset": "TURB-042"
        },
        {
            "id": 2,
            "timestamp": (datetime.now() - timedelta(hours=2)).isoformat(),
            "severity": "Critical",
            "message": "Temperature exceeds threshold on Air Compressor",
            "asset": "COMP-009"
        }
    ]