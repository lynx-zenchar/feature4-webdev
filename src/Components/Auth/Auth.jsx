// Auth/Auth.js
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";

// AuthModule is the landing page for authentication,
// providing links to both registration and login forms.
const AuthModule = () => {
  const navigate = useNavigate();

  // Redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-center bg-primary text-white">
              <h3>Welcome to Task Manager</h3>
            </div>
            <div className="card-body">
              <p className="text-center">Please choose an option below:</p>
              <div className="d-grid gap-3">
                {/* Link to Registration */}
                <Link to="/auth/register" className="btn btn-success btn-lg">
                  Register
                </Link>
                {/* Link to Login */}
                <Link to="/auth/login" className="btn btn-outline-primary btn-lg">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModule;
