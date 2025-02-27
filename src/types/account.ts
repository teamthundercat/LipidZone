import { UserProfile } from './index';

export interface AccountData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AccountSettings {
  data: AccountData;
  licenseKey?: string;
  lastPasswordChange?: string;
}