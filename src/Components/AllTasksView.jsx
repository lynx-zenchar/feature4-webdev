//// filepath: ./Components/AllTasksView.jsx

import React, { useState } from "react";

function AllTasksView({ addTask, tasks, editTask, deleteTask }) {
  // State for adding a new task
  const [isAdding, setIsAdding] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [singleDate, setSingleDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tagInput, setTagInput] = useState(""); // <-- For new task tags

  // State for editing a task
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editSingleDate, setEditSingleDate] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  // NEW State for tag filtering
  const [filterTag, setFilterTag] = useState(""); // <-- For tag filter dropdown

  // Handle adding a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      taskName,
      date: singleDate || startDate,
      startDate: startDate || null,
      endDate: endDate || null,
      tags: tagInput.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
    };
    addTask(newTask);
    setTaskName("");
    setSingleDate("");
    setStartDate("");
    setEndDate("");
    setTagInput("");
    setIsAdding(false);
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditTaskName(task.taskName);
    setEditSingleDate(task.date || "");
    setEditStartDate(task.startDate || "");
    setEditEndDate(task.endDate || "");
  };

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

  const handleEditCancel = () => {
    setEditingTaskId(null);
    setEditTaskName("");
    setEditSingleDate("");
    setEditStartDate("");
    setEditEndDate("");
  };

  // Filter tasks based on selected tag
  const filteredTasks = filterTag
    ? tasks.filter(task => task.tags && task.tags.includes(filterTag))
    : tasks;

  //  Get unique tags for dropdown
  const uniqueTags = [...new Set(tasks.flatMap(task => task.tags || []))];

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

              {/* Tag Input */}
              <div className="mb-3">
                <label htmlFor="tagInput" className="form-label">Tags (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  id="tagInput"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="e.g. School, Urgent"
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
          {/* Add New Task button */}
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

          {/* Tag Filter Dropdown */}
          <div className="mb-3">
            <label htmlFor="filterTag" className="form-label">Filter by Tag</label>
            <select
              id="filterTag"
              className="form-select"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
            >
              <option value="">All</option>
              {uniqueTags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Render filtered tasks */}
          {filteredTasks.map((task) => (
            <div className="card mb-2" key={task.id}>
              <div className="card-body">
                {editingTaskId === task.id ? (
                  <form onSubmit={handleEditSubmit}>
                    {/* Editing form fields */}
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
                  <>
                    <h5 className="card-title">{task.taskName}</h5>
                    {task.date ? (
                      <p className="card-text">Date: {task.date}</p>
                    ) : (
                      <p className="card-text">
                        From: {task.startDate} To: {task.endDate}
                      </p>
                    )}
                    
                    {/* Tags */}
                    {task.tags && task.tags.length > 0 && (
                      <div className="mb-2">
                        {task.tags.map((tag, index) => (
                          <span key={index} className="badge bg-info me-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Edit and Delete Buttons */}
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
        </div>
      )}
    </div>
  );
}

export default AllTasksView;




