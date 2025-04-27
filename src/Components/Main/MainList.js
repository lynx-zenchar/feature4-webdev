import React, { useState } from "react"; // <-- make sure useState is imported

const MainList = () => {
  // State
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Handlers
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput(""); // Clear the input
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="container mt-4">
      <hr />
      <h2>This is the main list parent component.</h2>

      {/* TAG INPUT SECTION */}
      <div className="mb-3">
        <label htmlFor="tagInput" className="form-label">Tags</label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            id="tagInput"
            value={tagInput}
            onChange={handleTagInputChange}
            placeholder="Enter a tag and click Add"
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddTag}
          >
            Add Tag
          </button>
        </div>
      </div>

      {/* Display tags */}
      <div className="mb-3">
        {tags.map((tag, index) => (
          <span key={index} className="badge bg-secondary me-1">
            {tag}
            <button
              type="button"
              className="btn-close btn-close-white btn-sm ms-2"
              aria-label="Close"
              onClick={() => handleRemoveTag(tag)}
            ></button>
          </span>
        ))}
      </div>

    </div>
  );
};

export default MainList;
