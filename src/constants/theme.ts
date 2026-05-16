export const colors = {
  light: {
    background: '#f5f5f7',
    card: '#ffffff',
    text: '#1d1d1f',
    textSecondary: '#6e6e73',
    border: '#e8eaef',
    tint: '#4f46e5',
    tabIconDefault: '#8e8e93',
    tabIconSelected: '#4f46e5',
    gradient: ['#6366f1', '#8b5cf6'] as const,
    danger: '#ff3b30',
    success: '#34c759',
  },
  dark: {
    background: '#000000',
    card: '#1c1c1e',
    text: '#f5f5f7',
    textSecondary: '#98989d',
    border: '#38383a',
    tint: '#818cf8',
    tabIconDefault: '#636366',
    tabIconSelected: '#818cf8',
    gradient: ['#4f46e5', '#7c3aed'] as const,
    danger: '#ff453a',
    success: '#30d158',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
