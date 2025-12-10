import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
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

  return (
    <Layout title="Login | Physical AI" description="Sign in to access robotics modules">
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
            }}>Welcome Back</h1>
            <p style={{ color: '#718096', fontSize: '16px' }}>
              Sign in to access your robotics learning materials
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
                  placeholder="Enter your password"
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

              <Link
                to="/forgot-password"
                style={{
                  fontSize: '14px',
                  color: '#570683',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Forgot password?
              </Link>
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

          <p style={{
            textAlign: 'center',
            marginTop: '25px',
            fontSize: '15px',
            color: '#718096'
          }}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: '#570683',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Sign Up
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
