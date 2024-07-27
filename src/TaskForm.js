// src/TaskForm.js
import React, { useState, useEffect } from 'react';
import './TaskForm.css'; // Import the CSS file

const TaskForm = ({ onSave, editedTask }) => {
  const [task, setTask] = useState({ title: '', description: '', completed: false });

  useEffect(() => {
    if (editedTask) {
      setTask(editedTask);
    } else {
      setTask({ title: '', description: '', completed: false });
    }
  }, [editedTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === 'checkbox' ? checked : value });
  };

  const clearForm = () => setTask({ title: '', description: '', completed: false });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task, clearForm);
  };

  return (
    <div className="task-form-container">
      <div className="task-form-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="completed"
              name="completed"
              checked={task.completed}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="completed">Completed</label>
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-danger" onClick={clearForm}>Cancel</button>
            <button type="submit" className="btn btn-success">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
