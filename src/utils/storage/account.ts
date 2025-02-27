import { AccountData, AccountSettings } from '../../types/account';

const ACCOUNT_KEY = 'nutrition-tracker-account';

const DEFAULT_ACCOUNT: AccountData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US'
};

function saveAccount(data: AccountData): void {
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(data));
}

export function getAccount(): AccountData {
  try {
    const stored = localStorage.getItem(ACCOUNT_KEY);
    if (!stored) return DEFAULT_ACCOUNT;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to get account data:', error);
    return DEFAULT_ACCOUNT;
  }
}

function updatePassword(oldPassword: string, newPassword: string): Promise<void> {
  // In a real app, this would make an API call to update the password
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Password updated');
      resolve();
    }, 500);
  });
}

function updateLicense(key: string): Promise<void> {
  // In a real app, this would validate the license key with an API
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('License updated:', key);
      resolve();
    }, 500);
  });
}