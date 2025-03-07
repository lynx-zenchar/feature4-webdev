//// filepath: ./Components/Navbar.jsx

import React from "react";

function Navbar({ activeTab, setActiveTab }) {
  // TODO: Enhance navbar responsiveness for smaller screens if needed
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Task Manager
        </a>
        {/* Toggler for collapsing navbar on smaller screens */}
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
          {/* Navbar items with event bindings */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${
                  activeTab === "all" ? "active" : ""
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Tasks
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${
                  activeTab === "calendar" ? "active" : ""
                }`}
                onClick={() => setActiveTab("calendar")}
              >
                Calendar View
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${
                  activeTab === "timeline" ? "active" : ""
                }`}
                onClick={() => setActiveTab("timeline")}
              >
                Timeline View
              </button>
            </li>
          </ul>
          <span className="navbar-text">Manage your tasks efficiently!</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
