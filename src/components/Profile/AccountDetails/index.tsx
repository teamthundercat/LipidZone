import React from 'react';
import { AccountInfo } from './AccountInfo';
import { SecuritySettings } from './SecuritySettings';
import { AccountData } from '../../../types/account';

interface AccountDetailsProps {
  data: AccountData;
  onUpdate: (data: AccountData) => void;
  onPasswordChange: (oldPassword: string, newPassword: string) => void;
  onLicenseUpdate: (key: string) => void;
}

export function AccountDetails({ 
  data, 
  onUpdate, 
  onPasswordChange, 
  onLicenseUpdate 
}: AccountDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Account Information</h2>
        <AccountInfo data={data} onUpdate={onUpdate} />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
        <SecuritySettings 
          onPasswordChange={onPasswordChange}
          onLicenseUpdate={onLicenseUpdate}
        />
      </div>
    </div>
  );
}