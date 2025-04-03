// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AllTasksView from "./Components/AllTasksView";
import CalendarView from "./Components/CalendarView";
import TimelineView from "./Components/TimelineView";
import taskService from "./Services/taskService"; // Import your async service

// Import Auth components and ProtectedRoute
import AuthModule from "./Components/Auth/Auth";
import AuthLogin from "./Components/Auth/AuthLogin";
import AuthRegister from "./Components/Auth/AuthRegister";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load asynchronous data when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error}</div>;

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Base URL redirects to /tasks */}
        <Route path="/" element={<Navigate to="/tasks" />} />

        {/* Protected Routes: Only accessible if authenticated */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute element={() => <AllTasksView tasks={tasks} addTask={() => {}} />} />
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute element={() => <CalendarView tasks={tasks} />} />
          }
        />
        <Route
          path="/timeline"
          element={
            <ProtectedRoute element={() => <TimelineView tasks={tasks} />} />
          }
        />

        {/* Authentication Routes */}
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/register" element={<AuthRegister />} />

        {/* Fallback: redirect unknown routes to /tasks */}
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  );
}

export default App;
