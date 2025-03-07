//// filepath: ./Components/AllTasksView.jsx

import React, { useState } from "react";

function AllTasksView({ addTask, tasks }) {
  // Local component state to manage form view and input values
  const [isAdding, setIsAdding] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [singleDate, setSingleDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handle form submission for adding a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      taskName,
      date: singleDate || startDate,
      startDate: startDate || null,
      endDate: endDate || null,
    };
    // Pass new task to parent component
    addTask(newTask);
    // Reset form fields and collapse the form
    setTaskName("");
    setSingleDate("");
    setStartDate("");
    setEndDate("");
    setIsAdding(false);
  };

  return (
    <div>
      {isAdding ? (
        // Form view for adding new tasks with various input elements
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">New Task</h5>
            <form onSubmit={handleSubmit}>
              {/* Task Name input */}
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
              {/* Single Date input */}
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
              {/* Date Range inputs */}
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
              {/* Submit and Cancel buttons with event bindings */}
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
        // Display view: Either initial "add" card or list of tasks if already added
        <div>
          {tasks.length === 0 ? (
            <div
              className="card mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => setIsAdding(true)}
            >
              <div className="card-body d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0">Add a new task</h5>
                <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  ＋
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* Card to add a new task */}
              <div
                className="card mb-3"
                style={{ cursor: "pointer" }}
                onClick={() => setIsAdding(true)}
              >
                <div className="card-body d-flex align-items-center justify-content-between">
                  <h5 className="card-title mb-0">Add a new task</h5>
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    ＋
                  </span>
                </div>
              </div>
              {/* List of tasks */}
              {tasks.map((task) => (
                <div className="card mb-2" key={task.id}>
                  <div className="card-body">
                    <h5 className="card-title">{task.taskName}</h5>
                    {task.date ? (
                      <p className="card-text">Date: {task.date}</p>
                    ) : (
                      <p className="card-text">
                        From: {task.startDate} To: {task.endDate}
                      </p>
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
