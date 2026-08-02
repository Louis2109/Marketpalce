import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase/config';
import { getUserProfile, createUserProfile } from '../lib/firebase/services';
import { UserProfile, UserRole, OperatingCity } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (
    email: string,
    pass: string,
    displayName: string,
    role: UserRole,
    city: OperatingCity,
    phone: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  switchDemoUser: (role: UserRole) => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial Fallback Merchant Profile for seamless instant exploration
const DEFAULT_DEMO_MERCHANT: UserProfile = {
  uid: 'merchant-demo-uid',
  email: 'commercant.bastos@mervason.cm',
  displayName: 'Kenfack Jean-Paul (Boutique Elegance)',
  role: 'merchant',
  city: 'Yaoundé',
  phoneNumber: '237699001122',
  createdAt: new Date().toISOString(),
};

const DEFAULT_DEMO_ADMIN: UserProfile = {
  uid: 'admin-demo-uid',
  email: 'admin.mervason@mervason.cm',
  displayName: 'Administrateur Mervason',
  role: 'admin',
  city: 'Yaoundé',
  phoneNumber: '237690000000',
  createdAt: new Date().toISOString(),
};

const DEFAULT_DEMO_CLIENT: UserProfile = {
  uid: 'client-demo-uid',
  email: 'client.visiteur@mervason.cm',
  displayName: 'Acheteur Anonyme / Client',
  role: 'client',
  city: 'Douala',
  phoneNumber: '237677000000',
  createdAt: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(DEFAULT_DEMO_MERCHANT);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        setIsDemoMode(false);
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setUserProfile(profile);
        } else {
          // Fallback if user document does not exist yet
          const fallback: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Utilisateur Mervason',
            role: 'merchant',
            city: 'Yaoundé',
            createdAt: new Date().toISOString(),
          };
          setUserProfile(fallback);
        }
      } else {
        setCurrentUser(null);
        // Retain active demo mode profile if not signed in via Firebase Auth
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      const profile = await getUserProfile(res.user.uid);
      if (profile) {
        setUserProfile(profile);
      }
      setIsDemoMode(false);
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    email: string,
    pass: string,
    displayName: string,
    role: UserRole,
    city: OperatingCity,
    phone: string
  ) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const newProfile: UserProfile = {
        uid: res.user.uid,
        email,
        displayName,
        role: role === 'admin' ? 'merchant' : role, // Guard against self-assigning admin
        city,
        phoneNumber: phone,
        createdAt: new Date().toISOString(),
      };
      await createUserProfile(newProfile);
      setUserProfile(newProfile);
      setIsDemoMode(false);
    } catch (err) {
      console.error('Signup error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (currentUser) {
      await signOut(auth);
    }
    setUserProfile(DEFAULT_DEMO_CLIENT);
    setIsDemoMode(true);
  };

  const switchDemoUser = (role: UserRole) => {
    setIsDemoMode(true);
    if (role === 'admin') {
      setUserProfile(DEFAULT_DEMO_ADMIN);
    } else if (role === 'merchant') {
      setUserProfile(DEFAULT_DEMO_MERCHANT);
    } else {
      setUserProfile(DEFAULT_DEMO_CLIENT);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        login,
        signup,
        logout,
        switchDemoUser,
        isDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
