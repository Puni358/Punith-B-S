import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../firebase/config';
import { createUserProfile, getUserProfile } from './userService';
import { UserProfile } from '../types';

const MOCK_AUTH_STORAGE_KEY = 'student_market_demo_session';

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

/**
 * Parses user friendly messages from Firebase Auth codes
 */
export function formatAuthError(error: any): string {
  if (!error) return 'An unknown error occurred.';
  const code = error.code || '';
  const message = error.message || String(error);

  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
      return 'No student account found with this email.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try logging in instead.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completing.';
    case 'auth/network-request-failed':
      return 'Network connection failed. Please check your internet connection.';
    default:
      if (message.includes('invalid-email')) return 'Please enter a valid email address.';
      if (message.includes('wrong-password') || message.includes('invalid-credential')) return 'Incorrect email or password.';
      return message;
  }
}

/**
 * Sign up with Email and Password
 */
export async function signUpWithEmail(name: string, email: string, password: string): Promise<UserProfile> {
  if (isFirebaseConfigured && auth) {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = userCred.user;
      
      const profile: UserProfile = {
        uid: fbUser.uid,
        name: name.trim(),
        email: fbUser.email || email,
        photoURL: fbUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1A1A1A&color=F7F3EF`,
        createdAt: new Date().toISOString(),
      };

      await createUserProfile(profile);
      return profile;
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  } else {
    // Demo Mode Sign Up
    const mockUser: UserProfile = {
      uid: `demo-user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1A1A1A&color=F7F3EF`,
      createdAt: new Date().toISOString(),
    };
    
    await createUserProfile(mockUser);
    localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(mockUser));
    return mockUser;
  }
}

/**
 * Log in with Email and Password
 */
export async function loginWithEmail(email: string, password: string): Promise<UserProfile> {
  if (isFirebaseConfigured && auth) {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCred.user;
      let profile = await getUserProfile(fbUser.uid);
      
      if (!profile) {
        profile = {
          uid: fbUser.uid,
          name: fbUser.displayName || email.split('@')[0],
          email: fbUser.email || email,
          photoURL: fbUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(fbUser.displayName || 'Student')}&background=1A1A1A&color=F7F3EF`,
          createdAt: new Date().toISOString(),
        };
        await createUserProfile(profile);
      }
      return profile;
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  } else {
    // Demo Mode Login
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    
    const mockName = email.split('@')[0].replace('.', ' ');
    const formattedName = mockName.charAt(0).toUpperCase() + mockName.slice(1);

    const mockUser: UserProfile = {
      uid: `demo-user-${email.replace(/[^a-zA-Z0-9]/g, '')}`,
      name: formattedName || 'Student Seller',
      email: email.trim().toLowerCase(),
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(formattedName || 'Student')}&background=1A1A1A&color=F7F3EF`,
      createdAt: new Date().toISOString(),
    };

    await createUserProfile(mockUser);
    localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(mockUser));
    return mockUser;
  }
}

/**
 * Sign in with Google Popup
 */
export async function signInWithGoogle(): Promise<UserProfile> {
  if (isFirebaseConfigured && auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      let profile = await getUserProfile(fbUser.uid);

      if (!profile) {
        profile = {
          uid: fbUser.uid,
          name: fbUser.displayName || 'Campus Student',
          email: fbUser.email || '',
          photoURL: fbUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(fbUser.displayName || 'Student')}&background=1A1A1A&color=F7F3EF`,
          createdAt: new Date().toISOString(),
        };
        await createUserProfile(profile);
      }
      return profile;
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  } else {
    // Demo Mode Google Sign-In
    const demoUser: UserProfile = {
      uid: 'demo-google-student-123',
      name: 'Alex Chen',
      email: 'alex.chen@campus.edu',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      createdAt: new Date().toISOString(),
    };

    await createUserProfile(demoUser);
    localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(demoUser));
    return demoUser;
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string): Promise<void> {
  if (isFirebaseConfigured && auth) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  } else {
    // Demo password reset acknowledgement
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    // Simulate delay
    await new Promise(res => setTimeout(res, 600));
  }
}

/**
 * Sign out current user
 */
export async function logoutUser(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  } else {
    localStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
  }
}

/**
 * Subscribe to auth changes
 */
export function subscribeToAuthChanges(callback: (user: UserProfile | null) => void): () => void {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        let profile = await getUserProfile(fbUser.uid);
        if (!profile) {
          profile = {
            uid: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Student',
            email: fbUser.email || '',
            photoURL: fbUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(fbUser.displayName || 'Student')}&background=1A1A1A&color=F7F3EF`,
            createdAt: new Date().toISOString(),
          };
          await createUserProfile(profile);
        }
        callback(profile);
      } else {
        callback(null);
      }
    });
  } else {
    // Demo mode local session listener
    const loadDemoUser = async () => {
      try {
        const raw = localStorage.getItem(MOCK_AUTH_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          callback(parsed);
        } else {
          callback(null);
        }
      } catch {
        callback(null);
      }
    };

    loadDemoUser();

    // Listen to local storage changes
    const handler = (e: StorageEvent) => {
      if (e.key === MOCK_AUTH_STORAGE_KEY) {
        if (e.newValue) {
          callback(JSON.parse(e.newValue));
        } else {
          callback(null);
        }
      }
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }
}
