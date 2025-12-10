import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../Modal/Modal';

// Component to wrap protected content in textbook pages
export const ProtectedContent = ({ children, message = "Sign in to access this content" }) => {
  const { isAuthenticated, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        setShowModal(true);
      }
      setChecked(true);
    }
  }, [isAuthenticated, loading]);

  // Show loading while checking
  if (loading && !checked) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        color: '#570683'
      }}>
        Checking authentication...
      </div>
    );
  }

  // If not authenticated, show the modal
  if (!isAuthenticated) {
    return (
      <div>
        <div
          style={{
            border: '2px dashed #e53e3e',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#fff5f5',
            textAlign: 'center',
            color: '#c53030',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
          onClick={() => setShowModal(true)}
        >
          <p style={{ margin: 0, fontWeight: '500' }}>{message}</p>
          <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#e53e3e' }}>
            Click to sign in or create an account
          </p>
        </div>
        <AuthModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          mode="login"
        />
      </div>
    );
  }

  // If authenticated, show the content
  return <div>{children}</div>;
};

// Component to trigger auth modal on click (for buttons/links)
export const AuthTrigger = ({ children, mode = 'login', fallbackUrl = null }) => {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (isAuthenticated) {
    // If authenticated, render children normally
    return <>{children}</>;
  }

  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <div onClick={handleClick} style={{ display: 'inline-block', cursor: 'pointer' }}>
        {children}
      </div>
      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        mode={mode}
      />
    </>
  );
};