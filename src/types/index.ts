export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: number;
  icon: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  type: 'success' | 'info' | 'warning';
}

export type ThemeMode = 'light' | 'dark' | 'system';
