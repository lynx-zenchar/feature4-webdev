// src/App.jsx (Feature4 updated)
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AllTasksView from "./Components/AllTasksView";
import CalendarView from "./Components/CalendarView";
import TimelineView from "./Components/TimelineView";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route
          path="/tasks"
          element={
            <AllTasksView
              tasks={tasks}
              addTask={addTask}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          }
        />
        <Route path="/calendar" element={<CalendarView tasks={tasks} />} />
        <Route path="/timeline" element={<TimelineView tasks={tasks} />} />
      </Routes>
    </Router>
  );
}

export default App;


