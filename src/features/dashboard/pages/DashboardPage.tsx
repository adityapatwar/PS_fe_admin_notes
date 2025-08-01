import React from 'react';
import { StatisticsWidget } from '../components/StatisticsWidget';
import { SystemHealthWidget } from '../components/SystemHealthWidget';
import { RecentActivitiesWidget } from '../components/RecentActivitiesWidget';
import { AnalyticsWidget } from '../components/AnalyticsWidget';
import { Sparkles, TrendingUp } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Modern welcome header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-white via-blue-50/50 to-indigo-50/30 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-slate-200/60 shadow-sm">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-100/40 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-blue-500" />
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Dashboard Admin
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Selamat Datang Kembali!
              </h1>
              
              <p className="text-slate-600 max-w-2xl leading-relaxed">
                Pantau performa aplikasi dan aktivitas pengguna dengan dashboard yang komprehensif. 
                Semua data terbaru tersedia dalam satu tampilan yang mudah dipahami.
              </p>
            </div>
            
            <div className="mt-6 lg:mt-0 flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>Live Update</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date().toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <StatisticsWidget />

      {/* Main content grid - improved spacing */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Analytics - spans 2 columns on xl screens */}
        <div className="xl:col-span-2 space-y-6">
          <AnalyticsWidget />
        </div>

        {/* System health - single column */}
        <div className="space-y-6">
          <SystemHealthWidget />
        </div>
      </div>

      {/* Recent Activities */}
      <RecentActivitiesWidget />
    </div>
  );
};
