// filepath: ./App.jsx

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AllTasksView from "./Components/AllTasksView";
import CalendarView from "./Components/CalendarView";
import TimelineView from "./Components/TimelineView";
import taskService from "./Services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // 🔥 Updated addTask that saves to Parse and reloads tasks
  const addTask = async (newTask) => {
    try {
      await taskService.createTask(newTask);
      const updatedTasks = await taskService.getTasks(); // Refresh tasks
      setTasks(updatedTasks);
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error}</div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route
          path="/tasks"
          element={<AllTasksView tasks={tasks} addTask={addTask} />}
        />
        <Route path="/calendar" element={<CalendarView tasks={tasks} />} />
        <Route path="/timeline" element={<TimelineView tasks={tasks} />} />
      </Routes>
    </Router>
  );
}

export default App;
