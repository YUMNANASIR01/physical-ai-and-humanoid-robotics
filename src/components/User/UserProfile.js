import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaCaretDown, FaSignOutAlt, FaUserCircle, FaCog } from 'react-icons/fa';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return null; // Don't show profile if not logged in
  }

  return (
    <div style={containerStyle} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={buttonStyle}
        aria-label="User profile menu"
        aria-expanded={isOpen}
      >
        <img
          src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
          alt={`${user.name}'s avatar`}
          style={avatarStyle}
        />
        <FaCaretDown style={{ marginLeft: '5px', fontSize: '12px' }} />
      </button>

      {isOpen && (
        <div style={dropdownStyle}>
          <div style={userInfoStyle}>
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
              alt={`${user.name}'s avatar`}
              style={dropdownAvatarStyle}
            />
            <div style={userTextInfoStyle}>
              <span style={userNameStyle}>{user.name}</span>
              <span style={userEmailStyle}>{user.email}</span>
            </div>
          </div>
          
          <hr style={dividerStyle} />
          
          <div style={menuItemsStyle}>
            <a href="/profile" style={menuItemStyle}>
              <FaUserCircle style={iconStyle} />
              <span>Profile</span>
            </a>
            
            <a href="/settings" style={menuItemStyle}>
              <FaCog style={iconStyle} />
              <span>Settings</span>
            </a>
            
            <button onClick={logout} style={logoutButtonStyle}>
              <FaSignOutAlt style={iconStyle} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

// Styles
const containerStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  padding: '5px',
  cursor: 'pointer',
  borderRadius: '50%',
  transition: 'background-color 0.2s',
};

buttonStyle[':hover'] = {
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
};

const avatarStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid #e2e8f0',
};

const dropdownStyle = {
  position: 'absolute',
  top: '100%',
  right: '0',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
  width: '240px',
  zIndex: 1000,
  marginTop: '8px',
};

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  borderBottom: '1px solid #e2e8f0',
};

const dropdownAvatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: '12px',
  border: '2px solid #e2e8f0',
};

const userTextInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const userNameStyle = {
  fontWeight: '600',
  fontSize: '14px',
  color: '#2d3748',
  marginBottom: '2px',
};

const userEmailStyle = {
  fontSize: '12px',
  color: '#718096',
};

const dividerStyle = {
  margin: '0',
  border: 'none',
  height: '1px',
  backgroundColor: '#e2e8f0',
};

const menuItemsStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const menuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 15px',
  textDecoration: 'none',
  color: '#2d3748',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'background-color 0.2s',
};

menuItemStyle[':hover'] = {
  backgroundColor: '#f7fafc',
};

const logoutButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '12px 15px',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  textDecoration: 'none',
  color: '#e53e3e',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

logoutButtonStyle[':hover'] = {
  backgroundColor: '#fff5f5',
};

const iconStyle = {
  marginRight: '10px',
  fontSize: '16px',
};