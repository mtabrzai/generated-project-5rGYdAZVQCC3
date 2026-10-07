/**
 * Client-side storage utilities
 */

import { LOCAL_STORAGE_KEYS } from '../constants';

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @returns {string | null} Stored value or null if not found
 */
export const getLocalStorageItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {string} value - Value to store
 */
export const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeLocalStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Get theme preference from localStorage
 * @returns {'light' | 'dark' | null} Theme preference or null if not set
 */
export const getTheme = () => {
  const theme = getLocalStorageItem(LOCAL_STORAGE_KEYS.THEME);
  return theme === 'light' || theme === 'dark' ? theme : null;
};

/**
 * Set theme preference in localStorage
 * @param {'light' | 'dark'} theme - Theme to set
 */
export const setTheme = (theme) => {
  if (theme !== 'light' && theme !== 'dark') {
    console.warn('Invalid theme value:', theme);
    return;
  }
  setLocalStorageItem(LOCAL_STORAGE_KEYS.THEME, theme);
};

/**
 * Get auth token from localStorage
 * @returns {string | null} Auth token or null if not found
 */
export const getAuthToken = () => {
  return getLocalStorageItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Set auth token in localStorage
 * @param {string} token - Auth token to store
 */
export const setAuthToken = (token) => {
  setLocalStorageItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
};

/**
 * Remove auth token from localStorage
 */
export const removeAuthToken = () => {
  removeLocalStorageItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
};