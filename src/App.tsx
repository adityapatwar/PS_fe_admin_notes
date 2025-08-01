import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Context Providers
import { AuthProvider } from './features/auth/contexts/AuthContext';

// Route Components
import { 
  publicRoutes, 
  protectedRoutes, 
  ProtectedLayout, 
  RootRedirect, 
  notFoundRoute 
} from './shared/routing/routes';

// Global Components
import { ErrorBoundary } from './shared/components/ErrorBoundary';

// Styles
import './index.css';

/**
 * React Query client configuration
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * Main App component
 * Admin dashboard application without register functionality
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                {/* Public routes (login only for admin) */}
                {publicRoutes.map((route) => (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={route.element}
                  />
                ))}

                {/* Protected routes with layout */}
                <Route path="/" element={<ProtectedLayout />}>
                  {/* Root redirect to dashboard */}
                  <Route index element={<RootRedirect />} />
                  
                  {/* Protected application routes with relative paths */}
                  {protectedRoutes.map((route) => (
                    <Route
                      key={route.key}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Route>

                {/* 404 Not Found */}
                <Route
                  path={notFoundRoute.path}
                  element={notFoundRoute.element}
                />
              </Routes>
            </div>
          </Router>
        </AuthProvider>

        {/* React Query Devtools (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
