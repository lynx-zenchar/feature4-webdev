// src/Components/AllTasksView.jsx
import React, { useState } from "react";

function AllTasksView({ addTask, editTask, deleteTask, tasks }) {
  // — form state for new task
  const [isAdding, setIsAdding] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [singleDate, setSingleDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tagInput, setTagInput] = useState("");

  // — form state for editing
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editSingleDate, setEditSingleDate] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editTagsInput, setEditTagsInput] = useState("");

  // — tag filter
  const [filterTag, setFilterTag] = useState("");

  // — sort by priority
  const priorityOrder = { High: 1, Medium: 2, Low: 3, Discard: 4 };
  const sortedTasks = [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  // — only show tasks matching filterTag (or all)
  const filteredTasks = filterTag
    ? sortedTasks.filter((t) => t.tags?.includes(filterTag))
    : sortedTasks;

  // — derive unique tags for the filter dropdown
  const uniqueTags = [...new Set(tasks.flatMap((t) => t.tags || []))];

  // — badge-color helper
  const getBadge = (p) =>
    ({ High: "danger", Medium: "warning", Low: "success", Discard: "secondary" }[p] ||
      "secondary");

  // — add-task submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      taskName,
      date: singleDate || startDate,
      startDate: startDate || null,
      endDate: endDate || null,
      priority,
      tags: tagInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    });
    // reset form
    setTaskName("");
    setSingleDate("");
    setStartDate("");
    setEndDate("");
    setPriority("Medium");
    setTagInput("");
    setIsAdding(false);
  };

  // — begin editing
  const handleEditClick = (t) => {
    setEditingTaskId(t.id);
    setEditTaskName(t.taskName);
    setEditSingleDate(t.date || "");
    setEditStartDate(t.startDate || "");
    setEditEndDate(t.endDate || "");
    setEditPriority(t.priority);
    setEditTagsInput((t.tags || []).join(", "));
  };

  // — submit edits
  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTask({
      id: editingTaskId,
      taskName: editTaskName,
      date: editSingleDate || editStartDate,
      startDate: editStartDate || null,
      endDate: editEndDate || null,
      priority: editPriority,
      tags: editTagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    });
    setEditingTaskId(null);
  };

  // — cancel edit
  const handleEditCancel = () => {
    setEditingTaskId(null);
  };

  return (
    <div>
      {isAdding ? (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">New Task</h5>
            <form onSubmit={handleSubmit}>
              {/* name, date, start/end identical to before */}
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
              {/* singleDate, startDate, endDate… */}
              {/* READDED: single‐date vs. date‐range */}
              <div className="mb-3">
                <label className="form-label">Task Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={singleDate}
                  onChange={e => setSingleDate(e.target.value)}
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
                  onChange={e => setStartDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                  <option>Discard</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Tags (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
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
        <>
          {/* “Add new task” card */}
          <div
            className="card mb-3 bg-success text-white"
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

          {/* Tag filter */}
          <div className="mb-3">
            <label className="form-label">Filter by Tag</label>
            <select
              className="form-select"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
            >
              <option value="">All</option>
              {uniqueTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Render tasks */}
          {filteredTasks.map((task) => (
            <div className="card mb-2" key={task.id}>
              <div className="card-body">
                {editingTaskId === task.id ? (
                  <form onSubmit={handleEditSubmit}>
                    {/* same fields as add, but bound to edit… */}
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
                    {/* …date fields omitted for brevity… */}
                    {/* READDED: single‐date vs. date‐range (editing) */}
                    <div className="mb-3">
                      <label className="form-label">Task Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={editSingleDate}
                        onChange={e => setEditSingleDate(e.target.value)}
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
                        onChange={e => setEditStartDate(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={editEndDate}
                        onChange={e => setEditEndDate(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select
                        className="form-select"
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                        <option>Discard</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tags</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editTagsInput}
                        onChange={(e) => setEditTagsInput(e.target.value)}
                        placeholder="e.g. School, Urgent"
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
                    <h5 className="card-title">
                      {task.taskName}{" "}
                      <span className={`badge bg-${getBadge(task.priority)}`}>
                        {task.priority}
                      </span>
                    </h5>

                    {/* ← Date or range display */}
                    {task.date ? (
                      <p className="card-text">Date: {task.date}</p>
                    ) : (
                      <p className="card-text">
                        From: {task.startDate} To: {task.endDate}
                      </p>
                    )}


                    {/* date / range display as before… */}
                    {/* tags display */}
                    {task.tags?.length > 0 && (
                      <div className="mb-2">
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="badge bg-info me-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
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
  );
}

export default AllTasksView;
