/**
 * Routing types and interfaces
 */

export type RoutePermission = 'read' | 'write' | 'moderate' | 'admin';

export interface NavigationItem {
  name: string;
  path: string;
  icon: string;
  roles: string[];
}

export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  key: string;
  requiredRole?: 'admin' | 'moderator' | 'user';
  requiredPermission?: string;
}
