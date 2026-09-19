// ===========================================
// FIREBASE CONFIGURATION
// ===========================================

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

/**
 * Firebase configuration object
 * Values are loaded from environment variables
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Validate Firebase configuration
 * Returns validation result instead of throwing error
 */
function validateFirebaseConfig(): { isValid: boolean; missing: string[] } {
  // Next.js only inlines statically referenced NEXT_PUBLIC_* variables.
  // Validate the resolved configuration rather than dynamic process.env[key].
  const required = {
    NEXT_PUBLIC_FIREBASE_API_KEY: firebaseConfig.apiKey,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: firebaseConfig.projectId,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: firebaseConfig.storageBucket,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: firebaseConfig.messagingSenderId,
    NEXT_PUBLIC_FIREBASE_APP_ID: firebaseConfig.appId,
  };

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  
  if (missing.length > 0 && typeof window !== 'undefined') {
    console.warn(
      '⚠️ Missing Firebase environment variables:',
      missing.join(', '),
      '\nPlease check your .env.local file and ensure all Firebase config values are set.'
    );
  }
  
  return {
    isValid: missing.length === 0,
    missing,
  };
}

/**
 * Initialize Firebase App
 * Only initialize if not already initialized
 * This is the SINGLE SOURCE OF TRUTH for Firebase initialization
 */
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!app) {
    if (getApps().length === 0) {
      // Validate config before initializing
      const validation = validateFirebaseConfig();
      if (!validation.isValid) {
        // Still try to initialize, but log warning
        console.warn('Firebase initialization may fail due to missing environment variables');
      }
      
      try {
        app = initializeApp(firebaseConfig);
      } catch (error: any) {
        console.error('Firebase initialization error:', error);
        throw new Error(
          `Failed to initialize Firebase: ${error.message}\n` +
          'Please check your Firebase configuration in .env.local file.'
        );
      }
    } else {
      app = getApp();
    }
  }
  return app;
}

function getFirestoreDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

function getFirebaseStorage(): FirebaseStorage | null {
  if (typeof window === 'undefined') {
    return null;
  }
  if (!storage) {
    storage = getStorage(getFirebaseApp());
  }
  return storage;
}

// Export getters instead of direct instances
export { getFirebaseApp, getFirestoreDb, getFirebaseAuth, getFirebaseStorage };
export { firebaseConfig, validateFirebaseConfig };
