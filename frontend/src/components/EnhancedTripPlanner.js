import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tripAPI } from '../services/api';
import toast from 'react-hot-toast';
import { 
  SparklesIcon, 
  ChartBarIcon, 
  GlobeAltIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const EnhancedTripPlanner = () => {
  const [formData, setFormData] = useState({
    destination: '',
    duration: 3,
    travelStyle: 'balanced',
    groupSize: 1,
    interests: []
  });
  const [loading, setLoading] = useState(false);
  const [aiPredictions, setAiPredictions] = useState(null);
  const navigate = useNavigate();

  const travelStyles = [
    { id: 'luxury', name: 'Luxury', icon: '✨', desc: 'Premium experiences' },
    { id: 'balanced', name: 'Balanced', icon: '⚖️', desc: 'Best value mix' },
    { id: 'budget', name: 'Budget', icon: '💰', desc: 'Cost-effective' },
    { id: 'adventure', name: 'Adventure', icon: '🏔️', desc: 'Thrill-seeking' }
  ];

  const interests = [
    'Heritage & Culture', 'Food & Dining', 'Nightlife', 'Adventure Sports',
    'Nature & Wildlife', 'Shopping', 'Art & Museums', 'Local Experiences',
    'Photography', 'Wellness & Spa', 'Music & Entertainment', 'Architecture'
  ];

  const popularDestinations = [
    { name: 'Paris, France', trend: '+15%', ai_score: 94 },
    { name: 'Tokyo, Japan', trend: '+22%', ai_score: 91 },
    { name: 'New York, USA', trend: '+8%', ai_score: 89 },
    { name: 'London, UK', trend: '+12%', ai_score: 87 },
    { name: 'Rome, Italy', trend: '+18%', ai_score: 92 },
    { name: 'Barcelona, Spain', trend: '+25%', ai_score: 90 }
  ];

  const handleDestinationChange = async (destination) => {
    setFormData(prev => ({ ...prev, destination }));
    
    // Simulate AI predictions
    setTimeout(() => {
      setAiPredictions({
        demand: Math.random() > 0.5 ? 'High' : 'Medium',
        pricing: Math.random() > 0.5 ? 'Increasing' : 'Stable',
        weather: 'Perfect for travel',
        events: ['Local Festival', 'Art Exhibition'],
        bestTime: 'Next 48 hours'
      });
    }, 500);
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Store destination and duration for trip details page
      localStorage.setItem('lastDestination', formData.destination);
      localStorage.setItem('lastDuration', formData.duration.toString());
      
      const response = await tripAPI.generateItinerary({
        destination: formData.destination,
        duration: formData.duration
      });
      toast.success('🤖 AI has crafted your perfect itinerary!');
      if (response.data.trip) {
        navigate(`/trip/${response.data.trip.id}`);
      } else {
        navigate(`/trip/${response.data.id}`);
      }
    } catch (error) {
      toast.error('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-3 rounded-full">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            AI Trip Planner 2.0
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Powered by advanced AI agents for the ultimate personalized experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="card space-y-6"
          >
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <GlobeAltIcon className="h-4 w-4 inline mr-2" />
                Where would you like to explore?
              </label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.destination}
                onChange={(e) => handleDestinationChange(e.target.value)}
                placeholder="Enter destination..."
              />
              
              {/* Popular Destinations */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-3">🔥 Trending destinations:</p>
                <div className="grid grid-cols-2 gap-2">
                  {popularDestinations.map((dest) => (
                    <button
                      key={dest.name}
                      type="button"
                      onClick={() => handleDestinationChange(dest.name)}
                      className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border"
                    >
                      <div className="font-medium text-sm">{dest.name}</div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span className="text-green-600">{dest.trend}</span>
                        <span>AI Score: {dest.ai_score}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Duration & Group Size */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (days)
                </label>
                <select
                  className="input-field"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 10, 14].map(days => (
                    <option key={days} value={days}>
                      {days} {days === 1 ? 'day' : 'days'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Size
                </label>
                <select
                  className="input-field"
                  value={formData.groupSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
                >
                  {[1, 2, 3, 4, 5, 6].map(size => (
                    <option key={size} value={size}>
                      {size} {size === 1 ? 'person' : 'people'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Travel Style
              </label>
              <div className="grid grid-cols-2 gap-3">
                {travelStyles.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, travelStyle: style.id }))}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      formData.travelStyle === style.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{style.icon}</div>
                    <div className="font-medium">{style.name}</div>
                    <div className="text-xs text-gray-500">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What interests you? (Select multiple)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      formData.interests.includes(interest)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 flex items-center justify-center space-x-2 py-4"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>AI is crafting your perfect trip...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5" />
                  <span>Generate AI-Powered Itinerary</span>
                </>
              )}
            </button>
          </motion.form>
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-6">
          {/* AI Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-primary-600" />
              AI-Powered Features
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <LightBulbIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Smart Recommendations</div>
                  <div className="text-xs text-gray-500">Personalized based on your profile</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldCheckIcon className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Risk Assessment</div>
                  <div className="text-xs text-gray-500">Real-time safety monitoring</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <HeartIcon className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Sustainability Score</div>
                  <div className="text-xs text-gray-500">Eco-friendly travel options</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Predictions */}
          {aiPredictions && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card bg-gradient-to-br from-blue-50 to-purple-50"
            >
              <h3 className="font-bold text-gray-900 mb-4">🤖 AI Market Intelligence</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Demand Level:</span>
                  <span className={`font-medium ${
                    aiPredictions.demand === 'High' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {aiPredictions.demand}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Price Trend:</span>
                  <span className="font-medium text-blue-600">{aiPredictions.pricing}</span>
                </div>
                <div className="flex justify-between">
                  <span>Weather:</span>
                  <span className="font-medium text-green-600">{aiPredictions.weather}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Best booking time:</div>
                  <div className="font-medium text-primary-600">{aiPredictions.bestTime}</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedTripPlanner;