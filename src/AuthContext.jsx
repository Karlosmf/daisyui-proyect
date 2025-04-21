// src/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// 1. Crea el Contexto
const AuthContext = createContext(null); // Valor por defecto es null

// 2. Crea el Provider
export const AuthProvider = ({ children }) => {
  // Aquí manejas el estado del usuario, inicialmente null (no logueado)
  const [user, setUser] = useState(null);

  // Función para simular el login y guardar los datos del usuario
  const login = (userData) => {
    // Aquí normalmente obtendrías userData de una respuesta de API exitosa
    setUser(userData);
    // Opcional: Guardar en localStorage para persistencia (ver notas anteriores)
  };

  // Función para simular el logout
  const logout = () => {
    setUser(null);
    // Opcional: Limpiar localStorage
  };

  return (
    // El Provider envuelve a los hijos y les pasa el estado y las funciones
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};