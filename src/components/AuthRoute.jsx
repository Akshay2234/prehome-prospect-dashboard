// AuthRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

// This function checks if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

const AuthRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/auth" />;
  }

  // Otherwise, render the requested page
  return children;
};

export default AuthRoute;
