// ProtectedRoute/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";

/* Previous Version before implementing refresh of 5 secs Apr 28, 1:03 am

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


 */

/** NEW:
 * Now expects `element` to be a JSX node,
 * so it won’t remount its children on each render.
 */
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = checkUser();
  return isAuthenticated ? element : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
