import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook for handling authentication persistence
 * This is now optional since AuthProvider handles initialization internally
 */
export const useAuthPersistence = () => {
  const { user, isLoading } = useAuth();

  // This hook is now mainly for external components that want to know
  // when auth initialization is complete
  useEffect(() => {
    if (!isLoading) {
      console.log('Authentication initialized:', user ? 'User logged in' : 'No user');
    }
  }, [isLoading, user]);

  return {
    isInitialized: !isLoading,
    user,
  };
};
