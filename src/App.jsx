// App.jsx
import React, { useEffect, useState } from "react";
import Parse from "./parseConfig"; 
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
    // Feature 6: LiveQuery Subscription (ON HOLD FOR NOW BC. LIVEQUERY VERIF.)
    /*


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


      const query = new Parse.Query("Task");
      query.equalTo("owner", Parse.User.current());
      
      const sub = Parse.liveQueryClient.subscribe(query);
      
      sub.on("create", (newObj) => {
        const t = {
          id: newObj.id,
          taskName: newObj.get("taskName"),
          date: newObj.get("date"),
          startDate: newObj.get("startDate"),
          endDate: newObj.get("endDate"),
          priority: newObj.get("priority")
        };
        setTasks(prev => [...prev, t]);
      });
      sub.on("update", (upd) => {
        setTasks(prev =>
          prev.map(t =>
            t.id === upd.id
              ? {
                  id: upd.id,
                  taskName: upd.get("taskName"),
                  date: upd.get("date"),
                  startDate: upd.get("startDate"),
                  endDate: upd.get("endDate"),
                  priority: upd.get("priority")
                }
              : t
          )
        );
      });
      sub.on("delete", (del) => {
        setTasks(prev => prev.filter(t => t.id !== del.id));
      });

      return () => sub.unsubscribe();
     */

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

      // initial load & periodic refresh
      fetchTasks();
      const intervalId = setInterval(fetchTasks, 5000);
      return () => clearInterval(intervalId);
 







  }, []);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error}</div>;

  // Feature 6: CRUD Handlers
  const addTask = async (task) => {
    const saved = await taskService.createTask(task);
    setTasks(prev => [...prev, {
      id: saved.id,
      ...task
      }]);
  };

  const editTask = async (task) => {
    await taskService.updateTask(task.id, task);
    setTasks(prev =>
      prev.map(t => (t.id === task.id ? { ...t, ...task } : t))
    );
  };

  const deleteTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Base URL redirects to /tasks */}
        <Route path="/" element={<Navigate to="/tasks" />} />

        {/* Protected Routes: Only accessible if authenticated */}
        <Route
          path="/tasks"
          element={// Feature 6: Fix Not adding/deleting/editing tasks
            <ProtectedRoute
              element={() =>
                <AllTasksView
                  tasks={tasks}
                  addTask={addTask}
                  editTask={editTask}
                  deleteTask={deleteTask}
                />
              }
            />

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
