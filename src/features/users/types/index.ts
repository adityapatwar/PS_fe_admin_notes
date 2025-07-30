export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: 'admin' | 'user' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  avatar?: string;
  // Notes statistics
  notesCount: number;
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
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
  role?: 'admin' | 'user' | 'moderator';
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
