// src/Login.js
import React, { useState } from "react";
import { useAuth } from "../../AuthContext"; // Asegúrate de que la ruta sea correcta
import {
  UserIcon,
  LockClosedIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid"; // Importa los iconos

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar que la solicitud está en curso

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    // Usamos async porque fetch es asíncrono
    event.preventDefault();

    setError(""); // Limpia errores anteriores
    setIsLoading(true); // Indica que está cargando

    try {
      // **1. Realizar la solicitud POST al backend**
      const response = await fetch("http://localhost:3000/login.php", {
        // <-- ¡AJUSTA LA URL SI ES NECESARIO!
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Indicamos que enviamos JSON
        },
        body: JSON.stringify({
          // Convertimos el objeto a una cadena JSON para enviarlo
          username: username,
          password: password,
        }),
      });

      // **2. Procesar la respuesta**
      if (!response.ok) {
        // Si la respuesta no es OK (ej. 401, 400, 500), leer el error del cuerpo
        const errorData = await response.json(); // Intentar leer el JSON de error
        throw new Error(errorData.error || `Error HTTP: ${response.status}`); // Lanzar un error con el mensaje del backend o el estado HTTP
      }

      // Si la respuesta es OK (status 200), leer el JSON de éxito
      const userDataArray = await response.json(); // Esperamos un array como [{...}]

      // **3. Validar el formato del JSON recibido**
      if (
        !Array.isArray(userDataArray) ||
        userDataArray.length === 0 ||
        !userDataArray[0].username ||
        !userDataArray[0].role ||
        !userDataArray[0].token
      ) {
        throw new Error("Formato de respuesta del servidor inesperado.");
      }

      const userData = userDataArray[0]; // Obtenemos el primer (y único) objeto del array

      // **4. Llamar a la función login del Contexto con los datos del usuario**
      login(userData); // Pasamos el objeto completo al contexto (incluye token)
    } catch (err) {
      // **5. Manejar errores (red, servidor, etc.)**
      console.error("Error durante el login:", err);
      setError(err.message || "Error al intentar iniciar sesión."); // Mostrar el mensaje de error al usuario
    } finally {
      setIsLoading(false); // Siempre desactiva el estado de carga
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="hero min-h-screen">
        <div className="card card-dash bg-base-100/80 shadow">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            {/* Muestra el error si existe */}
            {error && (
              <div role="alert" className="alert alert-error mt-4">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Inputs de Username y Password (igual que antes) */}
              <label className="input input-bordered flex items-center gap-2 mt-4">
                {" "}
                {/* Clases de DaisyUI input */}
                <UserIcon className="h-5 w-5 opacity-70" />
                <input
                  type="text"
                  className="grow" // DaisyUI class
                  placeholder="Username"
                  required
                  // ... (otros atributos de validación) ...
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              {/* Puedes quitar las hints con pattern si usas validación js */}
              {/* <p className="validator-hint">...</p> */}

              <label className="input input-bordered flex items-center gap-2 mt-4">
                {" "}
                {/* Clases de DaisyUI input */}
                <LockClosedIcon className="h-5 w-5 opacity-70" />
                <input
                  type="password"
                  className="grow" // DaisyUI class
                  placeholder="Password"
                  required
                  // ... (otros atributos de validación) ...
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {/* Puedes quitar las hints con pattern si usas validación js */}
              {/* <p className="validator-hint hidden">...</p> */}

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary w-full mt-4"
                  disabled={isLoading} // Deshabilita el botón mientras carga
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span> // Spinner de carga de DaisyUI
                  ) : (
                    <PaperAirplaneIcon className="h-6" />
                  )}
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
