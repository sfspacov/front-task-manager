import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import Modals from './Modals';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

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

  const handleSaveTask = async (task, onSuccess) => {
    try {
      const method = editedTaskId ? 'PUT' : 'POST';
      const url = editedTaskId ? `http://localhost:2000/tasks/${editedTaskId}` : 'http://localhost:2000/tasks';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      fetchTasks();
      setEditedTaskId(null);
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
      <TaskForm onSave={handleSaveTask} editedTaskId={editedTaskId} />
      <hr />
      <TaskTable tasks={tasks} onEdit={setEditedTaskId} onDelete={handleDeleteClick} />
      
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
