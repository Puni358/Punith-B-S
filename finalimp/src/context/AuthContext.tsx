import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { 
  subscribeToAuthChanges, 
  loginWithEmail, 
  signUpWithEmail, 
  signInWithGoogle, 
  logoutUser, 
  sendPasswordReset 
} from '../services/authService';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<UserProfile>;
  signup: (name: string, email: string, pass: string) => Promise<UserProfile>;
  loginWithGoogle: () => Promise<UserProfile>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const u = await loginWithEmail(email, pass);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, pass: string) => {
    setLoading(true);
    try {
      const u = await signUpWithEmail(name, email, pass);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const u = await signInWithGoogle();
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordReset(email);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        loginWithGoogle,
        resetPassword,
        logout,
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
