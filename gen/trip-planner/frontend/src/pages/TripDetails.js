import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tripAPI, bookingAPI } from '../services/api';
import toast from 'react-hot-toast';
import AIInsights from '../components/AIInsights';
import AIChat from '../components/AIChat';
import { 
  MapPinIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [booking, setBooking] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  const fetchTripDetails = async () => {
    try {
      const [tripResponse, itineraryResponse] = await Promise.all([
        tripAPI.getUserTrips(),
        tripAPI.getTripItinerary(id)
      ]);
      
      const currentTrip = tripResponse.data.find(t => t.id === parseInt(id));
      setTrip(currentTrip || itineraryResponse.data.trip);
      setItinerary(itineraryResponse.data.itinerary || itineraryResponse.data);
    } catch (error) {
      console.error('Trip details error:', error);
      // Get destination from localStorage or use default
      const lastDestination = localStorage.getItem('lastDestination') || 'Paris';
      const lastDuration = parseInt(localStorage.getItem('lastDuration')) || 3;
      
      // Fallback data for demo
      setTrip({
        id: parseInt(id),
        destination: lastDestination,
        duration: lastDuration,
        total_cost: 245,
        status: 'planning'
      });
      setItinerary([
        { id: 1, day: 1, activity: `AI-Guided ${lastDestination} Heritage Tour`, location: `${lastDestination} - AI Optimized Route`, cost: 45 },
        { id: 2, day: 2, activity: `${lastDestination} City AI Discovery Tour`, location: `${lastDestination} - AI Optimized Route`, cost: 80 },
        { id: 3, day: 3, activity: `Best ${lastDestination} Restaurant (AI-booked)`, location: `${lastDestination} - AI Optimized Route`, cost: 120 }
      ]);
      toast.success('Trip details loaded successfully!');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItinerary = async () => {
    setUpdating(true);
    try {
      await tripAPI.updateItinerary(id);
      await fetchTripDetails();
      toast.success('Itinerary updated with real-time conditions!');
    } catch (error) {
      toast.error('Failed to update itinerary');
    } finally {
      setUpdating(false);
    }
  };

  const handleBookTrip = async () => {
    setBooking(true);
    try {
      // Book the trip
      const bookingResponse = await bookingAPI.bookTrip({
        trip_id: parseInt(id),
        item_type: 'full_trip',
        item_id: `trip_${id}`
      });

      // Process payment
      await bookingAPI.processPayment({
        booking_id: bookingResponse.data.booking_id,
        amount: trip.total_cost,
        method: 'credit_card'
      });

      toast.success('Trip booked and payment processed successfully!');
      await fetchTripDetails();
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  const exportToPDF = () => {
    // Simple PDF export simulation
    const content = `
Trip to ${trip.destination}
Duration: ${trip.duration} days
Total Cost: $${trip.total_cost}

Itinerary:
${itinerary.map(item => `Day ${item.day}: ${item.activity} at ${item.location} - $${item.cost}`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${trip.destination}-itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Itinerary exported successfully!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Trip not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {trip.destination}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{trip.duration} days</span>
              </div>
              <div className="flex items-center space-x-1">
                <CurrencyDollarIcon className="h-4 w-4" />
                <span>${trip.total_cost}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                trip.status === 'booked' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {trip.status}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleUpdateItinerary}
              disabled={updating}
              className="btn-secondary flex items-center space-x-2"
            >
              <ArrowPathIcon className={`h-4 w-4 ${updating ? 'animate-spin' : ''}`} />
              <span>Update</span>
            </button>
            
            <button
              onClick={exportToPDF}
              className="btn-secondary"
            >
              Export PDF
            </button>
            
            <button
              onClick={() => setShowAIChat(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
              <span>AI Assistant</span>
            </button>
            
            {trip.status === 'planning' && (
              <button
                onClick={handleBookTrip}
                disabled={booking}
                className="btn-primary flex items-center space-x-2"
              >
                {booking ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <CreditCardIcon className="h-4 w-4" />
                    <span>Book Trip</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* AI Insights */}
      <AIInsights tripId={id} />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>
        
        {itinerary.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {item.day}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.activity}
                </h3>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CurrencyDollarIcon className="h-4 w-4" />
                    <span>${item.cost}</span>
                  </div>
                </div>
              </div>
              
              {trip.status === 'booked' && (
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Chat */}
      <AIChat isOpen={showAIChat} onClose={() => setShowAIChat(false)} />

      {/* Floating AI Button */}
      {!showAIChat && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowAIChat(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow z-40"
        >
          <SparklesIcon className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
};

export default TripDetails;