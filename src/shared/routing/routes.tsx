import React from 'react';
import { Navigate } from 'react-router-dom';

// Layout Components
import { Layout } from '../layout/Layout';
import { ProtectedRoute } from '../../features/auth/components/ProtectedRoute';

// Page Components
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { RegisterPage } from '../../features/auth/pages/RegisterPage';
import { DashboardPage } from '../../features/dashboard/pages/DashboardPage';
import { UsersPage } from '../../features/users/pages/UsersPage';
import { SettingsPage } from '../../features/settings/pages/SettingsPage';
import { NotFoundPage } from '../components/NotFoundPage';

/**
 * Route configuration object for better maintainability
 */
export const routeConfig = {
  // Public routes
  public: {
    login: '/login',
    register: '/register',
  },
  // Protected routes
  protected: {
    root: '/',
    dashboard: '/dashboard',
    users: '/users',
    settings: '/settings',
  },
  // Fallback
  notFound: '*',
} as const;

/**
 * Public route definitions (no authentication required)
 */
export const publicRoutes = [
  {
    path: routeConfig.public.login,
    element: <LoginPage />,
    key: 'login',
  },
  {
    path: routeConfig.public.register,
    element: <RegisterPage />,
    key: 'register',
  },
];

/**
 * Protected route definitions (authentication required)
 */
export const protectedRoutes = [
  {
    path: routeConfig.protected.dashboard,
    element: <DashboardPage />,
    key: 'dashboard',
  },
  {
    path: routeConfig.protected.users,
    element: <UsersPage />,
    key: 'users',
  },
  {
    path: routeConfig.protected.settings,
    element: <SettingsPage />,
    key: 'settings',
  },
];

/**
 * Layout wrapper for protected routes
 */
export const ProtectedLayout = () => (
  <ProtectedRoute>
    <Layout />
  </ProtectedRoute>
);

/**
 * Root redirect component
 */
export const RootRedirect = () => (
  <Navigate to={routeConfig.protected.dashboard} replace />
);

/**
 * 404 Not Found route
 */
export const notFoundRoute = {
  path: routeConfig.notFound,
  element: <NotFoundPage />,
  key: 'notFound',
};

/**
 * Route permissions configuration
 * Can be extended for role-based access control
 */
export const routePermissions = {
  [routeConfig.protected.dashboard]: ['user', 'moderator', 'admin'],
  [routeConfig.protected.users]: ['user', 'moderator', 'admin'], // Currently accessible to all authenticated users
  [routeConfig.protected.settings]: ['user', 'moderator', 'admin'],
} as const;

/**
 * Navigation menu configuration
 * Used by sidebar and other navigation components
 */
export const navigationConfig = [
  {
    name: 'Dashboard',
    path: routeConfig.protected.dashboard,
    icon: 'dashboard',
    roles: ['user', 'moderator', 'admin'],
  },
  {
    name: 'Users',
    path: routeConfig.protected.users,
    icon: 'users',
    roles: ['user', 'moderator', 'admin'],
  },
  {
    name: 'Settings',
    path: routeConfig.protected.settings,
    icon: 'settings',
    roles: ['user', 'moderator', 'admin'],
  },
] as const;
