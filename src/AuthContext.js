// src/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Criação do contexto de autenticação
const AuthContext = createContext();

// Hook para facilitar o uso do contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token) => {
    // Salvar o token em localStorage ou em cookies
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remover o token de localStorage ou cookies
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
