import React from 'react';
import Layout from '@theme/Layout';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout title="Profile | Physical AI" description="User profile page">
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
            <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Please sign in to view your profile</h2>
            <a href="/login" style={{
              color: '#570683',
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
    <Layout title={`${user.name}'s Profile | Physical AI`} description="User profile page">
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
          Your Profile
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #e2e8f0',
            marginBottom: '20px'
          }}>
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
              alt={`${user.name}'s avatar`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '10px'
          }}>
            {user.name}
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#718096',
            marginBottom: '30px'
          }}>
            {user.email}
          </p>

          <div style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f7fafc',
              borderRadius: '10px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#4a5568',
                marginBottom: '10px'
              }}>
                Account Information
              </h3>
              <p style={{ marginBottom: '5px' }}>
                <strong>Name:</strong> {user.name}
              </p>
              <p style={{ marginBottom: '5px' }}>
                <strong>Email:</strong> {user.email}
              </p>
              <p style={{ marginBottom: '5px' }}>
                <strong>Member since:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#f7fafc',
              borderRadius: '10px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#4a5568',
                marginBottom: '10px'
              }}>
                Learning Progress
              </h3>
              <p style={{ marginBottom: '5px' }}>
                <strong>Modules Completed:</strong> 0
              </p>
              <p style={{ marginBottom: '5px' }}>
                <strong>Time Spent:</strong> 0 hours
              </p>
              <p style={{ marginBottom: '5px' }}>
                <strong>Certificates:</strong> 0
              </p>
            </div>
          </div>

          <button style={{
            marginTop: '30px',
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
            Edit Profile
          </button>
        </div>
      </div>
    </Layout>
  );
}