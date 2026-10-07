/**
 * Authentication service
 */

import { API_BASE_URL, HTTP_STATUS } from '../constants';
import { getAuthToken, setAuthToken, removeAuthToken } from './storage';

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterData
 * @property {string} email
 * @property {string} password
 * @property {string} [name]
 */

/**
 * @typedef {Object} AuthResponse
 * @property {boolean} success
 * @property {string} [message]
 * @property {Object} [data]
 * @property {string} [data.token]
 * @property {Object} [data.user]
 */

/**
 * Login user
 * @param {LoginCredentials} credentials
 * @returns {Promise<AuthResponse>}
 */
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Login failed',
        statusCode: response.status,
      };
    }

    if (data.data?.token) {
      setAuthToken(data.data.token);
    }

    return {
      success: true,
      message: data.message || 'Login successful',
      data: data.data,
      statusCode: response.status,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message || 'Network error occurred',
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
};

/**
 * Register user
 * @param {RegisterData} registerData
 * @returns {Promise<AuthResponse>}
 */
export const register = async (registerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Registration failed',
        statusCode: response.status,
      };
    }

    if (data.data?.token) {
      setAuthToken(data.data.token);
    }

    return {
      success: true,
      message: data.message || 'Registration successful',
      data: data.data,
      statusCode: response.status,
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: error.message || 'Network error occurred',
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
};

/**
 * Logout user
 */
export const logout = () => {
  removeAuthToken();
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Get current auth token
 * @returns {string | null}
 */
export const getToken = () => {
  return getAuthToken();
};

/**
 * Refresh auth token
 * @returns {Promise<AuthResponse>}
 */
export const refreshToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      removeAuthToken();
      return {
        success: false,
        message: data.message || 'Token refresh failed',
        statusCode: response.status,
      };
    }

    if (data.data?.token) {
      setAuthToken(data.data.token);
    }

    return {
      success: true,
      message: data.message || 'Token refreshed successfully',
      data: data.data,
      statusCode: response.status,
    };
  } catch (error) {
    console.error('Token refresh error:', error);
    removeAuthToken();
    return {
      success: false,
      message: error.message || 'Network error occurred',
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
};