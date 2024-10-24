import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

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

  // Función mejorada para validar RUT chileno
  const validateRut = (rut) => {
    if (!rut) return false;
    
    // Remover guiones y puntos
    const rutClean = rut.replace(/[.-]/g, '').toUpperCase();
    if (!/^[0-9]{1,8}[0-9K]$/.test(rutClean)) return false;

    const dv = rutClean.slice(-1);
    const rutNumber = parseInt(rutClean.slice(0, -1), 10);
    
    let sum = 0;
    let multiplier = 2;

    // Calcular dígito verificador
    for (let i = String(rutNumber).split('').reverse().join('').length - 1; i >= 0; i--) {
      sum += parseInt(String(rutNumber).split('').reverse().join('').charAt(i)) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedDv = 11 - (sum % 11);
    const calculatedDv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : String(expectedDv);
    
    return dv === calculatedDv;
  };

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
    } else if (!validateRut(formData.rutMember)) {
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
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue,
        rut: formattedValue // Asignar el mismo valor a 'rut'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    }

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
      const response = await axios.post('http://127.0.0.1:8000/register/family/member/', formData, {
        headers: {
          'Content-Type': 'application/json'
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
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
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
              <input
                id="relationship"
                name="relationship"
                type="text"
                placeholder="Ej: Hijo, Hija, Esposa, etc."
                value={formData.relationship}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
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
                placeholder="Ingrese su email"
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
                placeholder="Ej: +56912345678"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
          </div>

          {/* Botón de Enviar */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-md bg-indigo-600 py-2 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Miembro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
