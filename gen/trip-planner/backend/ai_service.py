import random
from typing import List, Dict
import httpx

# Simulated AI service for trip planning
def generate_itinerary(destination: str, duration: int, budget: float, preferences: Dict) -> List[Dict]:
    """Generate AI-powered itinerary based on user preferences"""
    
    # Sample activities based on destination and preferences
    activities_db = {
        "paris": [
            {"activity": "Visit Eiffel Tower", "location": "Champ de Mars", "cost": 25},
            {"activity": "Louvre Museum Tour", "location": "Louvre", "cost": 17},
            {"activity": "Seine River Cruise", "location": "Seine River", "cost": 15},
            {"activity": "Montmartre Walking Tour", "location": "Montmartre", "cost": 20},
            {"activity": "Notre-Dame Cathedral", "location": "Île de la Cité", "cost": 0},
        ],
        "tokyo": [
            {"activity": "Visit Senso-ji Temple", "location": "Asakusa", "cost": 0},
            {"activity": "Tokyo Skytree Observatory", "location": "Sumida", "cost": 30},
            {"activity": "Tsukiji Fish Market", "location": "Tsukiji", "cost": 10},
            {"activity": "Shibuya Crossing Experience", "location": "Shibuya", "cost": 0},
            {"activity": "Imperial Palace Gardens", "location": "Chiyoda", "cost": 0},
        ],
        "new york": [
            {"activity": "Statue of Liberty Tour", "location": "Liberty Island", "cost": 25},
            {"activity": "Central Park Walk", "location": "Manhattan", "cost": 0},
            {"activity": "Empire State Building", "location": "Midtown", "cost": 40},
            {"activity": "Broadway Show", "location": "Theater District", "cost": 150},
            {"activity": "9/11 Memorial", "location": "Lower Manhattan", "cost": 0},
        ]
    }
    
    # Get activities for destination (default to Paris if not found)
    dest_key = destination.lower()
    available_activities = activities_db.get(dest_key, activities_db["paris"])
    
    # Generate itinerary based on duration and budget
    itinerary = []
    daily_budget = budget / duration
    
    for day in range(1, duration + 1):
        # Select activities that fit the daily budget
        suitable_activities = [act for act in available_activities if act["cost"] <= daily_budget]
        
        if suitable_activities:
            selected_activity = random.choice(suitable_activities)
            itinerary.append({
                "day": day,
                "activity": selected_activity["activity"],
                "location": selected_activity["location"],
                "cost": selected_activity["cost"]
            })
    
    return itinerary

def update_itinerary_realtime(destination: str, duration: int) -> List[Dict]:
    """Update itinerary based on real-time conditions (weather, events, etc.)"""
    
    # Simulate real-time updates
    weather_conditions = random.choice(["sunny", "rainy", "cloudy"])
    
    # Adjust activities based on weather
    if weather_conditions == "rainy":
        indoor_activities = [
            {"day": 1, "activity": "Museum Visit", "location": "City Center", "cost": 20},
            {"day": 2, "activity": "Shopping Mall", "location": "Downtown", "cost": 50},
        ]
        return indoor_activities[:duration]
    
    # Default outdoor activities for good weather
    outdoor_activities = [
        {"day": 1, "activity": "City Walking Tour", "location": "Historic District", "cost": 15},
        {"day": 2, "activity": "Park Picnic", "location": "Central Park", "cost": 10},
        {"day": 3, "activity": "Beach Visit", "location": "Coastal Area", "cost": 5},
    ]
    
    return outdoor_activities[:duration]

async def get_weather_data(destination: str) -> Dict:
    """Fetch real-time weather data"""
    # Simulated weather API response
    return {
        "temperature": random.randint(15, 30),
        "condition": random.choice(["sunny", "cloudy", "rainy"]),
        "humidity": random.randint(40, 80)
    }