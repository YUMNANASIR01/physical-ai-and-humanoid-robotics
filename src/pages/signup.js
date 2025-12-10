import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
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
      } else {
        // Redirect to home page after successful signup
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Sign Up | Physical AI" description="Create a new account">
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
      }}>
        <div style={{
          padding: '40px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
          width: '100%',
          maxWidth: '420px',
          position: 'relative'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#2d3748',
              marginBottom: '8px'
            }}>Create Account</h1>
            <p style={{ color: '#718096', fontSize: '16px' }}>
              Join to access robotics learning materials
            </p>
          </div>

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

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <label htmlFor="name" style={labelStyle}>Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={inputStyle}
                required
                disabled={loading}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <label htmlFor="email" style={labelStyle}>Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={inputStyle}
                required
                disabled={loading}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <label htmlFor="password" style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  style={{...inputStyle, paddingRight: '45px'}}
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
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  style={{...inputStyle, paddingRight: '45px'}}
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

          <p style={{
            textAlign: 'center',
            marginTop: '25px',
            fontSize: '15px',
            color: '#718096'
          }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#570683',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
}

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
