import { apiClient } from './client';
import { User, DashboardStat, ActivityItem } from '@/src/types';

export const endpoints = {
  auth: {
    profile: () => apiClient.get<User>('/auth/profile'),
  },
  dashboard: {
    stats: () => apiClient.get<DashboardStat[]>('/dashboard/stats'),
    activity: () => apiClient.get<ActivityItem[]>('/dashboard/activity'),
  },
} as const;
