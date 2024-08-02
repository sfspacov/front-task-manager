// src/App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import TaskManager from './components/TaskManager';
import Login from './components/Login';
import PasswordReset from './components/ChangePassword'; // Import PasswordReset component
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('authToken');
  return isAuthenticated || token ? children : <Navigate to="/login" />;
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
        <Route path="/changePassword" element={<PasswordReset />} /> {/* Add PasswordReset route */}
      </Routes>
    </div>
  );
};

export default App;
