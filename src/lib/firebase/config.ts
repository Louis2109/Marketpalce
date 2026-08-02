import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

/**
 * Firebase Environment Config Loader
 * Uses VITE_ prefixed environment variables or falls back gracefully
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDajfWibqEmjTp0KWcgescmoBl8xVCJxRI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'mervason-marketplace.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'mervason-marketplace',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'mervason-marketplace.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1029517584393',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1029517584393:web:e9bcd31eff7643244bf0d8',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-VEM2L625Q6',
};

// Initialize Firebase App instance
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

/**
 * Standardized Firestore error handler conforming to project specifications
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid ?? null,
      email: currentUser?.email ?? null,
      emailVerified: currentUser?.emailVerified ?? null,
      isAnonymous: currentUser?.isAnonymous ?? null,
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Connection validator for runtime health checks
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'system', 'health'));
    return true;
  } catch (err) {
    if (err instanceof Error && err.message.includes('offline')) {
      console.warn('Firestore offline status detected during health test.');
    }
    return false;
  }
}
