/**
 * Routing module exports
 * Provides centralized access to all routing-related functionality
 */

// Main router component
export { AppRouter } from './AppRouter';

// Protected route component
export { ProtectedRoute } from './ProtectedRoute';

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

// Route utilities (if they exist)
export * from './utils';

// Types (if they exist)
export type { RoutePermission, NavigationItem } from './types';
