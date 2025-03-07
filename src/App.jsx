// src/App.jsx (Feature4 updated)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AllTasksView from "./Components/AllTasksView";
import CalendarView from "./Components/CalendarView";
import TimelineView from "./Components/TimelineView";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar stays visible on all pages */}
      <Routes>
        <Route path="/tasks" element={<AllTasksView />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/timeline" element={<TimelineView />} />
      </Routes>
    </Router>
  );
}

export default App;

