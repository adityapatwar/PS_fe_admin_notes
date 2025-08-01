import React from 'react';
import { StatisticsWidget } from '../components/StatisticsWidget';
import { SystemHealthWidget } from '../components/SystemHealthWidget';
import { RecentActivitiesWidget } from '../components/RecentActivitiesWidget';
import { AnalyticsWidget } from '../components/AnalyticsWidget';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Enhanced header section */}
      <div className="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-2">
              Dashboard Admin
            </h1>
            <p className="text-slate-600 max-w-2xl">
              Selamat datang kembali! Berikut adalah ringkasan komprehensif performa aplikasi dan aktivitas pengguna Anda.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">Terakhir diperbarui</p>
              <p className="text-xs text-slate-500">{new Date().toLocaleTimeString('id-ID')}</p>
            </div>
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <StatisticsWidget />

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Analytics - spans 2 columns on xl screens */}
        <div className="xl:col-span-2">
          <AnalyticsWidget />
        </div>

        {/* System health - single column */}
        <div>
          <SystemHealthWidget />
        </div>
      </div>

      {/* Recent Activities */}
      <RecentActivitiesWidget />
    </div>
  );
};
