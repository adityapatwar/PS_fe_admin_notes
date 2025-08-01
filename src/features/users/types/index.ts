export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status?: 'active' | 'inactive';
  notesCount?: number;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  // Legacy fields for backward compatibility
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  lastLoginAt?: Date;
  avatar?: string;
  lastNoteAt?: Date;
}

export interface UserNote {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: 'personal' | 'work' | 'project' | 'meeting' | 'idea';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: 'admin' | 'user' | 'moderator';
}

export interface UpdateUserRequest {
  email?: string;
  password?: string;
  role?: 'admin' | 'user' | 'moderator';
}

export interface ChangeRoleRequest {
  role: 'admin' | 'user' | 'moderator';
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  moderatorUsers: number;
  regularUsers: number;
  totalNotes: number;
  averageNotesPerUser: number;
  mostActiveUser: {
    id: string;
    name: string;
    notesCount: number;
  } | null;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface UsersListResponse {
  users: User[];
  pagination: PaginationMeta;
}

export interface UsersStatsResponse {
  users: User[];
  pagination: PaginationMeta;
}
