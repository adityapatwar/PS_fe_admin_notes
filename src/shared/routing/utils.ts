/**
 * Routing utility functions
 */

import { routeConfig } from './routes';

/**
 * Check if a path is a public route
 */
export const isPublicRoute = (pathname: string): boolean => {
  const publicPaths = Object.values(routeConfig.public);
  return publicPaths.includes(pathname);
};

/**
 * Check if a path is a protected route
 */
export const isProtectedRoute = (pathname: string): boolean => {
  const protectedPaths = Object.values(routeConfig.protected);
  return protectedPaths.some(path => pathname.startsWith(path));
};

/**
 * Get the default redirect path for authenticated users
 */
export const getDefaultRedirectPath = (): string => {
  return routeConfig.protected.dashboard;
};

/**
 * Get the login path
 */
export const getLoginPath = (): string => {
  return routeConfig.public.login;
};

/**
 * Build a path with query parameters
 */
export const buildPath = (path: string, params?: Record<string, string>): string => {
  if (!params) return path;
  
  const searchParams = new URLSearchParams(params);
  return `${path}?${searchParams.toString()}`;
};
