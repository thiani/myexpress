// src/context/AuthContext.tsx
import React, { createContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      // Mock API call - replace with actual API endpoint
      const response = await new Promise<User>((resolve, reject) => {
        setTimeout(() => {
          if (email === 'admin@example.com' && password === 'password') {
            resolve({
              id: '1',
              email: 'admin@example.com',
              name: 'Admin User',
              role: 'admin',
              avatar: '/api/placeholder/32/32'
            });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });

      setUser(response);
      // Store auth token in localStorage
      localStorage.setItem('authToken', 'mock-jwt-token');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('authToken');
    navigate('/auth/login');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};