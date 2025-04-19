import React, { useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const Login = ({ onLoginSuccess }) => {
  // Recibe la función onLoginSuccess como prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para mostrar errores

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    if (username === "admin" && password === "Admin-123") {
      setError(""); // Limpia el mensaje de error
      onLoginSuccess(); // Llama a la función onLoginSuccess
    } else {
      setError("Credenciales incorrectas"); // Muestra el mensaje de error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="hero min-h-screen">
        <div className="card card-dash bg-base-100/80 shadow">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            {error && ( // Muestra el error solo si existe
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <form onSubmit={handleSubmit}>
              <label className="input validator">
                <UserIcon className="h-6 opacity-50" />
                <input
                  type="input"
                  required
                  placeholder="Username"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minlength="3"
                  maxlength="30"
                  title="Only letters, numbers or dash"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Actualiza el estado cuando cambia el input
                />
              </label>
              <p className="validator-hint">
                Must be 3 to 30 characters
                <br />
                containing only letters, numbers or dash
              </p>
              <label className="input validator">
                <LockClosedIcon className="h-6 opacity-50" />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  minlength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Actualiza el estado cuando cambia el input
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>

              <div className="card-actions justify-end">
                <button className="btn btn-primary w-full mt-4">
                  <PaperAirplaneIcon className="h-6" />
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
