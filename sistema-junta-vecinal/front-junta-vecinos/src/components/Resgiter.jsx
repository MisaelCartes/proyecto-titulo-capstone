import React, { useState } from 'react';
import axios from 'axios';
import validarRut from '../middlewares/validarRut';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const isValidCharacter = (value) => /^[A-Za-zÀ-ÿ\s]+$/.test(value); // Solo letras y espacios

// Expresión regular para números de teléfono chilenos (celulares)
const isValidChileanPhoneNumber = (phone) => /^9\d{8}$/.test(phone);

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: 'Jimmy Huste',
    lastName: 'Exantus',
    motherLastName: '',
    rut: '37560106-0',
    address: 'Santiago 123',
    password: '123456',
    phoneNumber: '987654321', 
    email: 'jimmy@gmail.com',
    role: 'MEMBER',
    photo: null,
    housingType: 'Casa',
  });

  const [errors, setErrors] = useState({}); // Para almacenar errores de validación
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] }); // Almacena el archivo seleccionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Limpiar errores anteriores

    // Validar campos
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "El nombre es obligatorio";
    else if (!isValidCharacter(formData.firstName)) newErrors.firstName = "El nombre solo puede contener letras.";
    else if (formData.firstName.length < 2 || formData.firstName.length > 30) newErrors.firstName = "El nombre debe tener entre 2 y 30 caracteres.";

    if (!formData.lastName) newErrors.lastName = "El apellido paterno es obligatorio";
    else if (!isValidCharacter(formData.lastName)) newErrors.lastName = "El apellido solo puede contener letras.";
    else if (formData.lastName.length < 2 || formData.lastName.length > 30) newErrors.lastName = "El apellido debe tener entre 2 y 30 caracteres.";

    if (formData.motherLastName && formData.motherLastName.length >= 2) {
      if (!isValidCharacter(formData.motherLastName)) {
        newErrors.motherLastName = "El apellido materno solo puede contener letras.";
      } else if (formData.motherLastName.length > 30) {
        newErrors.motherLastName = "El apellido materno debe tener como máximo 30 caracteres.";
      }
    }

    if (!formData.rut) newErrors.rut = "El RUT es obligatorio";
    else if (!validarRut(formData.rut)) newErrors.rut = "RUT inválido";

    if (!formData.address) newErrors.address = "La dirección es obligatoria";
    else if (formData.address.length < 5 || formData.address.length > 100) newErrors.address = "La dirección debe tener entre 5 y 100 caracteres.";

    if (!formData.phoneNumber) newErrors.phoneNumber = "El número de teléfono es obligatorio";
    else if (!isValidChileanPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "El número de teléfono chileno debe comenzar con 9 y tener 9 dígitos.";
    }

    if (!formData.email) newErrors.email = "El correo electrónico es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El correo electrónico no es válido.";

    if (!formData.password) newErrors.password = "La contraseña es obligatoria";
    else if (formData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres.";

    // Si hay errores, establecerlos en el estado y no enviar el formulario
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("data: ", formData);
    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', formData, {
        headers: {
          'Content-Type': 'application/json', // Cambié a 'application/json' ya que no se está enviando un archivo
        },
      });
      console.log('Respuesta del servidor:', response.data);
      
      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'El usuario ha sido registrado correctamente.',
      });
      
      navigate('/panel');

    } catch (error) {
      console.error('Error al registrarse:', error);
      
      // Mostrar mensaje de error
      if (error.response && error.response.data.rut) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: error.response.data.rut[0], // Mensaje de error del servidor
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: "Hubo un error al registrar al usuario. Inténtalo de nuevo más tarde.",
        });
      }

      setErrors({ submit: "Hubo un error al registrar al usuario. Inténtalo de nuevo más tarde." });
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8" style={{ backgroundColor: '#0D1A2D' }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src="/diversity.png" alt="Junta Vecinos" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Regístrate para una nueva cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-3xl">
        <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit}>
          {/* Primer layout */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder='Ingrese su nombre'
                value={formData.firstName}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-white">
              Apellido Paterno
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder='Ingrese su apellido paterno'
                value={formData.lastName}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="motherLastName" className="block text-sm font-medium leading-6 text-white">
              Apellido Materno
            </label>
            <div className="mt-2">
              <input
                id="motherLastName"
                name="motherLastName"
                type="text"
                placeholder='Opcional'
                value={formData.motherLastName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.motherLastName && <p className="text-red-500 text-xs mt-1">{errors.motherLastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="rut" className="block text-sm font-medium leading-6 text-white">
              RUT
            </label>
            <div className="mt-2">
              <input
                id="rut"
                name="rut"
                type="text"
                placeholder='Ingrese su rut (11111111-1)'
                value={formData.rut}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.rut && <p className="text-red-500 text-xs mt-1">{errors.rut}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-white">
              Dirección
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="text"
                placeholder='Ingrese la dirección de domicilio'
                value={formData.address}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-white">
              Teléfono
            </label>
            <div className="mt-2">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder='Ingrese tu número telefónico (987654321)'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Correo Electrónico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder='Ingrese tu correo electrónico'
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                placeholder='Ingrese su contraseña'
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-white">
              Foto (opcional)
            </label>
            <div className="mt-2">
              <input
                id="photo"
                name="photo"
                type="file"
                onChange={handleFileChange}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-indigo-600 ring-inset hover:bg-indigo-700 focus:outline focus:outline-2 focus:outline-indigo-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            >
              Crear cuenta
            </button>
            {errors.submit && <p className="text-red-500 text-xs mt-1">{errors.submit}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
