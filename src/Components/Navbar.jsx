//// filepath: ./Components/Navbar.jsx

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { checkUser, logoutUser } from "./Auth/AuthService";
import Parse from "../parseConfig";  // ← adjust path if needed

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = checkUser();

  // Only fetch the Parse user once (sync call)
  const currentUser = isAuthenticated ? Parse.User.current() : null;
  const firstName = currentUser?.get("firstName") || "";
  const lastName  = currentUser?.get("lastName")  || "";







  const handleLogout = async () => {
    await logoutUser();
    navigate("/auth"); // Redirect to auth page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/tasks">
          Project_Manager++
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/tasks">
                All Tasks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/calendar">
                Calendar View
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/timeline">
                Timeline View
              </NavLink>
            </li>
          </ul>

  
          {isAuthenticated && (// Displays name after login
            <span className="navbar-text me-3">
              Welcome, {firstName} {lastName}!
            </span>
          )}
          {!isAuthenticated && (
            <span className="navbar-text">
              Manage your projects efficiently!
            </span>
          )}


          <div className="ms-3">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="btn btn-outline-danger">
                Logout
              </button>
            ) : (
              <NavLink to="/auth" className="btn btn-outline-primary">
                Login / Register
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
