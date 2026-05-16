import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';

import { User } from '@/src/types';
import { setAuthToken } from '@/src/utils/storage';
import { getFirebaseAuth } from './config';

function mapFirebaseUser(fbUser: FirebaseUser): User {
  return {
    id: fbUser.uid,
    email: fbUser.email ?? '',
    displayName: fbUser.displayName ?? fbUser.email?.split('@')[0] ?? 'User',
    photoURL: fbUser.photoURL ?? undefined,
  };
}

export async function firebaseSignIn(
  email: string,
  password: string
): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error('Firebase is not configured. Add credentials to .env');
  const result = await signInWithEmailAndPassword(auth, email, password);
  await setAuthToken(await result.user.getIdToken());
  return mapFirebaseUser(result.user);
}

export async function firebaseSignUp(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error('Firebase is not configured. Add credentials to .env');
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName });
  await setAuthToken(await result.user.getIdToken());
  return mapFirebaseUser(result.user);
}

export async function firebaseSignOut(): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) return;
  await signOut(auth);
}

export async function firebaseResetPassword(email: string): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error('Firebase is not configured. Add credentials to .env');
  await sendPasswordResetEmail(auth, email);
}

export function getCurrentFirebaseUser(): User | null {
  const auth = getFirebaseAuth();
  if (!auth?.currentUser) return null;
  return mapFirebaseUser(auth.currentUser);
}
