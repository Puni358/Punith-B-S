import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { UserProfile } from '../types';
import { handleFirestoreError, OperationType } from './firestoreError';

const USERS_STORAGE_KEY = 'student_market_local_users';

function getLocalUsers(): Record<string, UserProfile> {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalUsers(users: Record<string, UserProfile>) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save local user profile', err);
  }
}

/**
 * Creates or updates a user document in Firestore (or local state)
 */
export async function createUserProfile(user: UserProfile): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL || '',
        createdAt: user.createdAt || new Date().toISOString(),
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    }
  } else {
    const users = getLocalUsers();
    users[user.uid] = user;
    saveLocalUsers(users);
  }
}

/**
 * Fetches user profile by ID
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (isFirebaseConfigured && db) {
    try {
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        return snap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${uid}`);
    }
  } else {
    const users = getLocalUsers();
    return users[uid] || null;
  }
}

