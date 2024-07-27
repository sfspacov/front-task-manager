// src/App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import TaskManager from './TaskManager';
import Login from './Login';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const { login } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />
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
