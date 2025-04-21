import React from "react";
import { useAuth } from "./AuthContext.jsx";
import Navbar from "./assets/components/Navbar.jsx";

const MainApp = () => {
  const { user } = useAuth();

  if (!user) {
    // Esto no debería pasar si el renderizado condicional en App.js funciona bien,
    // pero es buena práctica manejar el caso por si acaso.
    return null; // O redirigir al login
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <h1 className="text-4xl font-bold text-white">
        ¡Bienvenido a la Aplicación!
      </h1>
      <p className="mt-4 text-lg text-gray-200">
        Has iniciado sesión correctamente.
      </p>
      {/* Aquí el resto de la aplicación */}
    </div>
  );
};

export default MainApp;
