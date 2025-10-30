import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { currentUser, userProfile } = useAuth();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setShowMessage(true);
      // Show message for 2 seconds before redirecting
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  if (!currentUser) {
    if (showMessage) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px'
          }}>
            <h2 style={{ color: '#e74c3c', marginBottom: '20px' }}>Access Restricted</h2>
            <p style={{ fontSize: '18px', color: '#333' }}>
              Please log in first to access this page.
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
              Redirecting to login...
            </p>
          </div>
        </div>
      );
    }
    return <Navigate to="/login" replace />;
  }

  // Check if user has completed profile (has username and phone in DB)
  if (currentUser && !userProfile) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;