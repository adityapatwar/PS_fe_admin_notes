import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Context Providers
import { AuthProvider } from './features/auth/contexts/AuthContext';

// Components
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import { AppRouter } from './shared/routing';

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
 * Routing logic has been moved to shared/routing for better accessibility
 */
function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <AppRouter />
          </Router>
        </AuthProvider>
        
        {/* React Query DevTools (development only) */}
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
