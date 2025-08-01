import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  publicRoutes, 
  protectedRoutes, 
  ProtectedLayout, 
  RootRedirect, 
  notFoundRoute 
} from './routes';

/**
 * Main application router component
 * Centralizes all routing logic for better maintainability
 */
export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes - No authentication required */}
      {publicRoutes.map((route) => (
        <Route 
          key={route.key}
          path={route.path} 
          element={route.element} 
        />
      ))}
      
      {/* Protected Routes with Layout */}
      <Route
        path="/"
        element={<ProtectedLayout />}
      >
        {/* Root redirect to dashboard */}
        <Route index element={<RootRedirect />} />
        
        {/* Protected application routes */}
        {protectedRoutes.map((route) => (
          <Route 
            key={route.key}
            path={route.path} 
            element={route.element} 
          />
        ))}
      </Route>
      
      {/* 404 Not Found - Must be last */}
      <Route 
        path={notFoundRoute.path} 
        element={notFoundRoute.element} 
      />
    </Routes>
  );
};
