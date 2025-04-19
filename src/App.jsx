import React, { useState } from "react";
import Login from "./assets/components/Login.jsx";
import MainApp from "./MainApp";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para saber si el usuario está logueado

  // Esta función se la pasaremos al componente Login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Cambia el estado a true cuando el login es exitoso
    // En una aplicación real, aquí podrías guardar un token en localStorage
    // y redirigir usando React Router DOM (ver notas al final)
  };

  // Podrías añadir una función para cerrar sesión si quieres
  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   // Limpiar token de localStorage si lo usaste
  // };

  return (
    <div className="App">
      {isLoggedIn ? (
        // Si isLoggedIn es true, muestra la App Principal
        <MainApp />
      ) : (
        // Si no, muestra el formulario de Login y le pasa la función para avisar del éxito
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
