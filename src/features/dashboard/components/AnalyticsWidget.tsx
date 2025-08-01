import React, { useState } from 'react';
import { TrendingUp, Users, FileText, Calendar, BarChart3, PieChart, Activity, RefreshCw } from 'lucide-react';
import { useUserAnalytics, useNotesAnalytics } from '../hooks/useDashboardApi';

type AnalyticsType = 'users' | 'notes';
type TimePeriod = 7 | 30 | 90;

export const AnalyticsWidget: React.FC = () => {
  const [activeType, setActiveType] = useState<AnalyticsType>('users');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(30);

  const { data: userAnalytics, isLoading: userLoading, error: userError, refetch: refetchUsers } = useUserAnalytics({ days: timePeriod });
  const { data: notesAnalytics, isLoading: notesLoading, error: notesError, refetch: refetchNotes } = useNotesAnalytics({ days: timePeriod });

  const isLoading = activeType === 'users' ? userLoading : notesLoading;
  const error = activeType === 'users' ? userError : notesError;
  const data = activeType === 'users' ? userAnalytics : notesAnalytics;

  const handleRefresh = () => {
    if (activeType === 'users') {
      refetchUsers();
    } else {
      refetchNotes();
    }
  };

  // Error state
  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Analitik</h3>
              <p className="text-sm text-slate-600 mt-1">Wawasan mendalam dan tren data</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRefresh}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <BarChart3 className="h-5 w-5 text-indigo-500" />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="h-8 w-8 text-red-500" />
            </div>
            <h4 className="text-lg font-medium text-slate-800 mb-2">Gagal Memuat Analitik</h4>
            <p className="text-slate-600 mb-4">
              {(error as any)?.message || 'Tidak dapat mengambil data analitik. Silakan coba lagi nanti.'}
            </p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-indigo-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Analitik</h3>
            <p className="text-sm text-slate-600 mt-1">Wawasan mendalam dan tren data</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <BarChart3 className="h-5 w-5 text-indigo-500" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Type Toggle */}
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveType('users')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeType === 'users'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Pengguna</span>
            </button>
            <button
              onClick={() => setActiveType('notes')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeType === 'notes'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Catatan</span>
            </button>
          </div>
          
          {/* Time Period Toggle */}
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            {[7, 30, 90].map((days) => (
              <button
                key={days}
                onClick={() => setTimePeriod(days as TimePeriod)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  timePeriod === days
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {days}h
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-slate-100 rounded-lg p-4">
                  <div className="h-4 bg-slate-200 rounded w-20 mb-2"></div>
                  <div className="h-6 bg-slate-200 rounded w-16"></div>
                </div>
              ))}
            </div>
            <div className="h-64 bg-slate-100 rounded-lg"></div>
          </div>
        ) : (
          <>
            {activeType === 'users' && userAnalytics && (
              <div className="space-y-6">
                {/* User Analytics Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                          Registrasi
                        </p>
                        <p className="text-2xl font-bold text-blue-700 mt-1">
                          {userAnalytics.registrationTrends?.reduce((sum, trend) => sum + trend.count, 0) || 0}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-green-600 uppercase tracking-wide">
                          Admin
                        </p>
                        <p className="text-2xl font-bold text-green-700 mt-1">
                          {userAnalytics.demographics?.roleDistribution?.admin || 0}
                        </p>
                      </div>
                      <PieChart className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">
                          Harian
                        </p>
                        <p className="text-2xl font-bold text-purple-700 mt-1">
                          {userAnalytics.demographics?.activityPatterns?.daily || 0}
                        </p>
                      </div>
                      <Calendar className="h-8 w-8 text-purple-500" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-orange-600 uppercase tracking-wide">
                          Bulanan
                        </p>
                        <p className="text-2xl font-bold text-orange-700 mt-1">
                          {userAnalytics.demographics?.activityPatterns?.monthly || 0}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Registration Trends Chart */}
                {userAnalytics.registrationTrends && userAnalytics.registrationTrends.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-4">
                      Tren Registrasi Pengguna ({timePeriod} hari terakhir)
                    </h4>
                    <div className="h-32 flex items-end space-x-2">
                      {userAnalytics.registrationTrends.map((trend, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-blue-500 rounded-t"
                            style={{
                              height: `${Math.max((trend.count / Math.max(...userAnalytics.registrationTrends!.map(t => t.count))) * 80, 4)}px`,
                            }}
                          ></div>
                          <span className="text-xs text-slate-500 mt-2">
                            {new Date(trend.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeType === 'notes' && notesAnalytics && (
              <div className="space-y-6">
                {/* Notes Analytics Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                          Rata-rata Panjang
                        </p>
                        <p className="text-2xl font-bold text-emerald-700 mt-1">
                          {notesAnalytics.activityPatterns?.averageLength || 0}
                        </p>
                      </div>
                      <FileText className="h-8 w-8 text-emerald-500" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                          Jam Aktif
                        </p>
                        <p className="text-2xl font-bold text-amber-700 mt-1">
                          {notesAnalytics.activityPatterns?.mostActiveHours?.length || 0}
                        </p>
                      </div>
                      <Activity className="h-8 w-8 text-amber-500" />
                    </div>
                  </div>

                  {notesAnalytics.activityPatterns?.topCategories && (
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                            Kategori Populer
                          </p>
                          <p className="text-2xl font-bold text-indigo-700 mt-1">
                            {notesAnalytics.activityPatterns.topCategories.length}
                          </p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-indigo-500" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Creation Trends Chart */}
                {notesAnalytics.creationTrends && notesAnalytics.creationTrends.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-4">
                      Tren Pembuatan Catatan ({timePeriod} hari terakhir)
                    </h4>
                    <div className="h-32 flex items-end space-x-2">
                      {notesAnalytics.creationTrends.map((trend, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-emerald-500 rounded-t"
                            style={{
                              height: `${Math.max((trend.count / Math.max(...notesAnalytics.creationTrends!.map(t => t.count))) * 80, 4)}px`,
                            }}
                          ></div>
                          <span className="text-xs text-slate-500 mt-2">
                            {new Date(trend.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Most Active Hours */}
                {notesAnalytics.activityPatterns?.mostActiveHours && notesAnalytics.activityPatterns.mostActiveHours.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-4">
                      Jam Paling Aktif
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {notesAnalytics.activityPatterns.mostActiveHours.map((hour) => (
                        <span
                          key={hour}
                          className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium"
                        >
                          {hour}:00
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Categories */}
                {notesAnalytics.activityPatterns?.topCategories && notesAnalytics.activityPatterns.topCategories.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-4">
                      Kategori Teratas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {notesAnalytics.activityPatterns.topCategories.map((category, index) => (
                        <span
                          key={category}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            index === 0 ? 'bg-blue-100 text-blue-700' :
                            index === 1 ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state for notes */}
                {(!notesAnalytics.creationTrends || notesAnalytics.creationTrends.length === 0) && 
                 (!notesAnalytics.activityPatterns?.mostActiveHours || notesAnalytics.activityPatterns.mostActiveHours.length === 0) && (
                  <div className="bg-slate-50 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-slate-400" />
                    </div>
                    <h4 className="text-lg font-medium text-slate-600 mb-2">Belum Ada Data Catatan</h4>
                    <p className="text-slate-500">
                      Belum ada catatan yang dibuat. Data akan muncul setelah pengguna mulai membuat catatan.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
