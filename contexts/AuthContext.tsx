import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from '../types';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  upgrade: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const API_URL = 'http://localhost:5001'; // The URL of your new backend server

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('mcp-token'));

  const fetchUser = useCallback(async (authToken: string) => {
    try {
      const response = await fetch(`${API_URL}/api/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
      } else {
        // Token is invalid or expired
        logout();
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
      logout();
    } finally {
       setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, [token, fetchUser]);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });

      if (!response.ok) return false;

      const { token: receivedToken } = await response.json();
      localStorage.setItem('mcp-token', receivedToken);
      setToken(receivedToken);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };
  
  const signup = async (email: string, pass: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/api/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: pass }),
        });
        if (!response.ok) {
            return false;
        }
        // After successful signup, log the user in
        return await login(email, pass);
    } catch(error) {
        console.error("Signup failed:", error);
        return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('mcp-token');
    setToken(null);
    setUser(null);
  };
  
  const upgrade = async () => {
    if (!user || !token) return;
    try {
        const response = await fetch(`${API_URL}/api/upgrade`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const { token: newPremiumToken } = await response.json();
            // Update the token in storage and state
            localStorage.setItem('mcp-token', newPremiumToken);
            setToken(newPremiumToken); // This will trigger the useEffect to refetch the user
        } else {
            console.error("Failed to upgrade user subscription on the server.");
        }
    } catch (error) {
        console.error("Failed to upgrade user", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, upgrade }}>
      {children}
    </AuthContext.Provider>
  );
};