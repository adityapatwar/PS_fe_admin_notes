// Users feature exports
export { UserListPage } from './pages/UserListPage';
export { UserDetailPage } from './pages/UserDetailPage';
export { UserDetailModal } from './components/UserDetailModal';
export { useUsers, useUser, useUserNotes, useCreateUser, useUpdateUser, useDeleteUser } from './hooks/useUsers';
export { userService } from './services/userService';
export type { User, UserNote, CreateUserRequest, UpdateUserRequest, UserFilters } from './types';
