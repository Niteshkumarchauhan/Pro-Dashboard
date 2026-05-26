// ============================================================
// localStorage.js — Utility functions for saving/loading data
// localStorage ek browser feature hai jo data ko permanently
// save karta hai, even after page refresh.
// ============================================================

/**
 * Save any value to localStorage as JSON string
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

/**
 * Load a value from localStorage and parse it
 * @param {string} key - Storage key
 * @param {*} defaultValue - Fallback if key doesn't exist
 * @returns Parsed value or defaultValue
 */
export const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return defaultValue;
  }
};
