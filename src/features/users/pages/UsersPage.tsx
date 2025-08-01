import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Users, 
  UserCheck, 
  UserX, 
  Filter, 
  FileText, 
  TrendingUp, 
  Award, 
  BarChart3,
  Download,
  Upload,
  MoreVertical,
  Star,
  Clock,
  Calendar
} from 'lucide-react';
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
 * Modern Users management page with enhanced UI/UX
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
    <div className="space-y-6">
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-white via-blue-50/50 to-indigo-50/30 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-slate-200/60 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-100/40 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Manajemen Pengguna
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Kelola Pengguna
              </h1>
              
              <p className="text-slate-600 max-w-2xl leading-relaxed">
                Pantau aktivitas pengguna, kelola akun, dan analisis statistik notes dalam satu dashboard terpadu.
              </p>
            </div>
            
            <div className="mt-6 lg:mt-0 flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-white/80 text-slate-600 px-4 py-2 rounded-xl hover:bg-white border border-slate-200 transition-all duration-200">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg">
                <Plus className="h-4 w-4" />
                <span>Tambah User</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="text-2xl font-bold text-slate-800">{userStats?.totalUsers || 0}</p>
              <p className="text-xs text-slate-500">pengguna terdaftar</p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">User Aktif</p>
              <p className="text-2xl font-bold text-slate-800">{userStats?.activeUsers || 0}</p>
              <p className="text-xs text-slate-500">24 jam terakhir</p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Total Notes</p>
              <p className="text-2xl font-bold text-slate-800">{userStats?.totalNotes || 0}</p>
              <p className="text-xs text-slate-500">catatan dibuat</p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Rata-rata Notes</p>
              <p className="text-2xl font-bold text-slate-800">{userStats?.averageNotesPerUser || 0}</p>
              <p className="text-xs text-slate-500">per pengguna</p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Most Active User Highlight */}
      {userStats?.mostActiveUser && (
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10 flex items-center space-x-4">
            <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Award className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">🏆 User Paling Aktif</h3>
              <p className="text-purple-100 mt-1">
                <span className="font-semibold">{userStats.mostActiveUser.name}</span> dengan{' '}
                <span className="font-bold text-yellow-300">{userStats.mostActiveUser.notesCount} notes</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Search and Filters */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama, email, atau role..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
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
                className="pl-10 pr-8 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 appearance-none"
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
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 appearance-none"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 appearance-none"
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
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200"
              title={`Ubah ke ${filters.sortOrder === 'asc'? 'descending' : 'ascending'}`}
            >
              <TrendingUp className={`h-4 w-4 ${filters.sortOrder === 'desc' ? 'rotate-180' : ''} transition-transform duration-200`} />
            </button>
          </div>
        </div>
      </div>

      {/* Modern Users Table */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/60 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-slate-800">
                Daftar Pengguna
              </h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                {filteredAndSortedUsers.length} pengguna
              </span>
            </div>
            {selectedUsers.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-600">
                  {selectedUsers.length} dipilih
                </span>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors">
                  Hapus Terpilih
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredAndSortedUsers.length && filteredAndSortedUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Pengguna
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Login Terakhir
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Dibuat
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
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
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={user.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="h-12 w-12 rounded-2xl object-cover shadow-sm"
                        />
                        {user.isActive && (
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.isActive)}`}>
                      {user.isActive ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-bold ${getNotesActivityColor(user.notesCount)}`}>
                        {user.notesCount}
                      </span>
                      <span className="text-xs text-slate-500">notes</span>
                      {user.notesCount > 0 && (
                        <button
                          onClick={() => handleViewNotes(user.id, `${user.firstName} ${user.lastName}`)}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          Lihat
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{formatLastLogin(user.lastLoginAt)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <button
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                        title="Lihat detail user"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors duration-200"
                        title="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {user.id !== currentUser?.id && (
                        <button
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                          title="Hapus user"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors duration-200"
                        title="More options"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedUsers.length === 0 && (
          <div className="text-center py-16">
            <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">Tidak ada pengguna ditemukan</h3>
            <p className="text-slate-500 text-sm">
              Coba sesuaikan kriteria pencarian atau filter untuk menemukan pengguna yang Anda cari
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
