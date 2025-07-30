import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Loading spinner component with different sizes
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <Loader2 
      className={`animate-spin ${sizeClasses[size]} ${className}`} 
    />
  );
};

interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

/**
 * Full-screen loading overlay component
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = 'Loading...', 
  className = '' 
}) => {
  return (
    <div className={`fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}>
      <div className="text-center">
        <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <LoadingSpinner size="lg" className="text-blue-600" />
        </div>
        <p className="text-slate-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

interface LoadingCardProps {
  message?: string;
  className?: string;
}

/**
 * Loading card component for inline loading states
 */
export const LoadingCard: React.FC<LoadingCardProps> = ({ 
  message = 'Loading...', 
  className = '' 
}) => {
  return (
    <div className={`bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 shadow-sm text-center ${className}`}>
      <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
        <LoadingSpinner size="md" className="text-blue-600" />
      </div>
      <p className="text-slate-600 font-medium">{message}</p>
    </div>
  );
};
