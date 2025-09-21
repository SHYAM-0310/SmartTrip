from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    preferences = Column(JSON, default={})
    budget = Column(Float, default=1000.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    trips = relationship("Trip", back_populates="user")

class Trip(Base):
    __tablename__ = "trips"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    destination = Column(String, nullable=False)
    duration = Column(Integer, nullable=False)
    total_cost = Column(Float, default=0.0)
    status = Column(String, default="planning")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="trips")
    itineraries = relationship("Itinerary", back_populates="trip")
    bookings = relationship("Booking", back_populates="trip")

class Itinerary(Base):
    __tablename__ = "itineraries"
    
    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    day = Column(Integer, nullable=False)
    activity = Column(Text, nullable=False)
    location = Column(String, nullable=False)
    cost = Column(Float, default=0.0)
    
    trip = relationship("Trip", back_populates="itineraries")

class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    item_type = Column(String, nullable=False)
    item_id = Column(String, nullable=False)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    trip = relationship("Trip", back_populates="bookings")
    payments = relationship("Payment", back_populates="booking")

class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"), nullable=False)
    amount = Column(Float, nullable=False)
    method = Column(String, nullable=False)
    status = Column(String, default="pending")
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    booking = relationship("Booking", back_populates="payments")