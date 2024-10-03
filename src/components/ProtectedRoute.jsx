import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Import the auth helper

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login
    return <Navigate to="/" replace />;
  }
  
  return children;  // If authenticated, render the child components
};

export default ProtectedRoute;
