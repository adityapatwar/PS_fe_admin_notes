import { User, UserNote, CreateUserRequest, UpdateUserRequest, UserStats } from '../types';

// Enhanced mock data with notes statistics
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    isActive: true,
    role: 'admin',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    lastLoginAt: new Date('2024-01-20T14:22:00Z'),
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    notesCount: 25,
    lastNoteAt: new Date('2024-01-19T10:30:00Z'),
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    isActive: true,
    role: 'user',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    lastLoginAt: new Date('2024-01-19T16:45:00Z'),
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    notesCount: 18,
    lastNoteAt: new Date('2024-01-18T15:20:00Z'),
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    isActive: false,
    role: 'moderator',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    lastLoginAt: new Date('2024-01-18T13:30:00Z'),
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    notesCount: 7,
    lastNoteAt: new Date('2024-01-17T09:15:00Z'),
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@example.com',
    isActive: true,
    role: 'user',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    lastLoginAt: new Date('2024-01-20T10:15:00Z'),
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    notesCount: 32,
    lastNoteAt: new Date('2024-01-20T08:45:00Z'),
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    isActive: true,
    role: 'user',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    lastLoginAt: new Date('2024-01-19T12:20:00Z'),
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    notesCount: 12,
    lastNoteAt: new Date('2024-01-19T11:30:00Z'),
  },
  {
    id: '6',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    isActive: true,
    role: 'user',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    lastLoginAt: new Date('2024-01-20T09:30:00Z'),
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    notesCount: 41,
    lastNoteAt: new Date('2024-01-20T07:15:00Z'),
  },
];

const mockUserNotes: UserNote[] = [
  // John Doe's notes
  {
    id: '1',
    userId: '1',
    title: 'Project Planning Meeting',
    content: 'Discussed Q1 roadmap and resource allocation for the new dashboard project.',
    category: 'meeting',
    priority: 'high',
    tags: ['planning', 'roadmap', 'Q1'],
    isArchived: false,
    createdAt: new Date('2024-01-19T10:30:00Z'),
    updatedAt: new Date('2024-01-19T10:30:00Z'),
  },
  {
    id: '2',
    userId: '1',
    title: 'User Feedback Analysis',
    content: 'Compiled user feedback from the last sprint. Need to prioritize bug fixes.',
    category: 'work',
    priority: 'medium',
    tags: ['feedback', 'bugs', 'sprint'],
    isArchived: false,
    createdAt: new Date('2024-01-18T14:20:00Z'),
    updatedAt: new Date('2024-01-18T14:20:00Z'),
  },
  // Jane Smith's notes
  {
    id: '3',
    userId: '2',
    title: 'Design System Updates',
    content: 'Updated color palette and typography guidelines for better accessibility.',
    category: 'work',
    priority: 'medium',
    tags: ['design', 'accessibility', 'guidelines'],
    isArchived: false,
    createdAt: new Date('2024-01-18T15:20:00Z'),
    updatedAt: new Date('2024-01-18T15:20:00Z'),
  },
  {
    id: '4',
    userId: '2',
    title: 'Weekend Reading List',
    content: 'Books to read: Clean Code, Design Patterns, System Design Interview.',
    category: 'personal',
    priority: 'low',
    tags: ['books', 'learning', 'development'],
    isArchived: false,
    createdAt: new Date('2024-01-17T18:00:00Z'),
    updatedAt: new Date('2024-01-17T18:00:00Z'),
  },
  // Sarah Wilson's notes (most active user)
  {
    id: '5',
    userId: '4',
    title: 'API Integration Strategy',
    content: 'Planning the integration approach for third-party APIs in the new microservices architecture.',
    category: 'project',
    priority: 'high',
    tags: ['api', 'microservices', 'architecture'],
    isArchived: false,
    createdAt: new Date('2024-01-20T08:45:00Z'),
    updatedAt: new Date('2024-01-20T08:45:00Z'),
  },
  {
    id: '6',
    userId: '4',
    title: 'Team Standup Notes',
    content: 'Daily standup: Completed user authentication, working on dashboard components.',
    category: 'meeting',
    priority: 'medium',
    tags: ['standup', 'progress', 'authentication'],
    isArchived: false,
    createdAt: new Date('2024-01-19T09:15:00Z'),
    updatedAt: new Date('2024-01-19T09:15:00Z'),
  },
  // More notes for other users...
  {
    id: '7',
    userId: '5',
    title: 'Database Optimization Ideas',
    content: 'Identified slow queries and potential indexing improvements for better performance.',
    category: 'work',
    priority: 'high',
    tags: ['database', 'optimization', 'performance'],
    isArchived: false,
    createdAt: new Date('2024-01-19T11:30:00Z'),
    updatedAt: new Date('2024-01-19T11:30:00Z'),
  },
  {
    id: '8',
    userId: '6',
    title: 'Mobile App Feature Ideas',
    content: 'Brainstorming new features for the mobile app: dark mode, offline sync, push notifications.',
    category: 'idea',
    priority: 'medium',
    tags: ['mobile', 'features', 'brainstorming'],
    isArchived: false,
    createdAt: new Date('2024-01-20T07:15:00Z'),
    updatedAt: new Date('2024-01-20T07:15:00Z'),
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  async getUsers(): Promise<User[]> {
    await delay(500);
    return mockUsers;
  },

  async getUserById(userId: string): Promise<User> {
    await delay(300);
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user;
  },

  async getUserNotes(userId: string): Promise<UserNote[]> {
    await delay(300);
    return mockUserNotes.filter(note => note.userId === userId);
  },

  async getUserStats(): Promise<UserStats> {
    await delay(400);
    const totalUsers = mockUsers.length;
    const activeUsers = mockUsers.filter(u => u.isActive).length;
    const inactiveUsers = totalUsers - activeUsers;
    const adminUsers = mockUsers.filter(u => u.role === 'admin').length;
    const moderatorUsers = mockUsers.filter(u => u.role === 'moderator').length;
    const regularUsers = mockUsers.filter(u => u.role === 'user').length;
    const totalNotes = mockUsers.reduce((sum, user) => sum + user.notesCount, 0);
    const averageNotesPerUser = totalUsers > 0 ? Math.round(totalNotes / totalUsers) : 0;
    
    // Find most active user
    const mostActiveUser = mockUsers.reduce((prev, current) => 
      (prev.notesCount > current.notesCount) ? prev : current
    );

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      adminUsers,
      moderatorUsers,
      regularUsers,
      totalNotes,
      averageNotesPerUser,
      mostActiveUser: {
        id: mostActiveUser.id,
        name: `${mostActiveUser.firstName} ${mostActiveUser.lastName}`,
        notesCount: mostActiveUser.notesCount,
      },
    };
  },

  async createUser(userData: CreateUserRequest): Promise<User> {
    await delay(800);
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      ...userData,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      notesCount: 0,
    };
    mockUsers.push(newUser);
    return newUser;
  },

  async updateUser(userId: string, userData: UpdateUserRequest): Promise<User> {
    await delay(600);
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error(`User with id ${userId} not found`);
    }
    
    const updatedUser = {
      ...mockUsers[userIndex],
      ...userData,
      updatedAt: new Date(),
    };
    
    mockUsers[userIndex] = updatedUser;
    return updatedUser;
  },

  async deleteUser(userId: string): Promise<void> {
    await delay(400);
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error(`User with id ${userId} not found`);
    }
    mockUsers.splice(userIndex, 1);
  },
};
