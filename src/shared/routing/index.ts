/**
 * Routing module exports
 * Provides centralized access to all routing-related functionality
 */

// Main router component
export { AppRouter } from './AppRouter';

// Route configurations
export { 
  routeConfig, 
  publicRoutes, 
  protectedRoutes, 
  routePermissions,
  navigationConfig,
  ProtectedLayout,
  RootRedirect,
  notFoundRoute
} from './routes';

// Route utilities
export * from './utils';

// Types
export type { RoutePermission, NavigationItem } from './types';
