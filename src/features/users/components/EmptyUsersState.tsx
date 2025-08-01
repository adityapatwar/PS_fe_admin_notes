import React from 'react';
import { Users, UserPlus, Database, Search, Sparkles, TrendingUp } from 'lucide-react';

interface EmptyUsersStateProps {
  onCreateUser: () => void;
}

/**
 * Empty state component matching dashboard theme
 */
export const EmptyUsersState: React.FC<EmptyUsersStateProps> = ({ onCreateUser }) => {
  return (
    <div className="space-y-6">
      {/* Statistics Cards with zero values - matching dashboard theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100/50 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <div className="space-y-1">
                  <p className="text-2xl lg:text-3xl font-bold text-slate-800">0</p>
                  <p className="text-xs text-slate-500">Total pengguna terdaftar</p>
                </div>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100/50 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <p className="text-sm font-medium text-slate-600">Active Users</p>
                <div className="space-y-1">
                  <p className="text-2xl lg:text-3xl font-bold text-slate-800">0</p>
                  <p className="text-xs text-slate-500">Pengguna aktif</p>
                </div>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100/50 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <p className="text-sm font-medium text-slate-600">Admins</p>
                <div className="space-y-1">
                  <p className="text-2xl lg:text-3xl font-bold text-slate-800">0</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100/50 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <p className="text-sm font-medium text-slate-600">Total Notes</p>
                <div className="space-y-1">
                  <p className="text-2xl lg:text-3xl font-bold text-slate-800">0</p>
                  <p className="text-xs text-slate-500">Catatan tersimpan</p>
                </div>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty state content - matching dashboard theme */}
      <div className="relative overflow-hidden bg-gradient-to-r from-white via-blue-50/50 to-indigo-50/30 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-200/60 shadow-sm">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-100/40 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* Icon */}
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-6">
            <Users className="h-12 w-12 text-blue-600" />
          </div>

          {/* Badge */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Mulai Sekarang
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Belum Ada Pengguna
          </h3>

          {/* Description */}
          <p className="text-slate-600 mb-8 leading-relaxed text-lg">
            Sistem belum memiliki pengguna yang terdaftar. Mulai dengan menambahkan pengguna pertama untuk menggunakan fitur manajemen user yang lengkap.
          </p>

          {/* Action Button */}
          <button
            onClick={onCreateUser}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5"
          >
            <UserPlus className="h-6 w-6 mr-3" />
            Tambah Pengguna Pertama
          </button>

          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-slate-500">
            <div className="flex flex-col items-center space-y-2">
              <div className="h-10 w-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <span>Data tersimpan aman</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-10 w-10 bg-green-100 rounded-2xl flex items-center justify-center">
                <Search className="h-5 w-5 text-green-600" />
              </div>
              <span>Mudah dicari & dikelola</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-10 w-10 bg-purple-100 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <span>Analitik real-time</span>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-6 bg-blue-50/80 rounded-2xl border border-blue-200/60">
            <p className="text-sm text-blue-700 leading-relaxed">
              <strong>Tips:</strong> Setelah menambah pengguna, Anda dapat mengelola peran, mengubah status, melihat aktivitas, dan menganalisis statistik pengguna dari dashboard yang terintegrasi ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
