import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

export const APP_CONFIG = {
  name: 'NexaPulse',
  version: '1.0.0',
  apiBaseUrl:
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    (extra.apiBaseUrl as string) ??
    'https://api.example.com/v1',
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
  },
} as const;

export const isFirebaseConfigured = (): boolean =>
  Boolean(
    APP_CONFIG.firebase.apiKey &&
      APP_CONFIG.firebase.projectId &&
      APP_CONFIG.firebase.appId
  );
