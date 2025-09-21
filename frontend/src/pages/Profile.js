import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { UserIcon, CurrencyDollarIcon, HeartIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    budget: user?.budget || 1000,
    preferences: user?.preferences || {},
  });

  const handleSave = async () => {
    // In a real app, this would make an API call to update the user profile
    toast.success('Profile updated successfully!');
    setEditing(false);
  };

  const handlePreferenceChange = (preference) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: !prev.preferences[preference]
      }
    }));
  };

  const preferenceOptions = [
    { key: 'heritage', label: 'Heritage & Culture', icon: '🏛️' },
    { key: 'nightlife', label: 'Nightlife', icon: '🌃' },
    { key: 'adventure', label: 'Adventure Sports', icon: '🏔️' },
    { key: 'food', label: 'Food & Dining', icon: '🍽️' },
    { key: 'shopping', label: 'Shopping', icon: '🛍️' },
    { key: 'nature', label: 'Nature & Wildlife', icon: '🌿' },
    { key: 'beaches', label: 'Beaches', icon: '🏖️' },
    { key: 'museums', label: 'Museums & Art', icon: '🎨' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserIcon className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and preferences</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          <button
            onClick={() => editing ? handleSave() : setEditing(true)}
            className={editing ? 'btn-primary' : 'btn-secondary'}
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {editing ? (
              <input
                type="text"
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            ) : (
              <p className="text-gray-900">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <p className="text-gray-900">{user.email}</p>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CurrencyDollarIcon className="h-4 w-4 inline mr-1" />
              Travel Budget
            </label>
            {editing ? (
              <input
                type="number"
                min="100"
                className="input-field"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
              />
            ) : (
              <p className="text-gray-900">${user.budget}</p>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          <HeartIcon className="h-5 w-5 inline mr-2" />
          Travel Preferences
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preferenceOptions.map((option) => (
            <label
              key={option.key}
              className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                formData.preferences[option.key]
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.preferences[option.key] || false}
                onChange={() => editing && handlePreferenceChange(option.key)}
                disabled={!editing}
                className="sr-only"
              />
              <span className="text-2xl">{option.icon}</span>
              <span className="font-medium text-gray-900">{option.label}</span>
              {formData.preferences[option.key] && (
                <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></div>
              )}
            </label>
          ))}
        </div>

        {!editing && (
          <p className="text-sm text-gray-500 mt-4">
            Click "Edit Profile" to update your preferences
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card bg-gray-50"
      >
        <h3 className="font-medium text-gray-900 mb-2">Account Statistics</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary-600">0</p>
            <p className="text-sm text-gray-600">Trips Planned</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-600">$0</p>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-600">0</p>
            <p className="text-sm text-gray-600">Countries Visited</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;