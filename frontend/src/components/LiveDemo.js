import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, 
  PauseIcon, 
  SparklesIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const LiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const demoSteps = [
    {
      title: "AI Trip Planning",
      description: "Watch our multi-agent AI system create a personalized itinerary",
      component: "TripPlanningDemo",
      duration: 3000
    },
    {
      title: "Real-Time Optimization",
      description: "See how AI adapts to weather and crowd conditions",
      component: "OptimizationDemo", 
      duration: 2500
    },
    {
      title: "Conversational AI",
      description: "Experience natural language travel assistance",
      component: "ChatDemo",
      duration: 3500
    },
    {
      title: "Predictive Analytics",
      description: "View market intelligence and demand forecasting",
      component: "AnalyticsDemo",
      duration: 2000
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setCurrentStep(curr => (curr + 1) % demoSteps.length);
            return 0;
          }
          return prev + (100 / (demoSteps[currentStep].duration / 100));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, demoSteps]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    setProgress(0);
  };

  const renderDemoComponent = () => {
    const step = demoSteps[currentStep];
    
    switch (step.component) {
      case "TripPlanningDemo":
        return <TripPlanningDemo />;
      case "OptimizationDemo":
        return <OptimizationDemo />;
      case "ChatDemo":
        return <ChatDemo />;
      case "AnalyticsDemo":
        return <AnalyticsDemo />;
      default:
        return <TripPlanningDemo />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Demo Controls */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <SparklesIcon className="h-6 w-6 mr-2 text-primary-600" />
            Live Demo
          </h2>
          <button
            onClick={togglePlayback}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Navigation */}
        <div className="grid grid-cols-4 gap-2">
          {demoSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={`p-3 text-left rounded-lg transition-colors ${
                currentStep === index
                  ? 'bg-primary-100 border-2 border-primary-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="font-medium text-sm">{step.title}</div>
              <div className="text-xs text-gray-500 mt-1">{step.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className="card min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderDemoComponent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Demo Components
const TripPlanningDemo = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold flex items-center">
      <GlobeAltIcon className="h-5 w-5 mr-2 text-blue-600" />
      AI Trip Planning in Action
    </h3>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="font-medium text-blue-900">Context Analyzer Agent</div>
          <div className="text-sm text-blue-700 mt-1">Analyzing user preferences and travel history...</div>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <motion.div 
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
            />
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="font-medium text-green-900">Personalization Engine</div>
          <div className="text-sm text-green-700 mt-1">Creating personalized recommendations...</div>
          <div className="w-full bg-green-200 rounded-full h-2 mt-2">
            <motion.div 
              className="bg-green-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 2.5, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="font-medium text-gray-900 mb-3">Generated Itinerary</div>
        <div className="space-y-2 text-sm">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
            <span>Day 1: AI-Guided Louvre Tour</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
            <span>Day 2: Seine River AI Drone Tour</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
            <span>Day 3: Michelin Star Restaurant (AI-booked)</span>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

const OptimizationDemo = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold">Real-Time Optimization</h3>
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="font-medium text-yellow-900">Weather Update</div>
        <div className="text-sm text-yellow-700 mt-1">Rain detected → Moving outdoor activities indoors</div>
      </div>
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="font-medium text-red-900">Crowd Alert</div>
        <div className="text-sm text-red-700 mt-1">High crowds at Eiffel Tower → Rescheduling to 6 AM</div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="font-medium text-green-900">Price Drop</div>
        <div className="text-sm text-green-700 mt-1">Museum tickets 30% off → Auto-booking enabled</div>
      </div>
    </div>
  </div>
);

const ChatDemo = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold flex items-center">
      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-green-600" />
      Conversational AI Assistant
    </h3>
    <div className="bg-gray-50 p-4 rounded-lg max-w-md">
      <div className="space-y-3">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">User:</div>
          <div className="font-medium">"What's the weather like for my Paris trip?"</div>
        </div>
        <motion.div 
          className="bg-primary-600 text-white p-3 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="text-sm opacity-90">AI Assistant:</div>
          <div>"Great news! It's sunny for the next 3 days in Paris. I've optimized your itinerary for perfect weather - added the Seine river cruise and moved indoor activities to day 4 when rain is expected. Would you like me to book the cruise now?"</div>
        </motion.div>
      </div>
    </div>
  </div>
);

const AnalyticsDemo = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold flex items-center">
      <ChartBarIcon className="h-5 w-5 mr-2 text-purple-600" />
      Predictive Analytics Dashboard
    </h3>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="font-medium text-purple-900">Demand Forecast</div>
          <div className="text-2xl font-bold text-purple-600">High</div>
          <div className="text-sm text-purple-700">Book within 24 hours for best prices</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="font-medium text-blue-900">Price Trend</div>
          <div className="text-2xl font-bold text-blue-600">+15%</div>
          <div className="text-sm text-blue-700">Prices increasing due to local events</div>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="font-medium text-gray-900 mb-3">AI Recommendations</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Book Louvre tickets now - 30% less crowded tomorrow</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Restaurant availability at 7 PM - perfect timing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Local jazz festival tonight - tickets available</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LiveDemo;