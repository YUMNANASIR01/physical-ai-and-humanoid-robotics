import React from 'react';
import { Redirect } from '@docusaurus/router';
import { useAuth } from './AuthContext';

// ProtectedRoute component to restrict access to textbook pages
export const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        fontWeight: '500',
        color: '#570683'
      }}>
        Checking authentication...
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    // Store the attempted path in session storage so we can redirect back after login
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
    return <Redirect to={redirectPath} />;
  }

  // If authenticated, render the children
  return children;
};

// Higher-order component version for wrapping pages
export const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          fontWeight: '500',
          color: '#570683'
        }}>
          Checking authentication...
        </div>
      );
    }

    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      return <Redirect to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
};