import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tripAPI } from '../services/api';
import toast from 'react-hot-toast';
import { SparklesIcon } from '@heroicons/react/24/outline';

const TripPlanner = () => {
  const [formData, setFormData] = useState({
    destination: '',
    duration: 3,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const popularDestinations = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'London, UK',
    'Rome, Italy',
    'Barcelona, Spain',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await tripAPI.generateItinerary(formData);
      toast.success('Trip itinerary generated successfully!');
      navigate(`/trip/${response.data.id}`);
    } catch (error) {
      toast.error('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <SparklesIcon className="h-8 w-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Trip Planner</h1>
        </div>
        <p className="text-gray-600">
          Let our AI create a personalized itinerary based on your preferences
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="card space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination
          </label>
          <input
            type="text"
            required
            className="input-field"
            value={formData.destination}
            onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
            placeholder="Where would you like to go?"
          />
          
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">Popular destinations:</p>
            <div className="flex flex-wrap gap-2">
              {popularDestinations.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, destination: dest }))}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>
        </div>

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

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">AI will consider:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your budget and preferences from your profile</li>
            <li>• Real-time weather conditions</li>
            <li>• Popular attractions and hidden gems</li>
            <li>• Optimal routing and timing</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Generating itinerary...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="h-5 w-5" />
              <span>Generate AI Itinerary</span>
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
};

export default TripPlanner;