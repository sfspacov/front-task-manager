import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import Modals from './Modals';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [editedTaskId, setEditedTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:2000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSaveTask = async (task) => {
    try {
      const method = editedTaskId ? 'PUT' : 'POST';
      const url = editedTaskId ? `http://localhost:2000/tasks/${editedTaskId}` : 'http://localhost:2000/tasks';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(task).toString()
      });
      fetchTasks();
      setEditedTaskId(null);
      document.getElementById('successToast').classList.add('show');
    } catch (error) {
      console.error('Error saving task:', error);
      document.getElementById('errorModal').classList.add('show');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:2000/tasks/${taskId}`, { method: 'DELETE' });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      document.getElementById('errorModal').classList.add('show');
    }
  };

  const handleEditTask = async (taskId) => {
    setEditedTaskId(taskId);
    try {
      const response = await fetch(`http://localhost:2000/tasks/${taskId}`);
      const task = await response.json();
      document.getElementById('title').value = task.title;
      document.getElementById('description').value = task.description;
      document.getElementById('completed').checked = task.completed;
    } catch (error) {
      console.error('Error fetching task for editing:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Task</h2>
      <TaskForm onSave={handleSaveTask} editedTaskId={editedTaskId} />
      <hr />
      <h2>All Tasks</h2>
      <TaskTable tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      <Modals />
    </div>
  );
};

export default TaskManager;
