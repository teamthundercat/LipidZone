import { UnitSystem } from '../types';

export function convertHeight(value: number, from: UnitSystem): number {
  return from === 'metric' 
    ? Math.round(value * 0.393701 * 10) / 10 // Convert to inches with 1 decimal
    : Math.round(value * 2.54); // Convert to cm as integer
}

export function convertWeight(value: number, from: UnitSystem): number {
  return from === 'metric'
    ? Math.round(value * 2.20462) // kg to lbs
    : Math.round(value * 0.453592); // lbs to kg
}

function formatHeightDual(inches: number): string {
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round((inches % 12) * 10) / 10;
  const cm = Math.round(inches * 2.54);
  return `${feet}'${remainingInches}"  |  ${cm} cm`;
}

function formatWeightDual(pounds: number): string {
  const kg = Math.round(pounds * 0.453592);
  return `${Math.round(pounds)} lbs  |  ${kg} kg`;
}

function formatWeight(value: number, system: UnitSystem): string {
  const unit = system === 'metric' ? 'kg' : 'lbs';
  return `${Math.round(value)} ${unit}`;
}