import React, { useState } from "react";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import Login from "./assets/components/Login.jsx";
import MainApp from "./MainApp";
import "./App.css";

function App() {
  // Aquí envolvemos la lógica principal con el AuthProvider
  return (
    <AuthProvider>
      <AppContent /> {/* Un componente que decide qué mostrar */}
    </AuthProvider>
  );
}

// Este componente usa el hook useAuth para decidir qué renderizar
function AppContent() {
  const { user } = useAuth(); // <-- Aquí consumes el contexto para saber si hay usuario logueado

  return (
    <div className="App">
      {user ? ( // Si 'user' existe (no es null), muestra la App Principal
        <MainApp />
      ) : (
        // Si no, muestra el Login
        <Login /> /* Login ya no necesita onLoginSuccess prop, usa useAuth */
      )}
    </div>
  );
}

export default App;
