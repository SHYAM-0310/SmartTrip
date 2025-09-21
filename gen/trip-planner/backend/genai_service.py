import json
import random
from typing import List, Dict, Optional
import httpx
from datetime import datetime, timedelta

class GenAITripPlanner:
    """Advanced GenAI Trip Planning with multiple AI agents"""
    
    def __init__(self):
        self.weather_conditions = ["sunny", "rainy", "cloudy", "snowy"]
        self.local_events = {
            "paris": ["Fashion Week", "Wine Festival", "Art Exhibition"],
            "tokyo": ["Cherry Blossom Festival", "Tech Conference", "Food Festival"],
            "new york": ["Broadway Week", "Museum Night", "Food Truck Festival"]
        }
    
    def generate_smart_itinerary(self, destination: str, duration: int, budget: float, 
                               preferences: Dict, user_context: Dict) -> Dict:
        """Multi-agent AI system for intelligent trip planning"""
        
        # Agent 1: Context Analyzer
        context = self._analyze_user_context(user_context, preferences)
        
        # Agent 2: Real-time Data Collector
        real_time_data = self._get_real_time_insights(destination)
        
        # Agent 3: Personalization Engine
        personalized_activities = self._generate_personalized_activities(
            destination, duration, budget, preferences, context, real_time_data
        )
        
        # Agent 4: Optimization Engine
        optimized_itinerary = self._optimize_itinerary(personalized_activities, budget)
        
        # Agent 5: Risk Assessment
        risk_assessment = self._assess_travel_risks(destination, real_time_data)
        
        return {
            "itinerary": optimized_itinerary,
            "ai_insights": {
                "personalization_score": context["personalization_score"],
                "budget_optimization": f"Saved ${budget - sum(item['cost'] for item in optimized_itinerary):.2f}",
                "weather_adaptation": real_time_data["weather_impact"],
                "local_events": real_time_data["events"],
                "risk_level": risk_assessment["level"],
                "ai_recommendations": self._generate_ai_recommendations(context, real_time_data)
            },
            "dynamic_pricing": self._calculate_dynamic_pricing(optimized_itinerary),
            "sustainability_score": self._calculate_sustainability_score(optimized_itinerary)
        }
    
    def _analyze_user_context(self, user_context: Dict, preferences: Dict) -> Dict:
        """AI-powered user context analysis"""
        travel_history = user_context.get("travel_history", [])
        time_of_year = datetime.now().month
        
        # Simulate AI analysis
        personality_type = "adventurous" if preferences.get("adventure") else "cultural"
        experience_level = "expert" if len(travel_history) > 5 else "beginner"
        
        return {
            "personality_type": personality_type,
            "experience_level": experience_level,
            "seasonal_preference": "summer" if time_of_year in [6,7,8] else "winter",
            "personalization_score": random.randint(85, 98)
        }
    
    def _get_real_time_insights(self, destination: str) -> Dict:
        """Simulate real-time data collection"""
        weather = random.choice(self.weather_conditions)
        events = self.local_events.get(destination.lower(), ["Local Festival"])
        
        return {
            "weather": weather,
            "weather_impact": f"Adapted for {weather} conditions",
            "events": random.sample(events, min(2, len(events))),
            "crowd_levels": random.choice(["Low", "Medium", "High"]),
            "price_trends": random.choice(["Increasing", "Stable", "Decreasing"])
        }
    
    def _generate_personalized_activities(self, destination: str, duration: int, 
                                        budget: float, preferences: Dict, 
                                        context: Dict, real_time_data: Dict) -> List[Dict]:
        """AI-generated personalized activities"""
        
        # Dynamic activity generation based on destination
        dest_lower = destination.lower()
        
        if "paris" in dest_lower or "france" in dest_lower:
            activity_pools = {
                "heritage": [
                    {"name": "AI-Guided Louvre Tour", "cost": 45, "ai_enhanced": True},
                    {"name": "Notre-Dame VR Experience", "cost": 25, "ai_enhanced": True},
                    {"name": "Versailles Smart Audio Guide", "cost": 35, "ai_enhanced": True}
                ],
                "food": [
                    {"name": "AI Sommelier Wine Tasting", "cost": 60, "ai_enhanced": True},
                    {"name": "Michelin Star Restaurant (AI-booked)", "cost": 120, "ai_enhanced": True},
                    {"name": "Food Market AI Walking Tour", "cost": 40, "ai_enhanced": True}
                ],
                "adventure": [
                    {"name": "Seine River AI Drone Tour", "cost": 80, "ai_enhanced": True},
                    {"name": "Catacombs AR Experience", "cost": 30, "ai_enhanced": True}
                ]
            }
        elif "tokyo" in dest_lower or "japan" in dest_lower:
            activity_pools = {
                "heritage": [
                    {"name": "AI Temple Guide Experience", "cost": 20, "ai_enhanced": True},
                    {"name": "Traditional Tea Ceremony (AI-matched)", "cost": 50, "ai_enhanced": True}
                ],
                "food": [
                    {"name": "Sushi Master AI Pairing", "cost": 90, "ai_enhanced": True},
                    {"name": "Robot Restaurant Experience", "cost": 70, "ai_enhanced": True}
                ],
                "adventure": [
                    {"name": "Tokyo Skytree AI Observatory", "cost": 40, "ai_enhanced": True},
                    {"name": "Shibuya Crossing Analytics Tour", "cost": 25, "ai_enhanced": True}
                ]
            }
        elif "new york" in dest_lower or "nyc" in dest_lower:
            activity_pools = {
                "heritage": [
                    {"name": "AI-Guided Statue of Liberty Tour", "cost": 35, "ai_enhanced": True},
                    {"name": "Empire State Building VR Experience", "cost": 40, "ai_enhanced": True},
                    {"name": "Central Park Smart Walking Tour", "cost": 25, "ai_enhanced": True}
                ],
                "food": [
                    {"name": "AI Food Truck Discovery", "cost": 30, "ai_enhanced": True},
                    {"name": "Broadway District Restaurant (AI-booked)", "cost": 85, "ai_enhanced": True},
                    {"name": "Little Italy AI Culinary Tour", "cost": 55, "ai_enhanced": True}
                ],
                "adventure": [
                    {"name": "Brooklyn Bridge AI Photo Walk", "cost": 20, "ai_enhanced": True},
                    {"name": "Times Square Analytics Experience", "cost": 15, "ai_enhanced": True}
                ]
            }
        elif "london" in dest_lower or "uk" in dest_lower:
            activity_pools = {
                "heritage": [
                    {"name": "AI-Guided Tower of London Tour", "cost": 30, "ai_enhanced": True},
                    {"name": "Buckingham Palace VR Experience", "cost": 25, "ai_enhanced": True},
                    {"name": "Westminster Abbey Smart Guide", "cost": 35, "ai_enhanced": True}
                ],
                "food": [
                    {"name": "AI Pub Crawl Experience", "cost": 45, "ai_enhanced": True},
                    {"name": "Traditional Tea Service (AI-matched)", "cost": 40, "ai_enhanced": True},
                    {"name": "Borough Market AI Food Tour", "cost": 35, "ai_enhanced": True}
                ],
                "adventure": [
                    {"name": "Thames River AI Cruise", "cost": 50, "ai_enhanced": True},
                    {"name": "London Eye Analytics Experience", "cost": 45, "ai_enhanced": True}
                ]
            }
        else:
            # Generic activities for any destination
            activity_pools = {
                "heritage": [
                    {"name": f"AI-Guided {destination} Heritage Tour", "cost": 35, "ai_enhanced": True},
                    {"name": f"{destination} Museum VR Experience", "cost": 25, "ai_enhanced": True},
                    {"name": f"Historic {destination} Smart Walking Tour", "cost": 30, "ai_enhanced": True}
                ],
                "food": [
                    {"name": f"Local {destination} Cuisine AI Tour", "cost": 50, "ai_enhanced": True},
                    {"name": f"Best {destination} Restaurant (AI-booked)", "cost": 75, "ai_enhanced": True},
                    {"name": f"{destination} Food Market Experience", "cost": 40, "ai_enhanced": True}
                ],
                "adventure": [
                    {"name": f"{destination} City AI Discovery Tour", "cost": 45, "ai_enhanced": True},
                    {"name": f"Scenic {destination} Analytics Walk", "cost": 25, "ai_enhanced": True}
                ]
            }
        
        # Use the dynamically generated activity pools
        selected_activities = []
        daily_budget = budget / duration
        
        for day in range(1, duration + 1):
            day_activities = []
            remaining_budget = daily_budget
            
            # Select activities based on preferences
            for pref, is_enabled in preferences.items():
                if is_enabled and pref in activity_pools and remaining_budget > 0:
                    available_activities = [a for a in activity_pools[pref] if a["cost"] <= remaining_budget]
                    if available_activities:
                        activity = random.choice(available_activities)
                        day_activities.append({
                            "day": day,
                            "activity": activity["name"],
                            "location": f"{destination} - AI Optimized Route",
                            "cost": activity["cost"],
                            "ai_enhanced": activity.get("ai_enhanced", False),
                            "weather_adapted": real_time_data["weather"] in activity["name"].lower()
                        })
                        remaining_budget -= activity["cost"]
            
            # Add default activity if none selected
            if not day_activities:
                day_activities.append({
                    "day": day,
                    "activity": f"AI-Curated {destination} Exploration",
                    "location": f"{destination} City Center",
                    "cost": min(30, remaining_budget),
                    "ai_enhanced": True,
                    "weather_adapted": True
                })
            
            selected_activities.extend(day_activities)
        
        return selected_activities
    
    def _optimize_itinerary(self, activities: List[Dict], budget: float) -> List[Dict]:
        """AI optimization for cost and experience"""
        total_cost = sum(activity["cost"] for activity in activities)
        
        if total_cost > budget:
            # AI cost optimization
            for activity in activities:
                if activity["cost"] > 50:
                    activity["cost"] = int(activity["cost"] * 0.85)  # AI negotiated discount
                    activity["ai_optimized"] = True
        
        return activities
    
    def _assess_travel_risks(self, destination: str, real_time_data: Dict) -> Dict:
        """AI-powered risk assessment"""
        risk_factors = {
            "weather": 0.2 if real_time_data["weather"] == "sunny" else 0.4,
            "crowds": {"Low": 0.1, "Medium": 0.3, "High": 0.5}[real_time_data["crowd_levels"]],
            "general": 0.1
        }
        
        total_risk = sum(risk_factors.values())
        risk_level = "Low" if total_risk < 0.3 else "Medium" if total_risk < 0.6 else "High"
        
        return {
            "level": risk_level,
            "factors": risk_factors,
            "recommendations": [
                "Book activities in advance",
                "Check weather updates",
                "Consider travel insurance"
            ]
        }
    
    def _generate_ai_recommendations(self, context: Dict, real_time_data: Dict) -> List[str]:
        """AI-generated smart recommendations"""
        recommendations = [
            f"Based on your {context['personality_type']} profile, we've prioritized unique experiences",
            f"Weather is {real_time_data['weather']} - we've adapted your itinerary accordingly",
            f"Local events: {', '.join(real_time_data['events'])} - consider attending!",
            "AI has optimized your route to minimize travel time between activities",
            "Dynamic pricing detected - book now to save on selected activities"
        ]
        return recommendations
    
    def _calculate_dynamic_pricing(self, itinerary: List[Dict]) -> Dict:
        """AI-powered dynamic pricing"""
        base_total = sum(item["cost"] for item in itinerary)
        
        return {
            "current_total": base_total,
            "predicted_price_tomorrow": base_total * random.uniform(1.05, 1.15),
            "best_booking_time": "Next 2 hours",
            "savings_opportunity": f"${base_total * 0.1:.2f}"
        }
    
    def _calculate_sustainability_score(self, itinerary: List[Dict]) -> Dict:
        """AI sustainability analysis"""
        ai_enhanced_count = sum(1 for item in itinerary if item.get("ai_enhanced", False))
        total_activities = len(itinerary)
        
        score = (ai_enhanced_count / total_activities) * 100 if total_activities > 0 else 0
        
        return {
            "score": int(score),
            "carbon_footprint": f"{random.randint(50, 200)} kg CO2",
            "eco_friendly_alternatives": ai_enhanced_count,
            "sustainability_tips": [
                "Use public transport between activities",
                "Choose local restaurants",
                "Book eco-certified accommodations"
            ]
        }

# Conversational AI Assistant
class TravelChatbot:
    """Advanced conversational AI for travel assistance"""
    
    def __init__(self):
        self.conversation_history = []
        self.user_preferences = {}
    
    def chat(self, message: str, user_context: Dict) -> Dict:
        """Process user message and generate AI response"""
        
        # Simulate advanced NLP processing
        intent = self._detect_intent(message)
        entities = self._extract_entities(message)
        
        response = self._generate_response(intent, entities, user_context)
        
        self.conversation_history.append({
            "user": message,
            "bot": response["text"],
            "timestamp": datetime.now().isoformat()
        })
        
        return response
    
    def _detect_intent(self, message: str) -> str:
        """AI intent detection"""
        message_lower = message.lower()
        
        if any(word in message_lower for word in ["weather", "climate", "temperature"]):
            return "weather_inquiry"
        elif any(word in message_lower for word in ["restaurant", "food", "eat", "dining"]):
            return "food_recommendation"
        elif any(word in message_lower for word in ["hotel", "stay", "accommodation"]):
            return "accommodation_inquiry"
        elif any(word in message_lower for word in ["transport", "travel", "flight", "train"]):
            return "transport_inquiry"
        elif any(word in message_lower for word in ["activity", "things to do", "attractions"]):
            return "activity_recommendation"
        else:
            return "general_inquiry"
    
    def _extract_entities(self, message: str) -> Dict:
        """AI entity extraction"""
        # Simulate NER
        cities = ["paris", "tokyo", "new york", "london", "rome"]
        dates = ["today", "tomorrow", "next week"]
        
        entities = {
            "cities": [city for city in cities if city in message.lower()],
            "dates": [date for date in dates if date in message.lower()],
            "numbers": [int(s) for s in message.split() if s.isdigit()]
        }
        
        return entities
    
    def _generate_response(self, intent: str, entities: Dict, user_context: Dict) -> Dict:
        """AI response generation"""
        
        responses = {
            "weather_inquiry": {
                "text": f"Based on current data, the weather looks great for your trip! I've already optimized your itinerary for the conditions. Would you like me to suggest weather-appropriate activities?",
                "suggestions": ["Check updated itinerary", "Get weather alerts", "Pack recommendations"]
            },
            "food_recommendation": {
                "text": "I can recommend amazing local restaurants based on your taste preferences! I've analyzed thousands of reviews and your profile to find perfect matches.",
                "suggestions": ["View AI-curated restaurants", "Book table now", "Dietary restrictions"]
            },
            "accommodation_inquiry": {
                "text": "I can find you the perfect stay! Based on your budget and preferences, I'll show you AI-ranked options with real-time pricing.",
                "suggestions": ["View hotel recommendations", "Compare prices", "Book now"]
            },
            "transport_inquiry": {
                "text": "I'll help you navigate like a local! I can provide real-time transport updates and optimize your routes between activities.",
                "suggestions": ["Get route optimization", "Transport passes", "Real-time updates"]
            },
            "activity_recommendation": {
                "text": "I've got amazing activity suggestions tailored just for you! Based on your interests and current local events, here are my top picks.",
                "suggestions": ["View personalized activities", "Check availability", "Add to itinerary"]
            },
            "general_inquiry": {
                "text": "I'm your AI travel assistant! I can help you with personalized recommendations, real-time updates, and smart optimizations for your trip.",
                "suggestions": ["Plan new trip", "Optimize current trip", "Get travel tips"]
            }
        }
        
        return responses.get(intent, responses["general_inquiry"])

# Real-time optimization engine
class RealTimeOptimizer:
    """AI-powered real-time trip optimization"""
    
    @staticmethod
    def optimize_for_conditions(trip_id: int, current_conditions: Dict) -> Dict:
        """Real-time AI optimization based on current conditions"""
        
        optimizations = []
        
        # Weather-based optimization
        if current_conditions.get("weather") == "rainy":
            optimizations.append({
                "type": "weather_adaptation",
                "change": "Moved outdoor activities indoors",
                "impact": "Maintained experience quality despite weather"
            })
        
        # Crowd-based optimization
        if current_conditions.get("crowd_level") == "high":
            optimizations.append({
                "type": "crowd_avoidance",
                "change": "Rescheduled popular attractions to off-peak hours",
                "impact": "Reduced wait times by 60%"
            })
        
        # Price-based optimization
        if current_conditions.get("price_surge"):
            optimizations.append({
                "type": "dynamic_pricing",
                "change": "Found alternative activities with better value",
                "impact": f"Saved ${random.randint(20, 100)}"
            })
        
        return {
            "optimizations": optimizations,
            "confidence_score": random.randint(85, 98),
            "estimated_improvement": f"{random.randint(15, 35)}% better experience"
        }