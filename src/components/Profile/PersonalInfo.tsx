import React from 'react';
import { UserProfile } from '../../types';
import { UnitToggle } from '../UnitToggle';
import { convertHeight, convertWeight } from '../../utils/units';
import { User, Ruler, Scale } from 'lucide-react';

interface PersonalInfoProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

export function PersonalInfo({ profile, onUpdate }: PersonalInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdate({
      ...profile,
      [name]: name === 'age' || name === 'height' || name === 'weight' 
        ? Number(value) 
        : value
    });
  };

  const handleUnitChange = (system: UserProfile['unitSystem']) => {
    const newHeight = convertHeight(profile.height, profile.unitSystem);
    const newWeight = convertWeight(profile.weight, profile.unitSystem);
    
    onUpdate({
      ...profile,
      unitSystem: system,
      height: newHeight,
      weight: newWeight
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              min="0"
              max="120"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Physical Measurements */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Physical Measurements</h2>
          <UnitToggle value={profile.unitSystem} onChange={handleUnitChange} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height {profile.unitSystem === 'metric' ? '(cm)' : '(in)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Ruler className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                name="height"
                value={profile.height}
                onChange={handleChange}
                className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight {profile.unitSystem === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Scale className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                name="weight"
                value={profile.weight}
                onChange={handleChange}
                className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}