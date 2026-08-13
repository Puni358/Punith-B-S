import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAZanxx7V14-oGSt7TM4-TvjR3NhnN1FQM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sync-uvce.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sync-uvce",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sync-uvce.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "939843024317",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:939843024317:web:93c86b04181dd3a0a00ed4",
};

// Check if valid credentials are provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== '' &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== ''
);

let app = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();

    // Test connection on boot
    async function testConnection() {
      try {
        if (db) {
          await getDocFromServer(doc(db, 'test', 'connection'));
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();
  } catch (error) {
    console.warn('Firebase initialization error:', error);
  }
}

export { auth, db, storage, googleProvider };

