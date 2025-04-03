// ProtectedRoute/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";

const ProtectedRoute = ({ element: Component }) => {
  // Log the current authentication status for debugging
  const isAuthenticated = checkUser();
  console.log("ProtectedRoute: isAuthenticated =", isAuthenticated);

  if (isAuthenticated) {
    return <Component />;
  } else {
    console.log("User not authenticated. Redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }
};

export default ProtectedRoute;

