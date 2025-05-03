// src/Components/Main/MainList.js
import React, { useState } from "react";

const MainList = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (t) => setTags(tags.filter((tag) => tag !== t));

  return (
    <div className="container mt-4">
      <hr />
      <h2>Main List</h2>
      <div className="mb-3">
        <label className="form-label">Tags</label>
        <div className="d-flex">
          <input
            className="form-control me-2"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Enter a tag"
          />
          <button className="btn btn-primary" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>
      </div>
      <div>
        {tags.map((tag) => (
          <span key={tag} className="badge bg-secondary me-1">
            {tag}{" "}
            <button
              className="btn-close btn-close-white btn-sm ms-1"
              onClick={() => handleRemoveTag(tag)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default MainList;
