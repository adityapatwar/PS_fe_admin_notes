import React from 'react';
import { Navigate } from 'react-router-dom';

// Layout Components
import { Layout } from '../layout/Layout';
import { ProtectedRoute } from './ProtectedRoute';

// Page Components
import { LoginPage } from '../../features/auth/pages/LoginPage';
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
  },
  // Protected routes (using relative paths for nested routing)
  protected: {
    root: '/',
    dashboard: 'dashboard', // Relative path for nested route
    users: 'users',         // Relative path for nested route
    settings: 'settings',   // Relative path for nested route
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
];

/**
 * Protected route definitions (authentication required)
 * Using relative paths for proper nested routing
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
  <Navigate to="/dashboard" replace />
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
 * Using absolute paths for permission checking
 */
export const routePermissions = {
  '/dashboard': ['user', 'moderator', 'admin'],
  '/users': ['moderator', 'admin'], // Restricted to moderator and admin
  '/settings': ['admin'], // Admin only
} as const;

/**
 * Navigation menu configuration
 * Used by sidebar and other navigation components
 * Using absolute paths for navigation
 */
export const navigationConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard',
    roles: ['user', 'moderator', 'admin'],
  },
  {
    name: 'Users',
    path: '/users',
    icon: 'users',
    roles: ['moderator', 'admin'],
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: 'settings',
    roles: ['admin'],
  },
] as const;
