import React from 'react';
import { Mail, Phone, MapPin, User, Users, AtSign } from 'lucide-react';
import { AccountData } from '../../../types/account';

interface AccountInfoProps {
  data: AccountData;
  onUpdate: (data: AccountData) => void;
}

export function AccountInfo({ data, onUpdate }: AccountInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AtSign className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="username"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-3">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email address"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-3">Address</h3>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="Street address"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                name="city"
                value={data.city}
                onChange={handleChange}
                placeholder="City"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="state"
                value={data.state}
                onChange={handleChange}
                placeholder="State"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="zipCode"
                value={data.zipCode}
                onChange={handleChange}
                placeholder="ZIP code"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                name="country"
                value={data.country}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}