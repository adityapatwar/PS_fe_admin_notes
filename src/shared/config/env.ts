/**
 * Environment configuration
 * Centralized access to environment variables
 */

export const env = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  // Application
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'PS Admin Portal',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Features
  ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  // Computed values
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

/**
 * Validate required environment variables
 */
export const validateEnv = (): void => {
  const required = ['VITE_API_BASE_URL'];
  
  for (const key of required) {
    if (!import.meta.env[key]) {
      console.warn(`Missing required environment variable: ${key}`);
    }
  }
};

// Validate on module load in development
if (env.isDevelopment) {
  validateEnv();
}
