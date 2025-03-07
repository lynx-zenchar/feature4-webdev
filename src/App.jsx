import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AllTasksView from "./Components/AllTasksView";
import CalendarView from "./Components/CalendarView";
import TimelineView from "./Components/TimelineView";
import taskService from "./Services/taskService"; // Import your async service

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
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route
          path="/tasks"
          element={<AllTasksView tasks={tasks} addTask={() => {}} />}
        />
        <Route path="/calendar" element={<CalendarView tasks={tasks} />} />
        <Route path="/timeline" element={<TimelineView tasks={tasks} />} />
      </Routes>
    </Router>
  );
}

export default App;
