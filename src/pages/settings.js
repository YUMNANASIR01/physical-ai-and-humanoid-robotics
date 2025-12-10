import React from 'react';
import Layout from '@theme/Layout';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Layout title="Settings | Physical AI" description="User settings page">
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#718096'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Please sign in to access settings</h2>
            <a href="/login" style={{
              color: '#a06abeff',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px'
            }}>
              Sign In
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Settings | Physical AI" description="User settings page">
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#2d3748',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Account Settings
        </h1>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '20px'
            }}>
              Profile Information
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#4a5568'
              }}>Full Name</label>
              <input
                type="text"
                defaultValue={user.name}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '16px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#4a5568'
              }}>Email Address</label>
              <input
                type="email"
                defaultValue={user.email}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '16px'
                }}
              />
            </div>
            
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#570683',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}>
              Save Changes
            </button>
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '20px'
            }}>
              Security
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <button style={{
                padding: '12px 24px',
                backgroundColor: '#e53e3e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onClick={logout}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}