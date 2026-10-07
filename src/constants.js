/**
 * Application-wide constants
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const ENABLE_MOCK_DATA = import.meta.env.VITE_ENABLE_MOCK_DATA === 'true';
export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
export const GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
export const APP_TITLE = import.meta.env.VITE_APP_TITLE;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const LOCAL_STORAGE_KEYS = {
  THEME: 'app_theme',
  AUTH_TOKEN: 'auth_token',
};

export const QUERY_KEYS = {
  EXAMPLE_DATA: 'exampleData',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
};