import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, Plus, Search, Users, UserCheck, UserX, Filter, FileText, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { useAuth } from '../../auth/contexts/AuthContext';
import { useUsers, useUserStats } from '../hooks/useUsers';
import { UserNotesModal } from '../components/UserNotesModal';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';

interface UserFilters {
  search: string;
  role: 'all' | 'admin' | 'user' | 'moderator';
  status: 'all' | 'active' | 'inactive';
  sortBy: 'name' | 'email' | 'created' | 'notes' | 'lastLogin';
  sortOrder: 'asc' | 'desc';
}

/**
 * Enhanced Users management page with notes statistics
 */
export const UsersPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
  const { data: userStats, isLoading: statsLoading } = useUserStats();
  
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUserForNotes, setSelectedUserForNotes] = useState<{ id: string; name: string } | null>(null);
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    role: 'all',
    status: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('UsersPage component mounted');
    console.log('Current path:', window.location.pathname);
  }, []);

  // Filter and sort users
  const filteredAndSortedUsers = React.useMemo(() => {
    if (!users) return [];

    let filtered = users.filter(user => {
      const matchesSearch = !filters.search || 
        user.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesRole = filters.role === 'all' || user.role === filters.role;
      const matchesStatus = filters.status === 'all' || 
        (filters.status === 'active' && user.isActive) ||
        (filters.status === 'inactive' && !user.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sort users
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'created':
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
        case 'notes':
          aValue = a.notesCount;
          bValue = b.notesCount;
          break;
        case 'lastLogin':
          aValue = a.lastLoginAt?.getTime() || 0;
          bValue = b.lastLoginAt?.getTime() || 0;
          break;
        default:
          aValue = a.firstName.toLowerCase();
          bValue = b.firstName.toLowerCase();
      }

      if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, filters]);

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredAndSortedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredAndSortedUsers.map(user => user.id));
    }
  };

  const handleViewNotes = (userId: string, userName: string) => {
    setSelectedUserForNotes({ id: userId, name: userName });
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatLastLogin = (dateString?: Date) => {
    if (!dateString) return 'Belum pernah';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} jam lalu`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} hari lalu`;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getNotesActivityColor = (notesCount: number) => {
    if (notesCount >= 30) return 'text-green-600';
    if (notesCount >= 15) return 'text-yellow-600';
    if (notesCount >= 5) return 'text-blue-600';
    return 'text-gray-500';
  };

  if (usersLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <p className="text-red-600 font-medium">Gagal memuat data users</p>
        <p className="text-red-500 text-sm mt-1">Silakan refresh halaman</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Debug Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-blue-800 text-sm">
          <strong>Debug:</strong> UsersPage berhasil dimuat! Path: {window.location.pathname}
        </p>
      </div>

      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Manajemen User</h1>
              <p className="text-slate-600">Kelola akun user dan statistik notes</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200">
            <Plus className="h-4 w-4" />
            <span>Tambah User</span>
          </button>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="text-2xl font-bold text-slate-800">{userStats?.totalUsers || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">User Aktif</p>
              <p className="text-2xl font-bold text-slate-800">{userStats?.activeUsers || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Notes</p>
              <p className="text-2xl font-bold text-slate-800">{userStats?.totalNotes || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Rata-rata Notes</p>
              <p className="text-2xl font-bold text-slate-800">{userStats?.averageNotesPerUser || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Most Active User Card */}
      {userStats?.mostActiveUser && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">User Paling Aktif</h3>
              <p className="text-purple-100">
                <span className="font-medium">{userStats.mostActiveUser.name}</span> dengan{' '}
                <span className="font-bold">{userStats.mostActiveUser.notesCount} notes</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari user berdasarkan nama atau email..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={filters.role}
                onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value as any }))}
                className="pl-9 pr-8 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="all">Semua Role</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>
            </div>

            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as any }))}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
            >
              <option value="name">Urutkan: Nama</option>
              <option value="email">Urutkan: Email</option>
              <option value="created">Urutkan: Tanggal Dibuat</option>
              <option value="notes">Urutkan: Jumlah Notes</option>
              <option value="lastLogin">Urutkan: Login Terakhir</option>
            </select>

            <button
              onClick={() => setFilters(prev => ({ 
                ...prev, 
                sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' 
              }))}
              className="px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors duration-200"
              title={`Ubah ke ${filters.sortOrder === 'asc'? 'descending' : 'ascending'}`}
            >
              <TrendingUp className={`h-4 w-4 ${filters.sortOrder === 'desc' ? 'rotate-180' : ''} transition-transform duration-200`} />
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/60">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">
              Users ({filteredAndSortedUsers.length})
            </h3>
            {selectedUsers.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-600">
                  {selectedUsers.length} dipilih
                </span>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Hapus Terpilih
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredAndSortedUsers.length && filteredAndSortedUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Login Terakhir
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Dibuat
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60">
              {filteredAndSortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-10 w-10 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border ${getStatusColor(user.isActive)}`}>
                      {user.isActive ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${getNotesActivityColor(user.notesCount)}`}>
                        {user.notesCount}
                      </span>
                      <span className="text-xs text-slate-500">notes</span>
                      {user.notesCount > 0 && (
                        <button
                          onClick={() => handleViewNotes(user.id, `${user.firstName} ${user.lastName}`)}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Lihat
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatLastLogin(user.lastLoginAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Lihat detail user"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                        title="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {user.id !== currentUser?.id && (
                        <button
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Hapus user"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Tidak ada user ditemukan</p>
            <p className="text-slate-400 text-sm mt-1">
              Coba sesuaikan kriteria pencarian atau filter
            </p>
          </div>
        )}
      </div>

      {/* User Notes Modal */}
      {selectedUserForNotes && (
        <UserNotesModal
          userId={selectedUserForNotes.id}
          userName={selectedUserForNotes.name}
          isOpen={true}
          onClose={() => setSelectedUserForNotes(null)}
        />
      )}
    </div>
  );
};
