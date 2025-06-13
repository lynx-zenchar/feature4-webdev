// App.jsx
import React, { useEffect, useState } from "react";
import Parse from "./parseConfig";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import AllTasksView from "./Components/AllTasksView";
import CalendarView from "./Components/CalendarView";
import TimelineView from "./Components/TimelineView";

// << Added missing imports >>
import AuthModule from "./Components/Auth/Auth";
import AuthLogin from "./Components/Auth/AuthLogin";
import AuthRegister from "./Components/Auth/AuthRegister";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

import taskService from "./Services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = Parse.User.current();
    if (!user) {
      setLoading(false); // Added june 12, 2025
      return;
    }

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

    // initial fetch
    fetchTasks();

    // LiveQuery subscription for owner OR shared tasks
    const ownedQuery = new Parse.Query("Task");
    ownedQuery.equalTo("owner", user);
    const sharedQuery = new Parse.Query("Task");
    sharedQuery.equalTo("sharedWith", user);
    const mainQuery = Parse.Query.or(ownedQuery, sharedQuery);

    const subscription = Parse.liveQueryClient.subscribe(mainQuery);
    subscription.on("create", (newObj) => {
      const t = {
        id: newObj.id,
        taskName: newObj.get("taskName"),
        date: newObj.get("date"),
        startDate: newObj.get("startDate"),
        endDate: newObj.get("endDate"),
        priority: newObj.get("priority"),
        tags: newObj.get("tags") || [],
        sharedWith: newObj.get("sharedWith")?.map((u) => u.get("email")) || [],
      };
      setTasks((prev) => [...prev, t]);
    });
    subscription.on("update", (upd) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === upd.id
            ? {
                id: upd.id,
                taskName: upd.get("taskName"),
                date: upd.get("date"),
                startDate: upd.get("startDate"),
                endDate: upd.get("endDate"),
                priority: upd.get("priority"),
                tags: upd.get("tags") || [],
                sharedWith: upd.get("sharedWith")?.map((u) => u.get("email")) || [],
              }
            : t
        )
      );
    });
    subscription.on("delete", (del) => {
      setTasks((prev) => prev.filter((t) => t.id !== del.id));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error}</div>;

  // CRUD Handlers
  const addTask = async ({ shareWithEmails = [], ...taskData }) => {
    const saved = await taskService.createTask(taskData);
    setTasks((prev) => [
      ...prev,
      { id: saved.id, ...taskData, sharedWith: [] },
    ]);

    for (let email of shareWithEmails) {
      await taskService.shareTask(saved.id, email.trim());
    }
  };

  const editTask = async ({ id, shareWithEmails = [], ...fields }) => {
    await taskService.updateTask(id, fields);

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...fields }
          : t
      )
    );

    for (let email of shareWithEmails) {
      try {
        await taskService.shareTask(id, email.trim());
      } catch (err) {
        console.warn(`Could not share with ${email}:`, err.message);
      }
    }
  };

  const deleteTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const shareTask = async (id, email) => {
    try {
      await taskService.shareTask(id, email);
      alert(`Task shared with ${email}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute
              element={
                <AllTasksView
                  tasks={tasks}
                  addTask={addTask}
                  editTask={editTask}
                  deleteTask={deleteTask}
                  shareTask={shareTask}
                />
              }
            />
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute element={<CalendarView tasks={tasks} />} />
          }
        />

        <Route
          path="/timeline"
          element={
            <ProtectedRoute element={<TimelineView tasks={tasks} />} />
          }
        />

        {/* Authentication */}
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/register" element={<AuthRegister />} />

        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  );
}

export default App;
