import { createContext, useContext, useEffect, useState } from 'react';
import { isAuthenticated, getToken, login as authLogin, register as authRegister, logout as authLogout, refreshToken } from '../services/auth';
import { HTTP_STATUS } from '../constants';

/**
 * @typedef {Object} AuthContextType
 * @property {boolean} isAuthenticated - Whether user is authenticated
 * @property {Object|null} user - User data
 * @property {string|null} token - Auth token
 * @property {boolean} isLoading - Loading state
 * @property {Error|null} error - Error state
 * @property {(credentials: {email: string, password: string}) => Promise<{success: boolean, message?: string}>} login - Login function
 * @property {(registerData: {email: string, password: string, name?: string}) => Promise<{success: boolean, message?: string}>} register - Register function
 * @property {() => void} logout - Logout function
 * @property {() => Promise<void>} checkAuth - Check auth status
 */

/** @type {React.Context<AuthContextType | null>} */
const AuthContext = createContext(null);

/**
 * AuthProvider component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = getToken();
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        return;
      }

      const response = await refreshToken();
      if (response.success && response.data?.token) {
        setIsAuthenticated(true);
        setToken(response.data.token);
        setUser(response.data.user || null);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setError(err);
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authLogin(credentials);

      if (response.success && response.data?.token) {
        setIsAuthenticated(true);
        setToken(response.data.token);
        setUser(response.data.user || null);
        return { success: true, message: response.message };
      } else {
        setError(new Error(response.message || 'Login failed'));
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err);
      return { success: false, message: err.message || 'Network error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (registerData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authRegister(registerData);

      if (response.success && response.data?.token) {
        setIsAuthenticated(true);
        setToken(response.data.token);
        setUser(response.data.user || null);
        return { success: true, message: response.message };
      } else {
        setError(new Error(response.message || 'Registration failed'));
        return { success: false, message: response.message || 'Registration failed' };
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err);
      return { success: false, message: err.message || 'Network error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authLogout();
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, isLoading, error, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 * @returns {AuthContextType}
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};