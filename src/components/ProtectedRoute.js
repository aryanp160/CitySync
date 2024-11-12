import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();

  // Check if the user is authenticated
  if (!user && !auth.currentUser) {
    // Redirect to login and pass the current location to return after login
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If the user is authenticated, render the children components
  return children;
};

export default ProtectedRoute;
