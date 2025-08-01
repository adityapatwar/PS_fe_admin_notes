import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Search } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { User, UserFilters } from '../types';
import { Table } from '../../../shared/components/Table';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { UserDetailModal } from '../components/UserDetailModal';
import { UserModal } from '../components/UserModal';
import { DevelopmentModal } from '../components/DevelopmentModal';

export const UserListPage: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDevelopmentModalOpen, setIsDevelopmentModalOpen] = useState(false);
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    role: 'all',
    status: 'all',
    sortBy: 'createdAt',
    sortDirection: 'desc',
  });

  const filteredUsers = users?.filter(user => {
    const matchesSearch = !filters.search || 
      user.firstName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'active' && user.isActive) ||
      (filters.status === 'inactive' && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  }) || [];

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!filters.sortBy) return 0;
    
    const aValue = a[filters.sortBy];
    const bValue = b[filters.sortBy];
    
    if (filters.sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (key: keyof User, direction: 'asc' | 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortBy: key,
      sortDirection: direction,
    }));
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsEditModalOpen(true);
  };

  const handleRoleChangeClick = () => {
    setIsDevelopmentModalOpen(true);
  };

  const updateFilter = (key: keyof UserFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const columns = [
    {
      key: 'firstName' as keyof User,
      header: 'Nama',
      sortable: true,
      render: (value: string, user: User) => (
        <div className="flex items-center">
          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-sm font-medium text-white">
              {user.firstName?.[0] || user.email[0].toUpperCase()}{user.lastName?.[0] || ''}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">
              {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email.split('@')[0]}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'email' as keyof User,
      header: 'Email',
      sortable: true,
    },
    {
      key: 'role' as keyof User,
      header: 'Peran',
      sortable: true,
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === 'admin'
              ? 'bg-purple-100 text-purple-800'
              : value === 'moderator'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'isActive' as keyof User,
      header: 'Status',
      sortable: true,
      render: (value: boolean) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value ? 'Aktif' : 'Tidak Aktif'}
        </span>
      ),
    },
    {
      key: 'createdAt' as keyof User,
      header: 'Dibuat',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('id-ID'),
    },
    {
      key: 'id' as keyof User,
      header: 'Aksi',
      render: (value: string, user: User) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewUser(user)}
            className="text-blue-600 hover:text-blue-900"
            title="Lihat detail"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEditUser(user)}
            className="text-gray-600 hover:text-gray-900"
            title="Edit pengguna"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={handleRoleChangeClick}
            className="text-yellow-600 hover:text-yellow-900"
            title="Ubah peran"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Manajemen Pengguna</h1>
          <p className="mt-1 text-sm text-gray-600">
            Kelola dan pantau akun pengguna
          </p>
        </div>
        <Button onClick={handleCreateUser}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari pengguna..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={filters.role}
              onChange={(e) => updateFilter('role', e.target.value)}
            >
              <option value="all">Semua Peran</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={filters.status}
              onChange={(e) => updateFilter('status', e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Pengguna ({filteredUsers.length})
          </h3>
        </div>
        <Table
          data={sortedUsers}
          columns={columns}
          onSort={handleSort}
          sortKey={filters.sortBy}
          sortDirection={filters.sortDirection}
          isLoading={isLoading}
          emptyMessage="Tidak ada pengguna ditemukan"
        />
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedUser(null);
          }}
        />
      )}

      {/* User Edit/Create Modal */}
      <UserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      {/* Development Modal */}
      <DevelopmentModal
        isOpen={isDevelopmentModalOpen}
        onClose={() => setIsDevelopmentModalOpen(false)}
        feature="Pengubahan peran pengguna"
      />
    </div>
  );
};
