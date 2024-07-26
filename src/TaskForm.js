import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, editedTaskId }) => {
  const [task, setTask] = useState({ title: '', description: '', completed: false });

  useEffect(() => {
    if (editedTaskId) {
      // Fetch task data for editing
    } else {
      setTask({ title: '', description: '', completed: false });
    }
  }, [editedTaskId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input type="text" className="form-control" id="title" name="title" value={task.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea className="form-control" id="description" name="description" value={task.description} onChange={handleChange} rows="3" required></textarea>
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="completed" name="completed" checked={task.completed} onChange={handleChange} />
        <label className="form-check-label" htmlFor="completed">Completed</label>
      </div>
      <div className="text-center">
        <button type="button" className="btn btn-danger" onClick={() => setTask({ title: '', description: '', completed: false })}>Cancel</button>
        <button type="submit" className="btn btn-success">Save</button>
      </div>
    </form>
  );
};

export default TaskForm;