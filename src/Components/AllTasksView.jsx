//// filepath: ./Components/AllTasksView.jsx

import React, { useState } from "react";

function AllTasksView({ addTask, tasks, editTask, deleteTask }) {
  // State for adding a new task
  const [isAdding, setIsAdding] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [singleDate, setSingleDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // State for editing a task
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editSingleDate, setEditSingleDate] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  // Handle adding a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      taskName,
      date: singleDate || startDate,
      startDate: startDate || null,
      endDate: endDate || null,
    };
    addTask(newTask);
    setTaskName("");
    setSingleDate("");
    setStartDate("");
    setEndDate("");
    setIsAdding(false);
  };

  // Begin editing a task by setting the editing state with its details
  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditTaskName(task.taskName);
    setEditSingleDate(task.date || "");
    setEditStartDate(task.startDate || "");
    setEditEndDate(task.endDate || "");
  };

  // Handle submitting an edited task
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: editingTaskId,
      taskName: editTaskName,
      date: editSingleDate || editStartDate,
      startDate: editStartDate || null,
      endDate: editEndDate || null,
    };
    editTask(updatedTask);
    setEditingTaskId(null);
    setEditTaskName("");
    setEditSingleDate("");
    setEditStartDate("");
    setEditEndDate("");
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditingTaskId(null);
    setEditTaskName("");
    setEditSingleDate("");
    setEditStartDate("");
    setEditEndDate("");
  };

  return (
    <div>
      {isAdding ? (
        // Form view for adding a new task
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">New Task</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Task Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Task Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={singleDate}
                  onChange={(e) => setSingleDate(e.target.value)}
                />
                <small className="form-text text-muted">
                  Leave empty if specifying a date range.
                </small>
              </div>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Task
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Display existing tasks
        <div>
          {tasks.length === 0 ? (
            <div
              className="card mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => setIsAdding(true)}
            >
              <div className="card-body d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0">Add a new task</h5>
                <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>＋</span>
              </div>
            </div>
          ) : (
            <>
              <div
                className="card mb-3"
                style={{ cursor: "pointer" }}
                onClick={() => setIsAdding(true)}
              >
                <div className="card-body d-flex align-items-center justify-content-between">
                  <h5 className="card-title mb-0">Add a new task</h5>
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>＋</span>
                </div>
              </div>
              {tasks.map((task) => (
                <div className="card mb-2" key={task.id}>
                  <div className="card-body">
                    {editingTaskId === task.id ? (
                      // Editing form for the selected task
                      <form onSubmit={handleEditSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Task Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editTaskName}
                            onChange={(e) => setEditTaskName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Task Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={editSingleDate}
                            onChange={(e) => setEditSingleDate(e.target.value)}
                          />
                          <small className="form-text text-muted">
                            Leave empty if specifying a date range.
                          </small>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Start Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={editStartDate}
                            onChange={(e) => setEditStartDate(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">End Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={editEndDate}
                            onChange={(e) => setEditEndDate(e.target.value)}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary ms-2"
                          onClick={handleEditCancel}
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      // Display task information with Edit and Delete buttons
                      <>
                        <h5 className="card-title">{task.taskName}</h5>
                        {task.date ? (
                          <p className="card-text">Date: {task.date}</p>
                        ) : (
                          <p className="card-text">
                            From: {task.startDate} To: {task.endDate}
                          </p>
                        )}
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEditClick(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AllTasksView;
