/**
 * Routing-related type definitions
 */

export type UserRole = 'user' | 'moderator' | 'admin';

export type RoutePermission = {
  [key: string]: UserRole[];
};

export interface NavigationItem {
  name: string;
  path: string;
  icon: string;
  roles: UserRole[];
  children?: NavigationItem[];
}

export interface RouteDefinition {
  path: string;
  element: React.ReactElement;
  key: string;
  roles?: UserRole[];
  exact?: boolean;
}

export interface RouteConfig {
  public: {
    login: string;
    register: string;
  };
  protected: {
    root: string;
    dashboard: string;
    users: string;
    settings: string;
  };
  notFound: string;
}
