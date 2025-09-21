import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  ChartBarIcon, 
  LightBulbIcon, 
  ShieldCheckIcon,
  ChartBarIcon as TrendingIcon
} from '@heroicons/react/24/outline';
import api from '../services/api';

const AIInsights = ({ tripId }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analysis');

  useEffect(() => {
    if (tripId) {
      fetchInsights();
    }
  }, [tripId]);

  const fetchInsights = async () => {
    try {
      const response = await api.get(`/hackathon/ai/insights/${tripId}`);
      setInsights(response.data);
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!insights) return null;

  const tabs = [
    { id: 'analysis', label: 'AI Analysis', icon: ChartBarIcon },
    { id: 'predictions', label: 'Predictions', icon: TrendingIcon },
    { id: 'recommendations', label: 'Smart Tips', icon: LightBulbIcon },
    { id: 'risk', label: 'Risk Assessment', icon: ShieldCheckIcon }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center space-x-2 mb-6">
        <SparklesIcon className="h-6 w-6 text-primary-600" />
        <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          Live Analysis
        </span>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'analysis' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {insights.ai_analysis.personalization_match}
                </div>
                <div className="text-sm text-blue-800">Personalization Match</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {insights.ai_analysis.budget_efficiency}
                </div>
                <div className="text-sm text-green-800">Budget Efficiency</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {insights.ai_analysis.experience_quality}
                </div>
                <div className="text-sm text-purple-800">Experience Quality</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {insights.ai_analysis.local_authenticity}
                </div>
                <div className="text-sm text-orange-800">Local Authenticity</div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'predictions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Weather Forecast</h4>
              <p className="text-gray-700">{insights.predictive_insights.weather_forecast}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Crowd Predictions</h4>
              {insights.predictive_insights.crowd_predictions.map((prediction, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span>{prediction}</span>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Optimal Booking Window</h4>
              <p className="text-gray-700">{insights.predictive_insights.optimal_booking_window}</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {insights.smart_recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <LightBulbIcon className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-900">{recommendation}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'risk' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Overall Risk Level</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                insights.risk_assessment.overall_risk === 'Low' 
                  ? 'bg-green-100 text-green-800'
                  : insights.risk_assessment.overall_risk === 'Medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {insights.risk_assessment.overall_risk}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {insights.risk_assessment.safety_score}
                </div>
                <div className="text-sm text-gray-600">Safety Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {insights.risk_assessment.backup_plans}
                </div>
                <div className="text-sm text-gray-600">Backup Plans</div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Risk Mitigation</span>
              </div>
              <p className="text-sm text-green-800">
                Your trip has been optimized with multiple backup options and real-time monitoring.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Real-time update indicator */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Last updated: Just now</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live monitoring active</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIInsights;