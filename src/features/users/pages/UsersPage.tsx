import React, { useState } from 'react';
import { Plus, Users, UserCheck, UserX, Crown, Shield, FileText, Search, Filter, UserPlus, Sparkles, TrendingUp } from 'lucide-react';
import { UserTable } from '../components/UserTable';
import { UserModal } from '../components/UserModal';
import { UserNotesModal } from '../components/UserNotesModal';
import { EmptyUsersState } from '../components/EmptyUsersState';
import { UserStatCard } from '../components/UserStatCard';
import { useUsersWithStats, useUserStats } from '../hooks/useUsers';
import { User } from '../types';

/**
 * Enhanced Users page with dashboard theme consistency
 */
export const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Fetch users with stats and pagination
  const { 
    data: usersData, 
    isLoading: isUsersLoading, 
    error: usersError 
  } = useUsersWithStats({ 
    page: currentPage, 
    limit: 15 
  });

  // Fetch user statistics
  const { 
    data: stats, 
    isLoading: isStatsLoading,
    error: statsError
  } = useUserStats();

  const users = usersData?.users || [];
  const pagination = usersData?.pagination;

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleViewNotes = (user: User) => {
    setSelectedUser(user);
    setIsNotesModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseNotesModal = () => {
    setIsNotesModalOpen(false);
    setSelectedUser(null);
  };

  // Filter users based on search and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (!pagination || pagination.total <= pagination.limit) return null;

    const totalPages = Math.ceil(pagination.total / pagination.limit);
    const pages = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage -2 && i <= currentPage + 2)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/60">
        <div className="text-sm text-slate-600">
          Menampilkan {((currentPage - 1) * pagination.limit) + 1} hingga {Math.min(currentPage * pagination.limit, pagination.total)} dari {pagination.total} pengguna
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-slate-600 bg-white/80 border border-slate-300/60 rounded-xl hover:bg-slate-50/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Sebelumnya
          </button>
          
          {pages.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                page === currentPage
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : page === '...'
                  ? 'text-slate-400 cursor-default'
                  : 'text-slate-600 bg-white/80 border border-slate-300/60 hover:bg-slate-50/80'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-slate-600 bg-white/80 border border-slate-300/60 rounded-xl hover:bg-slate-50/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    );
  };

  // Check if we have a real error (not 404/empty state)
  const hasRealError = usersError && !(usersError as any)?.status === 404 && !(usersError as any)?.code === 404;

  // Show real errors (not 404)
  if (hasRealError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center mb-6">
            <UserX className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Terjadi Kesalahan</h3>
          <p className="text-slate-600 mb-6">{(usersError as any)?.message || 'Silakan coba lagi nanti'}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  // Check if we should show empty state
  const shouldShowEmptyState = !isUsersLoading && users.length === 0 && !hasRealError;

  return (
    <div className="space-y-6">
      {/* Modern welcome header - matching dashboard theme */}
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
                  User Management
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Manajemen Pengguna
              </h1>
              
              <p className="text-slate-600 max-w-2xl leading-relaxed">
                Kelola pengguna, peran, dan izin akses dengan mudah. 
                Pantau aktivitas dan statistik pengguna dalam satu dashboard yang terintegrasi.
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
          
          {/* Action button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCreateUser}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Plus className="h-5 w-5 mr-2" />
              Tambah User
            </button>
          </div>
        </div>
      </div>

      {/* Show empty state if no users */}
      {shouldShowEmptyState ? (
        <EmptyUsersState onCreateUser={handleCreateUser} />
      ) : (
        <>
          {/* Statistics Cards - matching dashboard theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <UserStatCard
              title="Total Users"
              value={isStatsLoading ? '...' : (stats?.totalUsers || 0).toString()}
              icon={<Users className="h-6 w-6 text-white" />}
              change={stats?.totalUsers ? '+12%' : undefined}
              changeType="positive"
              description="Total pengguna terdaftar"
              gradient="from-blue-500 to-blue-600"
            />

            <UserStatCard
              title="Active Users"
              value={isStatsLoading ? '...' : (stats?.activeUsers || 0).toString()}
              icon={<UserCheck className="h-6 w-6 text-white" />}
              change={stats?.activeUsers ? '+8%' : undefined}
              changeType="positive"
              description="Pengguna aktif"
              gradient="from-green-500 to-green-600"
            />

            <UserStatCard
              title="Admins"
              value={isStatsLoading ? '...' : (stats?.adminUsers || 0).toString()}
              icon={<Crown className="h-6 w-6 text-white" />}
              change={stats?.adminUsers ? '+2' : undefined}
              changeType="neutral"
              description="Administrator"
              gradient="from-yellow-500 to-yellow-600"
            />

            <UserStatCard
              title="Total Notes"
              value={isStatsLoading ? '...' : (stats?.totalNotes || 0).toString()}
              icon={<FileText className="h-6 w-6 text-white" />}
              change={stats?.totalNotes ? '+24%' : undefined}
              changeType="positive"
              description="Catatan tersimpan"
              gradient="from-purple-500 to-purple-600"
            />
          </div>

          {/* Filters and Search - matching dashboard theme */}
          <div className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari pengguna berdasarkan email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="sm:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 appearance-none"
                  >
                    <option value="all">Semua Peran</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table - matching dashboard theme */}
          <div className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60">
            <UserTable
              users={filteredUsers}
              isLoading={isUsersLoading}
              onEditUser={handleEditUser}
              onViewNotes={handleViewNotes}
            />
            
            {renderPagination()}
          </div>
        </>
      )}

      {/* Modals */}
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />

      <UserNotesModal
        isOpen={isNotesModalOpen}
        onClose={handleCloseNotesModal}
        user={selectedUser}
      />
    </div>
  );
};
