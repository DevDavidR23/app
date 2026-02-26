import React from 'react';
import Button from '../components/button.jsx';
import logImg from "../assets/login_pictures/log.png";
export default function Login() {
  return (
    /* Contenedor principal centrado */
    <div className="min-h-screen flex items-center justify-center bg-sky-100 p-6">
      {/* Card principal */}
      <div className="bg-white shadow-lg rounded-2xl flex flex-col md:flex-row-reverse max-w-5xl w-full min-h-[60vh] overflow-hidden">
        {/* Formulario (derecha) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold mb-6 text-center">Bienvenido</h1>

          <form className="space-y-4">
            <div>
              <label htmlFor="user" className="block mb-1 text-sm font-medium">
                Usuario
              </label>
              <input
                id="user"
                name="user"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="pass" className="block mb-1 text-sm font-medium">
                Contraseña
              </label>
              <input
                id="pass"
                name="pass"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <Button type="submit">Ingresar</Button>
          </form>
        </div>


        <div className="w-full md:w-1/2 relative overflow-hidden bg-gray-100">
          <img
            src={logImg}
            alt="Ilustración aprendizaje inglés"
            className="absolute inset-0 w-full h-full object-cover object-top-left"
          />

        </div>
      </div>
    </div>
  );
}
