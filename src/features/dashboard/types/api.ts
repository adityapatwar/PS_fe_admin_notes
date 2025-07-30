// Dashboard API Types
export interface DashboardStatistics {
  totalUsers: number;
  totalNotes: number;
  activeUsers: number;
  newUsers: number;
  notesToday: number;
  usersToday: number;
}

export interface UserAnalyticsData {
  date: string;
  registrations: number;
  logins: number;
  activeUsers: number;
}

export interface NotesAnalyticsData {
  date: string;
  notesCreated: number;
  notesUpdated: number;
  notesDeleted: number;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  databaseStatus: 'up' | 'down' | 'slow';
  uptime: string;
  memoryUsage: number;
  cpuUsage: number;
}

export interface ActivityDetails {
  email?: string;
  source?: string;
  noteId?: string;
  title?: string;
  [key: string]: any;
}

export interface RecentActivity {
  id: string;
  type: 'user_registration' | 'user_login' | 'note_created' | 'note_updated' | 'note_deleted' | 'admin_action';
  description: string;
  userId?: string;
  userName?: string;
  timestamp: string;
  details?: ActivityDetails;
}

export interface DashboardConfig {
  id: string;
  userId: string;
  theme: 'light' | 'dark';
  refreshInterval: number;
  widgets: string[];
  layout: 'grid' | 'list' | 'compact';
  createdAt: string;
  updatedAt: string;
}

export interface UpdateDashboardConfigRequest {
  theme: 'light' | 'dark';
  refreshInterval: number;
  widgets?: string[];
  layout?: 'grid' | 'list' | 'compact';
}

export interface AnalyticsParams {
  days?: number;
}

export interface ActivitiesParams {
  limit?: number;
}
