//// filepath: ./Components/Navbar.jsx

import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/tasks">
          Task Manager
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
          <span className="navbar-text">Manage your tasks efficiently!</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

