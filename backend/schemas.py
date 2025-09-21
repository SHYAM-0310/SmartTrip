from pydantic import BaseModel
from typing import Optional, Dict, List
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    preferences: Optional[Dict] = {}
    budget: Optional[float] = 1000.0

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    preferences: Dict
    budget: float
    created_at: datetime
    
    class Config:
        from_attributes = True

class TripCreate(BaseModel):
    destination: str
    duration: int

class TripResponse(BaseModel):
    id: int
    destination: str
    duration: int
    total_cost: float
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ItineraryResponse(BaseModel):
    id: int
    day: int
    activity: str
    location: str
    cost: float
    
    class Config:
        from_attributes = True

class BookingCreate(BaseModel):
    trip_id: int
    item_type: str
    item_id: str

class PaymentCreate(BaseModel):
    booking_id: int
    amount: float
    method: str