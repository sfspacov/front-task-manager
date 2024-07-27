import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import Modals from './Modals';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskManager = () => {
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
      debugger
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
        debugger
      const method = editedTask ? 'PUT' : 'POST';
      const url = editedTask ? `http://localhost:2000/tasks/${editedTask.id}` : 'http://localhost:2000/tasks';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
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
      await fetch(`http://localhost:2000/tasks/${taskToDelete}`, {
        method: 'DELETE'
      });
      fetchTasks();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting task:', error);
      setShowErrorModal(true);
    }
  };

  return (
    <div className="container mt-5">
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
  );
};

export default TaskManager;
