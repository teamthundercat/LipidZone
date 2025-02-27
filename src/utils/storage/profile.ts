import { UserProfile } from '../../types';

const PROFILE_KEY = 'nutrition-tracker-profile';

const DEFAULT_PROFILE: UserProfile = {
  age: 30,
  height: 70,
  weight: 160,
  gender: 'male',
  activityLevel: 'moderate',
  unitSystem: 'standard'
};

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getProfile(): UserProfile {
  try {
    const stored = localStorage.getItem(PROFILE_KEY);
    if (!stored) return DEFAULT_PROFILE;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to get profile:', error);
    return DEFAULT_PROFILE;
  }
}