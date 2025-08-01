import React from 'react';
import { Activity, User, FileText, LogIn, UserPlus, Edit, Trash2, Shield, Clock, Globe } from 'lucide-react';
import { useRecentActivities } from '../hooks/useDashboardApi';

export const RecentActivitiesWidget: React.FC = () => {
  const { data: activitiesData, isLoading, error } = useRecentActivities({ limit: 10 });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_login':
        return <LogIn className="h-4 w-4" />;
      case 'user_registration':
        return <UserPlus className="h-4 w-4" />;
      case 'note_created':
        return <FileText className="h-4 w-4" />;
      case 'note_updated':
        return <Edit className="h-4 w-4" />;
      case 'note_deleted':
        return <Trash2 className="h-4 w-4" />;
      case 'admin_action':
        return <Shield className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user_login':
        return 'blue';
      case 'user_registration':
        return 'green';
      case 'note_created':
        return 'emerald';
      case 'note_updated':
        return 'amber';
      case 'note_deleted':
        return 'red';
      case 'admin_action':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const getActivityTitle = (type: string) => {
    switch (type) {
      case 'user_login':
        return 'Login Pengguna';
      case 'user_registration':
        return 'Registrasi Baru';
      case 'note_created':
        return 'Catatan Dibuat';
      case 'note_updated':
        return 'Catatan Diperbarui';
      case 'note_deleted':
        return 'Catatan Dihapus';
      case 'admin_action':
        return 'Aksi Admin';
      default:
        return 'Aktivitas';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'Baru saja';
      if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam yang lalu`;
      
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return timestamp;
    }
  };

  const getUserAgent = (userAgent?: string) => {
    if (!userAgent) return 'Unknown Browser';
    
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    
    return 'Unknown Browser';
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-purple-50">
          <div className="animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-56"></div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-center space-x-4 p-4 rounded-xl bg-slate-50/50">
              <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-32"></div>
                <div className="h-3 bg-slate-200 rounded w-48"></div>
              </div>
              <div className="h-3 bg-slate-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-red-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Aktivitas Terkini</h3>
              <p className="text-sm text-slate-600 mt-1">Error memuat aktivitas</p>
            </div>
            <Activity className="h-5 w-5 text-red-500" />
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-4">
            <Activity className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-600">Gagal memuat aktivitas terkini</p>
          </div>
        </div>
      </div>
    );
  }

  if (!activitiesData || !activitiesData.activities || activitiesData.activities.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Aktivitas Terkini</h3>
              <p className="text-sm text-slate-600 mt-1">Log aktivitas pengguna real-time</p>
            </div>
            <Activity className="h-5 w-5 text-purple-500" />
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="h-8 w-8 text-slate-400" />
            </div>
            <h4 className="text-lg font-medium text-slate-600 mb-2">Belum Ada Aktivitas</h4>
            <p className="text-slate-500">
              Aktivitas pengguna akan muncul di sini setelah ada interaksi dengan sistem.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Aktivitas Terkini</h3>
            <p className="text-sm text-slate-600 mt-1">Log aktivitas pengguna real-time</p>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-purple-500" />
            <span className="text-xs text-slate-500">
              {activitiesData.pagination.total} total
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activitiesData.activities.map((activity) => {
            const color = getActivityColor(activity.type);
            
            return (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-all duration-200 border border-transparent hover:border-slate-200/60"
              >
                {/* Activity Icon */}
                <div className={`h-10 w-10 bg-${color}-100 rounded-full flex items-center justify-center`}>
                  <div className={`text-${color}-600`}>
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                
                {/* Activity Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-slate-800">
                      {getActivityTitle(activity.type)}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium bg-${color}-100 text-${color}-700 rounded-full`}>
                      {activity.type.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-slate-600">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{activity.userEmail}</span>
                    </div>
                    
                    {activity.details?.ip && (
                      <div className="flex items-center space-x-1">
                        <Globe className="h-3 w-3" />
                        <span>{activity.details.ip}</span>
                      </div>
                    )}
                    
                    {activity.details?.userAgent && (
                      <div className="flex items-center space-x-1">
                        <span>{getUserAgent(activity.details.userAgent)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Timestamp */}
                <div className="flex items-center space-x-1 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimestamp(activity.timestamp)}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Pagination Info */}
        {activitiesData.pagination.total > activitiesData.activities.length && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Menampilkan {activitiesData.activities.length} dari {activitiesData.pagination.total} aktivitas
            </p>
            {activitiesData.pagination.hasNext && (
              <button className="mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                Muat Lebih Banyak
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
