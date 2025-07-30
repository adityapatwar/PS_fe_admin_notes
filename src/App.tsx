import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Context Providers
import { AuthProvider } from './features/auth/contexts/AuthContext';

// Components
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { Layout } from './shared/layout/Layout';
import { NotFoundPage } from './shared/components/NotFoundPage';

// Pages
import { LoginPage } from './features/auth/pages/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { UsersPage } from './features/users/pages/UsersPage';
import { SettingsPage } from './features/settings/pages/SettingsPage';

// Create React Query client with v4 configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * Main App component with comprehensive routing and error handling
 */
function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes with Layout */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                {/* Redirect root to dashboard */}
                <Route index element={<Navigate to="/dashboard" replace />} />
                
                {/* Dashboard - accessible to all authenticated users */}
                <Route path="dashboard" element={<DashboardPage />} />
                
                {/* User Management - accessible to all authenticated users for now */}
                <Route path="users" element={<UsersPage />} />
                
                {/* Settings - accessible to all authenticated users */}
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </AuthProvider>
        
        {/* React Query DevTools (development only) */}
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
