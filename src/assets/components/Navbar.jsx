import React from "react";
import { useAuth } from "../../AuthContext.jsx";
import { BarsArrowDownIcon } from "@heroicons/react/24/solid";
import { BoltIcon } from "@heroicons/react/24/solid";
import { PowerIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const { user, logout } = useAuth(); // Usa el hook para obtener user y logout
  if (!user) {
    return null; // O redirigir al login si no hay usuario
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <BarsArrowDownIcon className="h-6 opacity-50" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          Inno
          <BoltIcon className="h-6 opacity-50 animate-ping" />
          Design
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end items-center align-middle">
        <button
          onClick={logout} // Llama a la función logout del contexto
          className="btn btn-primary"
        >
          {user.username} <PowerIcon className="h-6 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
