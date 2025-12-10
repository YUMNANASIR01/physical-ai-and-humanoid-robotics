import React from 'react';
import Link from '@docusaurus/Link';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from './User/UserProfile';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function NavbarItems() {
  const { user, loading } = useAuth();

  if (loading) {
    // Show loading state while checking authentication
    return <div style={{ padding: '0 15px', color: '#5c416bff' }}>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
      {user ? (
        // Show user profile when logged in
        <UserProfile />
      ) : (
        // Show login/signup links when not logged in
        <>
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#570683', textDecoration: 'none', fontWeight: '500' }}>
            <FaSignInAlt /> Sign In
          </Link>
          <Link to="/signup" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#570683', textDecoration: 'none', fontWeight: '500' }}>
            <FaUserPlus /> Sign Up
          </Link>
        </>
      )}
    </div>
  );
}
