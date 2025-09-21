import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { 
  SparklesIcon, 
  ChartBarIcon, 
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    aiOptimizations: 0,
    costSavings: 0,
    carbonReduction: 0,
    userSatisfaction: 0
  });

  useEffect(() => {
    // Animate stats on load
    const timer = setTimeout(() => {
      setStats({
        aiOptimizations: 247,
        costSavings: 1850,
        carbonReduction: 34,
        userSatisfaction: 96
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "Multi-Agent AI System",
      description: "5 specialized AI agents working together",
      icon: SparklesIcon,
      color: "from-purple-500 to-pink-500",
      stats: "5 AI Agents"
    },
    {
      title: "Real-Time Optimization",
      description: "Dynamic adjustments based on live data",
      icon: ArrowTrendingUpIcon,
      color: "from-blue-500 to-cyan-500",
      stats: "Live Updates"
    },
    {
      title: "Conversational AI",
      description: "Natural language travel assistant",
      icon: ChatBubbleLeftRightIcon,
      color: "from-green-500 to-emerald-500",
      stats: "24/7 Available"
    },
    {
      title: "Predictive Analytics",
      description: "Market intelligence and forecasting",
      icon: ChartBarIcon,
      color: "from-orange-500 to-red-500",
      stats: "95% Accuracy"
    },
    {
      title: "Risk Assessment",
      description: "AI-powered safety monitoring",
      icon: ShieldCheckIcon,
      color: "from-indigo-500 to-purple-500",
      stats: "Real-Time"
    },
    {
      title: "Sustainability Focus",
      description: "Carbon footprint tracking",
      icon: HeartIcon,
      color: "from-green-400 to-blue-500",
      stats: "Eco-Friendly"
    }
  ];

  const achievements = [
    { label: "AI Optimizations", value: stats.aiOptimizations, suffix: "+" },
    { label: "Cost Savings", value: stats.costSavings, prefix: "$", suffix: "+" },
    { label: "Carbon Reduction", value: stats.carbonReduction, suffix: "%" },
    { label: "User Satisfaction", value: stats.userSatisfaction, suffix: "%" }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white rounded-2xl p-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <SparklesIcon className="h-12 w-12" />
          <h1 className="text-4xl font-bold">Smart Trip Planner</h1>
        </div>
        <p className="text-xl opacity-90 mb-6">
          Powered by Multi-Agent AI System for Ultimate Travel Experience
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span>5 AI Agents Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Real-Time Processing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Production Ready</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card text-center"
          >
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {achievement.prefix}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {achievement.value}
              </motion.span>
              {achievement.suffix}
            </div>
            <div className="text-sm text-gray-600">{achievement.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {feature.description}
              </p>
              <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full inline-block">
                {feature.stats}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Demo Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-500" />
          User Guide
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: "1", title: "Enhanced Planning", desc: "AI-powered trip creation" },
            { step: "2", title: "Smart Optimization", desc: "Real-time adjustments" },
            { step: "3", title: "AI Assistant", desc: "Conversational interface" },
            { step: "4", title: "Live Analytics", desc: "Predictive insights" }
          ].map((item, index) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mb-3 mx-auto">
                {item.step}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Technical Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          🏗️ Technical Architecture
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-lg mb-3">
              <GlobeAltIcon className="h-8 w-8 text-blue-600 mx-auto" />
            </div>
            <h4 className="font-semibold mb-2">Frontend</h4>
            <p className="text-sm text-gray-600">React + Tailwind + Framer Motion</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-lg mb-3">
              <SparklesIcon className="h-8 w-8 text-green-600 mx-auto" />
            </div>
            <h4 className="font-semibold mb-2">AI Backend</h4>
            <p className="text-sm text-gray-600">FastAPI + Multi-Agent System</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-lg mb-3">
              <ChartBarIcon className="h-8 w-8 text-purple-600 mx-auto" />
            </div>
            <h4 className="font-semibold mb-2">Database</h4>
            <p className="text-sm text-gray-600">PostgreSQL + Real-time Analytics</p>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold mb-4">Ready to Experience the Future?</h3>
        <p className="text-lg opacity-90 mb-6">
          Start planning your next adventure with our AI-powered platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/plan'}
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Plan New Trip
          </button>
          <button 
            onClick={() => window.location.href = '/demo'}
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
          >
            View Demo
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;