import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

type User = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Use VITE_API_URL for Vite, with fallback to default URL
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    console.log('API URL:', API_URL);
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      
      if (response.data.message === 'Login successful') {
        const userData: User = {
          id: email,
          email: email,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return;
      }
      
      throw new Error('Invalid response format');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password });
      
      if (response.data.message === 'Signup successful') {
        const userData: User = {
          id: email,
          email: email,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return;
      }
      
      throw new Error('Invalid response format');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Signup failed. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (credential: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/google-login`, { credential });
      
      if (response.data.message === 'Login successful') {
        const userData: User = {
          id: credential,
          email: credential,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return;
      }
      
      throw new Error('Invalid response format');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Google login failed. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    googleLogin,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};