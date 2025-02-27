import React, { useState } from 'react';
import { Key, Shield, Lock, AlertTriangle, Check } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface SecuritySettingsProps {
  onPasswordChange: (oldPassword: string, newPassword: string) => void;
  onLicenseUpdate: (key: string) => void;
}

const LICENSE_TIERS = [
  {
    tier: 1,
    name: 'Free',
    features: [
      'Basic food recognition',
      'Limited daily uploads',
      'Standard response time',
      'Community support'
    ]
  },
  {
    tier: 2,
    name: 'Pro',
    features: [
      'Advanced food recognition',
      'Medication analysis',
      'Increased daily uploads',
      'Priority support',
      'Custom API integration'
    ]
  },
  {
    tier: 3,
    name: 'Business',
    features: [
      'Enterprise-grade recognition',
      'Unlimited uploads',
      'Real-time analysis',
      'Dedicated support',
      'Multiple API providers',
      'Custom integrations'
    ]
  },
  {
    tier: 4,
    name: 'Enterprise',
    features: [
      'Custom ML models',
      'Unlimited everything',
      'White-label options',
      '24/7 dedicated support',
      'Custom development',
      'SLA guarantees'
    ]
  }
];

export function SecuritySettings({ onPasswordChange, onLicenseUpdate }: SecuritySettingsProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [selectedTier, setSelectedTier] = useState(1);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    onPasswordChange(currentPassword, newPassword);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLicenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLicenseUpdate(licenseKey);
    setLicenseKey('');
  };

  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-3">Password Settings</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* License Section */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-3">License Information</h3>
        <div className="space-y-4">
          {/* Current License */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium">Free Tier</h4>
                <p className="text-sm text-gray-600">Basic features for personal use</p>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Active
              </div>
            </div>
          </div>
          
          {/* License Key Input */}
          <form onSubmit={handleLicenseSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Key</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="Enter your license key"
                  className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium mb-1">Important License Information</p>
                <ul className="space-y-1">
                  <li>• Your license key provides access to premium features</li>
                  <li>• Each tier includes features from previous tiers</li>
                  <li>• License keys are non-transferable</li>
                  <li>• Contact support for enterprise customization</li>
                </ul>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Update License
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}