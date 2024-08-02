// src/TaskManager.js
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import Modals from './Modals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contexts/AuthContext';
import '../css/TaskManager.css'; // Import the CSS file

const TaskManager = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Recupera o token do armazenamento local
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`; // Adiciona o token ao cabeçalho
      }
      const response = await fetch('http://localhost:2000/tasks', {
        headers,
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSaveTask = async (task, onSuccess) => {
    try {
      const token = localStorage.getItem('authToken'); // Recupera o token do armazenamento local
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`; // Adiciona o token ao cabeçalho
      }
      const method = editedTask ? 'PUT' : 'POST';
      const url = editedTask ? `http://localhost:2000/tasks/${editedTask.id}` : 'http://localhost:2000/tasks';
      await fetch(url, {
        method,
        headers,
        body: JSON.stringify(task)
      });
      fetchTasks();
      setEditedTask(null);
      setShowSuccessToast(true);
      if (onSuccess)
        onSuccess();
    } catch (error) {
      console.error('Error saving task:', error);
      setShowErrorModal(true);
    }
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Recupera o token do armazenamento local
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`; // Adiciona o token ao cabeçalho
      }
      await fetch(`http://localhost:2000/tasks/${taskToDelete}`, {
        method: 'DELETE',
        headers,
      });
      fetchTasks();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting task:', error);
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <a className="btn btn-link" href="http://localhost:3000/ChangePassword">Change Password</a> {/* Link to ChangePassword */}
        <button className="btn btn-link" onClick={logout}>Logout</button>
      </div>
      <div className="task-manager-container">
        <TaskForm onSave={handleSaveTask} editedTask={editedTask} />
        <hr />
        <TaskTable tasks={tasks} onEdit={setEditedTask} onDelete={handleDeleteClick} />

        <Modals
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={() => setShowDeleteModal(false)}
          handleConfirmDelete={handleConfirmDelete}
          showErrorModal={showErrorModal}
          handleCloseErrorModal={() => setShowErrorModal(false)}
          showSuccessToast={showSuccessToast}
          handleCloseSuccessToast={() => setShowSuccessToast(false)}
        />
      </div>
    </>
  );
};

export default TaskManager;
