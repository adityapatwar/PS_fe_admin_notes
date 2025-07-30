import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMinimize = () => {
    setSidebarMinimized(!sidebarMinimized);
    // Close mobile sidebar when minimizing on desktop
    if (window.innerWidth >= 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Fixed sidebar with proper positioning */}
      <Sidebar 
        isOpen={sidebarOpen} 
        isMinimized={sidebarMinimized}
        onToggle={toggleSidebar}
        onMinimize={toggleMinimize}
      />
      
      {/* Main content area with dynamic left margin based on sidebar state */}
      <div 
        className={`
          transition-all duration-300 ease-in-out
          ${sidebarMinimized 
            ? 'lg:ml-20' // Minimized sidebar width (80px)
            : 'lg:ml-72' // Full sidebar width (288px)
          }
        `}
      >
        {/* Header with proper z-index and positioning */}
        <Header 
          onMenuClick={toggleSidebar}
          onMinimizeClick={toggleMinimize}
          sidebarMinimized={sidebarMinimized}
        />
        
        {/* Main content with proper spacing */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
