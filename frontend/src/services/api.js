import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', new URLSearchParams({ username: email, password }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }),
  register: (userData) => api.post('/auth/register', userData),
};

// Trip API
export const tripAPI = {
  generateItinerary: (tripData) => api.post('/itinerary/generate', tripData),
  getUserTrips: () => api.get('/trips'),
  getTripItinerary: (tripId) => api.get(`/trips/${tripId}/itinerary`),
  updateItinerary: (tripId) => api.put(`/itinerary/update/${tripId}`),
};

// Booking API
export const bookingAPI = {
  bookTrip: (bookingData) => api.post('/book', bookingData),
  processPayment: (paymentData) => api.post('/payment', paymentData),
};

export default api;