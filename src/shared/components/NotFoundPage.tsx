import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

/**
 * 404 Not Found page component
 * Provides helpful navigation options when users reach non-existent routes
 */
export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-8xl font-bold text-slate-200 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <Search className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/60 p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-slate-600 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, it happens to the best of us!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Go Back
            </button>
            
            <Link
              to="/dashboard"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium group"
            >
              <Home className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Dashboard
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                to="/dashboard"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/users"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Users
              </Link>
              <Link
                to="/settings"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-sm text-slate-500">
          <p>
            Still can't find what you're looking for?{' '}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
