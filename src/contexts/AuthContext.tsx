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
let API_URL = "https://farmingbackend-hsfwf3c9ash4adew.centralindia-01.azurewebsites.net";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  // Load Google API script and initialize Google Sign-In
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '763127770724-isjj3oae0bug2vk42ueo8090h4je9jpa.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
    };
    document.body.appendChild(script);

    // Load saved user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle Google Sign-In response
  const handleCredentialResponse = async (response: { credential: string }) => {
    try {
      await googleLogin(response.credential);
    } catch (err) {
      console.error('Google Sign-In failed:', err);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    console.log('API URL:', API_URL);
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password }
      );
      
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
      const response = await axios.post(`${API_URL}/google-login`, { credential }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      
      if (response.data.message === 'Google Login successful') {
        const userData: User = {
          id: response.data.email,
          email: response.data.email,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return;
      }
      
      throw new Error('Invalid response format');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Google login failed. Please try again.');
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