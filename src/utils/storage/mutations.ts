import { DailyEntry } from '../../types';
import { getEntries, saveEntries } from './core';
import { imageUrlToBase64 } from '../imageUtils';
import { isValidBase64Image } from '../validation';
import { addToHistory, archiveEntry } from './history';

async function saveEntry(entry: DailyEntry): Promise<void> {
  try {
    let imageUrl = entry.imageUrl;
    
    if (entry.imageUrl.startsWith('blob:')) {
      imageUrl = await imageUrlToBase64(entry.imageUrl);
    }
    
    if (!isValidBase64Image(imageUrl)) {
      throw new Error('Invalid image data');
    }
    
    const entries = getEntries();
    const newEntry = { ...entry, imageUrl };
    
    // Add to current entries
    entries.push(newEntry);
    saveEntries(entries);
    
    // Add to history
    addToHistory(newEntry);
  } catch (error) {
    console.error('Failed to save entry:', error);
    throw error;
  }
}

export function deleteEntry(id: string): void {
  try {
    const entries = getEntries();
    const entryToDelete = entries.find(entry => entry.id === id);
    
    if (entryToDelete) {
      // Archive the entry before removing it
      archiveEntry(entryToDelete);
      
      // Remove from current entries
      const filteredEntries = entries.filter(entry => entry.id !== id);
      saveEntries(filteredEntries);
    }
  } catch (error) {
    console.error('Failed to delete entry:', error);
    throw error;
  }
}

export function deleteAllEntries(): void {
  try {
    const entries = getEntries();
    
    // Archive all entries before clearing
    entries.forEach(entry => archiveEntry(entry));
    
    // Clear current entries
    saveEntries([]);
  } catch (error) {
    console.error('Failed to delete all entries:', error);
    throw error;
  }
}