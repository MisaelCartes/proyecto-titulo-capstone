import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import validarRut from '../middlewares/validarRut';
import { useValidateRoleAndAccessToken } from '../middlewares/validateRoleAndAccessToken';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://127.0.0.1:8000'; // URL base de la API

export const FamilyRegister = () => {
  const initialFormState = {
    rut: '',
    rutMember: '',
    firstName: '',
    lastName: '',
    relationship: '',
    date_of_birth: '',
    email: '',
    phoneNumber: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [rut, setRut] = useState('');
  const token = localStorage.getItem('token');

  // Validar la autenticidad del usuario
  useValidateRoleAndAccessToken(['1', '2'], '/login');

  // Efecto para obtener y establecer el RUT del token
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setRut(decodedToken.rut);
      setFormData(prev => ({
        ...prev,
        rut: decodedToken.rut
      }));
    }
  }, [token]);

  // Función mejorada para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Función mejorada para validar teléfono chileno
  const validatePhone = (phone) => {
    const phoneRegex = /^(\+?56|0056)?(\s?)((9\d{8})|(2\d{7}))$/;
    return phoneRegex.test(phone);
  };

  // Función para formatear RUT
  const formatRut = (rut) => {
    if (!rut) return '';

    const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    if (cleanRut.length < 2) return cleanRut;

    const dv = cleanRut.slice(-1);
    const rutBody = cleanRut.slice(0, -1);
    return rutBody.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    const birthDate = new Date(formData.date_of_birth);

    if (!formData.rutMember) {
      newErrors.rutMember = 'RUT del miembro es requerido';
    } else if (!validarRut(formData.rutMember)) {
      newErrors.rutMember = 'RUT inválido';
    }

    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'Nombre es requerido';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Nombre debe tener al menos 2 caracteres';
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Apellido es requerido';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Apellido debe tener al menos 2 caracteres';
    }

    if (!formData.relationship?.trim()) {
      newErrors.relationship = 'Relación es requerida';
    }

    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Fecha de nacimiento es requerida';
    } else if (birthDate > today) {
      newErrors.date_of_birth = 'La fecha de nacimiento no puede ser futura';
    }

    if (!formData.email) {
      newErrors.email = 'Email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Teléfono es requerido';
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Formato de teléfono inválido (+569XXXXXXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatear RUT si es necesario
    if (name === 'rutMember') {
      formattedValue = formatRut(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const errorMessages = Object.values(errors).join('\n');
      Swal.fire({
        title: 'Error de Validación',
        text: 'Por favor, corrija los siguientes errores:\n' + errorMessages,
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/register/family/member/`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        await Swal.fire({
          title: '¡Éxito!',
          text: 'Miembro de la familia registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        // Limpiar el formulario después de un registro exitoso
        setFormData(initialFormState);
        setErrors({});
      }
    } catch (error) {
      console.error('Error:', error);

      let errorMessage = 'Error al registrar el miembro';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      await Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen w-full mt-8">
      <div className="max-w-3xl rounded-lg p-8 mx-auto bg-gray-800">
        <h2 className="mb-8 text-center text-2xl font-bold leading-9 text-white">
          Registra un miembro de la familia
        </h2>

        <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit}>
          {/* RUT Member */}
          <div>
            <label htmlFor="rutMember" className="block text-sm font-medium text-white">
              RUT del miembro
            </label>
            <div className="mt-2">
              <input
                id="rutMember"
                name="rutMember"
                type="text"
                placeholder="Ej: 12.345.678-9"
                value={formData.rutMember}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.rutMember && <p className="text-red-500 text-xs mt-1">{errors.rutMember}</p>}
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-white">
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Ingrese el nombre"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
          </div>

          {/* Apellido */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-white">
              Apellido
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Ingrese el apellido"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Relación */}
          <div>
            <label htmlFor="relationship" className="block text-sm font-medium text-white">
              Relación
            </label>
            <div className="mt-2">
              <select
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option value="" disabled>
                  Seleccione la relación
                </option>
                <option value="padre">Padre</option>
                <option value="madre">Madre</option>
                <option value="hermano/a">Hermano/a</option>
                <option value="esposo/a">Esposo/a</option>
                <option value="hijo/a">Hijo/a</option>
                <option value="conyuge">Cónyuge</option>
                <option value="pareja">Pareja</option>
                <option value="tio/a">Tío/a</option>
                <option value="primo/a">Primo/a</option>
                <option value="abuelo/a">Abuelo/a</option>
                <option value="otro">Otro</option>
              </select>
              {errors.relationship && <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>}
            </div>
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-white">
              Fecha de Nacimiento
            </label>
            <div className="mt-2">
              <input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.date_of_birth && <p className="text-red-500 text-xs mt-1">{errors.date_of_birth}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese el email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">
              Teléfono
            </label>
            <div className="mt-2">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Ej: +569XXXXXXXX"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
          </div>

          {/* Botón de envío */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className= "w-full rounded-md bg-indigo-600 py-2 px-3 text-white font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600">
              {isSubmitting ? 'Registrando...' : 'Registrar Miembro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};