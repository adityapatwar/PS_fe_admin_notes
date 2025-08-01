import React from 'react';
import { Users, FileText, UserCheck, UserPlus, Calendar, TrendingUp, Activity } from 'lucide-react';
import { useDashboardStatistics } from '../hooks/useDashboardApi';
import { StatCard } from './StatCard';

export const StatisticsWidget: React.FC = () => {
  const { data: statistics, isLoading, error } = useDashboardStatistics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-64"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                    <div className="h-8 bg-slate-200 rounded w-20"></div>
                    <div className="h-3 bg-slate-200 rounded w-32"></div>
                  </div>
                  <div className="h-12 w-12 bg-slate-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-red-100 rounded-xl flex items-center justify-center">
            <Activity className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-red-800">Gagal memuat statistik</h3>
            <p className="text-xs text-red-600 mt-1">Silakan refresh halaman atau coba lagi nanti</p>
          </div>
        </div>
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  const stats = [
    {
      title: 'Total Pengguna',
      value: statistics.totalUsers.toLocaleString(),
      icon: <Users className="h-6 w-6 text-white" />,
      change: statistics.newUsers > 0 ? `+${statistics.newUsers}` : '0',
      changeType: statistics.newUsers > 0 ? 'positive' as const : 'neutral' as const,
      description: 'pengguna terdaftar',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Catatan',
      value: statistics.totalNotes.toLocaleString(),
      icon: <FileText className="h-6 w-6 text-white" />,
      change: statistics.notesToday > 0 ? `+${statistics.notesToday}` : '0',
      changeType: statistics.notesToday > 0 ? 'positive' as const : 'neutral' as const,
      description: 'dokumen dibuat',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Pengguna Aktif',
      value: statistics.activeUsers.toLocaleString(),
      icon: <UserCheck className="h-6 w-6 text-white" />,
      description: '24 jam terakhir',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Pengguna Baru',
      value: statistics.newUsers.toLocaleString(),
      icon: <UserPlus className="h-6 w-6 text-white" />,
      change: statistics.newUsers > 0 ? '+100%' : '0%',
      changeType: statistics.newUsers > 0 ? 'positive' as const : 'neutral' as const,
      description: 'registrasi baru',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Catatan Hari Ini',
      value: statistics.notesToday.toLocaleString(),
      icon: <Calendar className="h-6 w-6 text-white" />,
      description: 'dibuat hari ini',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Rata-rata Catatan',
      value: statistics.averageNotesPerUser.toFixed(1),
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      description: 'per pengguna',
      gradient: 'from-pink-500 to-pink-600'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Ringkasan Statistik</h2>
          <p className="text-sm text-slate-600 mt-1">
            Gambaran umum aktivitas dan performa aplikasi
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-xs text-slate-500">
            Diperbarui: {new Date().toLocaleTimeString('id-ID')}
          </div>
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={`stat-${index}`} {...stat} />
        ))}
      </div>
    </div>
  );
};
