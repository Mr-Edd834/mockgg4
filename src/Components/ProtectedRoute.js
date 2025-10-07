import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import authService from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Check if token exists
      if (!authService.isAuthenticated()) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Verify token with backend
      const result = await authService.verifyToken();
      setIsAuthenticated(result.valid);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
