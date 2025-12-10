import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaSpinner, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

// Reusable Modal component for login/signup
export const AuthModal = ({ isOpen, onClose, mode: initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login, signup } = useAuth(); // Removed socialLogin since we're removing social buttons

  // Close modal when user logs in
  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27 && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password, rememberMe);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await signup(name, email, password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  const formContent = mode === 'login' ? (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ position: 'relative' }}>
        <label htmlFor="email" style={labelStyle}>Email Address</label>
        <div style={{ position: 'relative' }}>
          <FaEnvelope style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#a0aec0'
          }} />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{...inputStyle, paddingLeft: '40px'}}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <label htmlFor="password" style={labelStyle}>Password</label>
        <div style={{ position: 'relative' }}>
          <FaLock style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#a0aec0'
          }} />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{...inputStyle, paddingLeft: '40px', paddingRight: '45px'}}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#718096'
            }}
            disabled={loading}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{ marginRight: '8px', width: '16px', height: '16px' }}
            disabled={loading}
          />
          <label htmlFor="rememberMe" style={{ margin: 0, fontSize: '14px', color: '#4a5568' }}>
            Remember me
          </label>
        </div>

        <a
          href="/forgot-password"
          style={{
            fontSize: '14px',
            color: '#570683',
            textDecoration: 'none',
            fontWeight: '500'
          }}
          onClick={(e) => {
            e.preventDefault();
            // This would require additional implementation to handle forgot password in modal
          }}
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        style={buttonStyle}
        disabled={loading}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaSpinner style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
            Signing in...
          </span>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  ) : (
    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ position: 'relative' }}>
        <label htmlFor="signup-name" style={labelStyle}>Full Name</label>
        <div style={{ position: 'relative' }}>
          <FaUser style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#a0aec0'
          }} />
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            style={{...inputStyle, paddingLeft: '40px'}}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <label htmlFor="signup-email" style={labelStyle}>Email Address</label>
        <div style={{ position: 'relative' }}>
          <FaEnvelope style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#a0aec0'
          }} />
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{...inputStyle, paddingLeft: '40px'}}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <label htmlFor="signup-password" style={labelStyle}>Password</label>
        <div style={{ position: 'relative' }}>
          <FaLock style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#a0aec0'
          }} />
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            style={{...inputStyle, paddingLeft: '40px', paddingRight: '45px'}}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#718096'
            }}
            disabled={loading}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
        <div style={{ position: 'relative' }}>
          <FaLock style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#a0aec0'
          }} />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            style={{...inputStyle, paddingLeft: '40px', paddingRight: '45px'}}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#718096'
            }}
            disabled={loading}
          >
            {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        style={buttonStyle}
        disabled={loading}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaSpinner style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
            Creating Account...
          </span>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button onClick={onClose} style={closeButtonStyle} aria-label="Close modal">
            ×
          </button>
        </div>

        <div style={modalBodyStyle}>
          {error && (
            <div style={{
              backgroundColor: '#fed7d7',
              color: '#c53030',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              border: '1px solid #feb2b2'
            }}>
              {error}
            </div>
          )}

          {formContent}

          <p style={{
            textAlign: 'center',
            marginTop: '25px',
            fontSize: '15px',
            color: '#718096'
          }}>
            {mode === 'login'
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={switchMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#570683',
                fontWeight: '600',
                textDecoration: 'none',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles for the modal
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  padding: '20px'
};

const modalStyle = {
  backgroundColor: 'white',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '450px',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
  overflow: 'hidden',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column'
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 25px',
  borderBottom: '1px solid #e2e8f0'
};

const modalTitleStyle = {
  margin: 0,
  fontSize: '22px',
  fontWeight: '600',
  color: '#2d3748'
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '28px',
  cursor: 'pointer',
  color: '#a0aec0',
  padding: 0,
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  transition: 'background-color 0.2s'
};

closeButtonStyle[':hover'] = {
  backgroundColor: '#f7fafc',
  color: '#718096'
};

const modalBodyStyle = {
  padding: '25px',
  overflowY: 'auto',
  flex: 1
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#4a5568'
};

const inputStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '10px',
  border: '2px solid #e2e8f0',
  fontSize: '16px',
  transition: 'border-color 0.2s',
  backgroundColor: '#fafafa'
};

inputStyle[':focus'] = {
  outline: 'none',
  borderColor: '#570683',
  backgroundColor: 'white',
  boxShadow: '0 0 0 3px rgba(87, 6, 131, 0.1)'
};

const buttonStyle = {
  padding: '16px',
  borderRadius: '10px',
  background: '#570683',
  color: 'white',
  fontWeight: '700',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  transition: 'background-color 0.2s',
  marginTop: '10px'
};

buttonStyle[':hover'] = {
  backgroundColor: '#4a056e'
};

buttonStyle[':disabled'] = {
  backgroundColor: '#a0aec0',
  cursor: 'not-allowed'
};

// Add the spinner animation
const spinnerStyle = `
  @keyframes spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  # __docusaurus-base-styles__ {
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  }
`;