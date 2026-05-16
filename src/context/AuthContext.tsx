import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { User } from '@/src/types';
import { isFirebaseConfigured } from '@/src/constants/config';
import {
  firebaseSignIn,
  firebaseSignUp,
  firebaseSignOut,
  firebaseResetPassword,
  getCurrentFirebaseUser,
} from '@/src/services/firebase/auth';
import { getFirebaseAuth } from '@/src/services/firebase/config';
import { clearAuthToken, getAuthToken, setAuthToken } from '@/src/utils/storage';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_USER: User = {
  id: 'demo-user',
  email: 'demo@premium.app',
  displayName: 'Demo User',
};

async function signInDemo(email: string, password: string): Promise<User> {
  await new Promise((r) => setTimeout(r, 600));
  if (!email || password.length < 6) {
    throw new Error('Invalid email or password (min 6 characters)');
  }
  await setAuthToken('demo-token');
  return { ...DEMO_USER, email, displayName: email.split('@')[0] };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured()) {
      const auth = getFirebaseAuth();
      if (!auth) {
        setIsLoading(false);
        return;
      }
      const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          await setAuthToken(await fbUser.getIdToken());
          setUser({
            id: fbUser.uid,
            email: fbUser.email ?? '',
            displayName: fbUser.displayName ?? 'User',
            photoURL: fbUser.photoURL ?? undefined,
          });
        } else {
          await clearAuthToken();
          setUser(null);
        }
        setIsLoading(false);
      });
      return unsubscribe;
    }

    getCurrentFirebaseUser();
    const timer = setTimeout(async () => {
      const token = await getAuthToken();
      setUser(token === 'demo-token' ? DEMO_USER : null);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (isFirebaseConfigured()) {
      const u = await firebaseSignIn(email, password);
      setUser(u);
      return;
    }
    const u = await signInDemo(email, password);
    setUser(u);
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      if (isFirebaseConfigured()) {
        const u = await firebaseSignUp(email, password, displayName);
        setUser(u);
        return;
      }
      const u = await signInDemo(email, password);
      setUser({ ...u, displayName });
    },
    [signIn]
  );

  const signOut = useCallback(async () => {
    if (isFirebaseConfigured()) {
      await firebaseSignOut();
    }
    await clearAuthToken();
    setUser(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    if (isFirebaseConfigured()) {
      await firebaseResetPassword(email);
      return;
    }
    await new Promise((r) => setTimeout(r, 500));
    if (!email.includes('@')) throw new Error('Enter a valid email address');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      signIn,
      signUp,
      signOut,
      resetPassword,
    }),
    [user, isLoading, signIn, signUp, signOut, resetPassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
