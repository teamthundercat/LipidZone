import React from 'react';
import { Key, Shield } from 'lucide-react';

export function LicenseDetails() {
  return (
    <div className="space-y-6">
      {/* Current License Status */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200 -mx-6 -mt-6 mb-6">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Current License</h3>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold">Free Tier</h4>
            <p className="text-sm text-gray-600">Basic features for personal use</p>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Active
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h5 className="font-medium mb-2">Included Features:</h5>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-blue-500 font-bold">•</span>
              <span>Food Analysis (5/day)</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-blue-500 font-bold">•</span>
              <span>Basic Nutrition Tracking</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-blue-500 font-bold">•</span>
              <span>Basic Heart Health Insights</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-blue-500 font-bold">•</span>
              <span>Medication Tracking (3 max)</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-blue-500 font-bold">•</span>
              <span>OpenAI Provider Only</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* License Key Input */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200 -mx-6 -mt-6 mb-6">
          <Key className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">License Activation</h3>
        </div>
        
        <p className="text-gray-600 mb-4">
          Enter your license key to unlock premium features. If you've purchased a license or received a key from your organization, activate it here.
        </p>
        
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Activate License
          </button>
        </div>
      </div>
      
      {/* License History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200 -mx-6 -mt-6 mb-6">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">License History</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  License Key
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activated
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No license history found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Upgrade CTA */}
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to unlock premium features?</h3>
        <p className="text-gray-600 mb-4">Upgrade your plan to access advanced nutrition tracking, unlimited food analysis, and more.</p>
        <a 
          href="/settings/upgrade" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          View Upgrade Options
        </a>
      </div>
    </div>
  );
}