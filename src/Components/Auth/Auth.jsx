// Auth/Auth.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";

// AuthModule is the landing page for authentication,
// providing links to both registration and login forms.
const AuthModule = () => {
  const navigate = useNavigate();

  // redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);
  
  return (
    <div>
      {/* Link to Registration */}
      <Link to="/auth/register">
        <button>Register</button>
      </Link>
      <br />
      <br />
      {/* Link to Login */}
      <Link to="/auth/login">
        <button>Login</button>
      </Link>
      {/* Future work: Add more styling and animations */}
    </div>
  );
};

export default AuthModule;

