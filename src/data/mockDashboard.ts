import { ActivityItem, DashboardStat } from '@/src/types';

export type Period = 'week' | 'month' | 'year';

export const periodRevenue: Record<Period, { amount: number; change: number; label: string }> = {
  week: { amount: 12480, change: 8.4, label: 'This week' },
  month: { amount: 48294, change: 18.2, label: 'This month' },
  year: { amount: 524800, change: 32.1, label: 'This year' },
};

export const chartDataByPeriod: Record<Period, number[]> = {
  week: [42, 68, 55, 82, 71, 94, 88],
  month: [65, 72, 58, 80, 76, 92, 85, 70, 88, 95, 78, 90],
  year: [45, 52, 48, 61, 58, 72, 68, 75, 80, 85, 78, 92],
};

export const chartLabelsByPeriod: Record<Period, string[]> = {
  week: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  month: ['W1', 'W2', 'W3', 'W4'],
  year: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
};

export const statsByPeriod: Record<Period, DashboardStat[]> = {
  week: [
    { id: '1', label: 'Revenue', value: '$12.4k', change: 8.4, icon: 'trending-up' },
    { id: '2', label: 'Users', value: '+186', change: 5.2, icon: 'people' },
    { id: '3', label: 'Orders', value: '92', change: 3.1, icon: 'cart' },
    { id: '4', label: 'Growth', value: '12%', change: 2.8, icon: 'analytics' },
  ],
  month: [
    { id: '1', label: 'Revenue', value: '$48.2k', change: 18.2, icon: 'trending-up' },
    { id: '2', label: 'Users', value: '2,847', change: 8.2, icon: 'people' },
    { id: '3', label: 'Orders', value: '384', change: -2.1, icon: 'cart' },
    { id: '4', label: 'Growth', value: '24%', change: 15.3, icon: 'analytics' },
  ],
  year: [
    { id: '1', label: 'Revenue', value: '$524k', change: 32.1, icon: 'trending-up' },
    { id: '2', label: 'Users', value: '18.2k', change: 41.0, icon: 'people' },
    { id: '3', label: 'Orders', value: '4.1k', change: 22.5, icon: 'cart' },
    { id: '4', label: 'Growth', value: '89%', change: 28.4, icon: 'analytics' },
  ],
};

export const mockActivity: ActivityItem[] = [
  {
    id: '1',
    title: 'New subscription',
    subtitle: 'Pro plan activated',
    time: '2m ago',
    type: 'success',
  },
  {
    id: '2',
    title: 'Payment received',
    subtitle: '$49.00 from Alex M.',
    time: '15m ago',
    type: 'info',
  },
  {
    id: '3',
    title: 'Server alert',
    subtitle: 'High CPU usage detected',
    time: '1h ago',
    type: 'warning',
  },
  {
    id: '4',
    title: 'Profile updated',
    subtitle: 'Settings saved successfully',
    time: '3h ago',
    type: 'info',
  },
];

export const quickActions = [
  { id: 'add', icon: 'add-circle' as const, label: 'New', color: '#6366f1' },
  { id: 'analytics', icon: 'bar-chart' as const, label: 'Analytics', color: '#8b5cf6' },
  { id: 'invoice', icon: 'document-text' as const, label: 'Invoice', color: '#06b6d4' },
  { id: 'share', icon: 'share-social' as const, label: 'Share', color: '#10b981' },
];

export const portfolioMix = [
  { id: 'core', label: 'Core', value: 44, amount: '$21.2k', color: '#6366f1' },
  { id: 'growth', label: 'Growth', value: 28, amount: '$13.5k', color: '#06b6d4' },
  { id: 'retention', label: 'Retention', value: 18, amount: '$8.6k', color: '#10b981' },
  { id: 'ops', label: 'Ops', value: 10, amount: '$4.9k', color: '#f59e0b' },
];

export const funnelMetrics = [
  { id: 'visits', label: 'Visits', value: 12840, rate: '100%', color: '#6366f1' },
  { id: 'trials', label: 'Trials', value: 4820, rate: '37.5%', color: '#06b6d4' },
  { id: 'paid', label: 'Paid', value: 1624, rate: '33.7%', color: '#10b981' },
  { id: 'repeat', label: 'Repeat', value: 918, rate: '56.5%', color: '#f59e0b' },
];

export const liveFigures = [
  { id: 'runway', label: 'Runway', value: '18 mo', detail: 'Cash healthy', icon: 'pulse' as const },
  { id: 'nps', label: 'NPS', value: '72', detail: '+9 this month', icon: 'happy' as const },
  { id: 'churn', label: 'Churn', value: '2.4%', detail: '-0.8 improved', icon: 'shield-checkmark' as const },
];
