import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

/**
 * Modern responsive layout component with fixed sidebar
 * Features fixed sidebar that stays in place during scroll
 */
export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle responsive sidebar state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      {/* Main content area with proper margins and scroll */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
      }`}>
        {/* Fixed Header */}
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
