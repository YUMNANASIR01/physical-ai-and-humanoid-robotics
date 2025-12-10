import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock authentication functions - these would connect to your backend in a real app
const mockLogin = async (email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // For demo purposes, accept any email/password combination
  return {
    id: 1,
    email,
    name: email.split('@')[0], // Extract name from email
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=b6e3f4,c0aede,d1d4f9`
  };
};

const mockSignup = async (name, email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock validation
  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required');
  }

  // Check if user already exists (demo purposes)
  const existingUser = localStorage.getItem('user');
  if (existingUser && JSON.parse(existingUser).email === email) {
    throw new Error('User with this email already exists');
  }

  // Return mock user data
  return {
    id: 2,
    email,
    name,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9`
  };
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAuthToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    try {
      const userData = await mockLogin(email, password);
      setUser(userData);

      // Generate a mock token
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setAuthToken(token);

      // Store session based on rememberMe preference
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('authToken', token);
      }

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const userData = await mockSignup(name, email, password);
      setUser(userData);

      // Generate a mock token
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setAuthToken(token);

      // Store session (always persistent for new signups)
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', token);

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
  };

  const resetPassword = async (email) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, this would trigger a password reset email
    return { success: true, message: 'Password reset email sent successfully' };
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    authToken,
    isAuthenticated: !!user,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};