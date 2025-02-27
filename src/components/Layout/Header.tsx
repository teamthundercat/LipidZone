import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { UserProfile } from '../../types';

interface HeaderProps {
  profile: UserProfile;
}

export function Header({ profile }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
          </button>
          
          <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100">
            <Settings className="h-5 w-5" />
          </button>
          
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {profile.gender === 'male' ? 'M' : profile.gender === 'female' ? 'F' : 'U'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}