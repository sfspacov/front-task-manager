// src/App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import TaskManager from './components/TaskManager';
import Login from './components/Login';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem('authToken');
  const { isAuthenticated } = useAuth();
  if (isAuthenticated)
    token = null
  return isAuthenticated || token ? children : <Navigate to="/login" />;
};

const App = () => {
  const { login } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login onLogin={login} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TaskManager />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
