import { useState, useEffect } from 'react';

/**
 * Custom hook for resilient localStorage synchronization
 * @param {string} key - localStorage key
 * @param {any} initialValue - Fallback value if storage is empty or invalid
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        const parsed = JSON.parse(item);
        if (Array.isArray(initialValue) ? Array.isArray(parsed) : parsed !== null) {
          return parsed;
        }
      }
      // If nothing saved or invalid shape, initialize with initialValue
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
