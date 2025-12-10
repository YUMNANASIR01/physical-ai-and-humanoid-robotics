import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaSpinner } from 'react-icons/fa';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      const result = await resetPassword(email);
      if (result.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(result.error || 'Failed to send password reset email');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while sending the reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Reset Password | Physical AI" description="Reset your account password">
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
            }}>Reset Password</h1>
            <p style={{ color: '#718096', fontSize: '16px' }}>
              Enter your email to receive a password reset link
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

          {success ? (
            <div style={{
              backgroundColor: '#c6f6d5',
              color: '#2f855a',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '15px',
              border: '1px solid #9ae6b4'
            }}>
              Password reset email sent successfully! Please check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <label htmlFor="email" style={labelStyle}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    style={{...inputStyle, paddingLeft: '45px'}}
                    required
                    disabled={loading}
                  />
                  <FaEnvelope style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#a0aec0'
                  }} />
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
                    Sending Reset Link...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          )}

          <p style={{
            textAlign: 'center',
            marginTop: success ? '20px' : '30px',
            fontSize: '15px',
            color: '#718096'
          }}>
            Remember your password?{' '}
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