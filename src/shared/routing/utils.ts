import { routeConfig, routePermissions } from './routes';
import type { UserRole } from './types';

/**
 * Utility functions for routing operations
 */

/**
 * Check if a route requires authentication
 */
export const isProtectedRoute = (pathname: string): boolean => {
  const protectedPaths = Object.values(routeConfig.protected);
  return protectedPaths.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  );
};

/**
 * Check if a route is public (no authentication required)
 */
export const isPublicRoute = (pathname: string): boolean => {
  const publicPaths = Object.values(routeConfig.public);
  return publicPaths.includes(pathname);
};

/**
 * Check if user has permission to access a route
 */
export const hasRoutePermission = (
  pathname: string, 
  userRole?: UserRole
): boolean => {
  if (!userRole) return false;
  
  const permissions = routePermissions[pathname];
  if (!permissions) return true; // No specific permissions required
  
  return permissions.includes(userRole);
};

/**
 * Get the default route for a user role
 */
export const getDefaultRoute = (userRole?: UserRole): string => {
  // All authenticated users default to dashboard
  return routeConfig.protected.dashboard;
};

/**
 * Get breadcrumb trail for a given pathname
 */
export const getBreadcrumbs = (pathname: string): Array<{ name: string; path: string }> => {
  const breadcrumbs: Array<{ name: string; path: string }> = [];
  
  // Add home/dashboard as first breadcrumb for protected routes
  if (isProtectedRoute(pathname)) {
    breadcrumbs.push({
      name: 'Dashboard',
      path: routeConfig.protected.dashboard,
    });
  }
  
  // Add current page breadcrumb
  switch (pathname) {
    case routeConfig.protected.users:
      breadcrumbs.push({ name: 'Users', path: pathname });
      break;
    case routeConfig.protected.settings:
      breadcrumbs.push({ name: 'Settings', path: pathname });
      break;
    default:
      // For dashboard or unknown routes, don't add additional breadcrumbs
      break;
  }
  
  return breadcrumbs;
};

/**
 * Generate navigation URL with query parameters
 */
export const generateRouteUrl = (
  path: string, 
  params?: Record<string, string | number>
): string => {
  if (!params) return path;
  
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });
  
  return `${path}?${searchParams.toString()}`;
};

/**
 * Extract route parameters from pathname
 */
export const extractRouteParams = (
  pathname: string,
  template: string
): Record<string, string> => {
  const params: Record<string, string> = {};
  const templateParts = template.split('/');
  const pathnameParts = pathname.split('/');
  
  templateParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      const paramName = part.slice(1);
      params[paramName] = pathnameParts[index] || '';
    }
  });
  
  return params;
};
