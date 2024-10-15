import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate(); 

  const handleRutChange = (e) => {
    setRut(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setLoginMessage('');
    setErrors({});

    if (!rut) {
      newErrors.rut = 'El RUT es requerido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/login/', {
          rut: rut,
          password
        });

        console.log('Respuesta del servidor:', response.data);

        if (response.data && response.data.token) {
          // Almacenar el token en el localStorage
          localStorage.setItem('token', response.data.token);
          setLoginMessage('Inicio de sesión exitoso');
          navigate('/panel'); // Redirigir al panel u otra página después de iniciar sesión
        } else {
          setLoginMessage('Error: No se recibió un token válido del servidor.');
        }
        
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        if (error.response) {
          if (error.response.status === 401) {
            setLoginMessage('RUT o contraseña incorrectos. Por favor, verifica tus credenciales.');
          } else {
            setLoginMessage('Error en el servidor. Por favor, intenta más tarde.');
          }
        } else if (error.request) {
          setLoginMessage('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
        } else {
          setLoginMessage('Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.');
        }
      }
    }
  };

  const handleCreateAccount = () => {
    console.log('Redirigiendo a la página de creación de cuenta...');
    navigate('/panel');
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8" style={{ backgroundColor: '#0D1A2D' }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src="/diversity.png" alt="Junta Vecinos" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Inicia sesión en tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="rut" className="block text-sm font-medium leading-6 text-white">
              RUT
            </label>
            <div className="mt-2">
              <input
                id="rut"
                name="rut"
                type="text"
                autoComplete="rut"
                value={rut}
                onChange={handleRutChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.rut && <p className="mt-2 text-sm text-red-600">{errors.rut}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          {loginMessage && (
            <div className={`p-4 rounded-md ${loginMessage.includes('exitoso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {loginMessage}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <span className="text-white">¿No tienes una cuenta? </span>
          <span onClick={handleCreateAccount} className="cursor-pointer text-blue-500 hover:underline">
            Créala aquí
          </span>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#0D1A2D] px-2 text-white">o inicia sesión con</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Google
              </button>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Clave Única
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}