import React, { useState } from 'react';

export const FamilyRegister = ({ rut }) => {
  const [formData, setFormData] = useState({
    rut: rut, // Asigna el rut pasado como prop
    rutMember: rut, // RUT del miembro, también inicializado con el mismo valor
    firstName: 'John',
    lastName: 'Doe',
    relationship: 'Brother',
    date_of_birth: '1990-05-15', // Formato de fecha (YYYY-MM-DD)
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({}); // Define errores

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    setErrors({}); // Reset errores

    const dataToSend = { ...formData };

    // Validación básica
    const newErrors = {};
    if (!formData.rut) newErrors.rut = 'RUT es requerido';
    if (!formData.rutMember) newErrors.rutMember = 'RUT del miembro es requerido';
    if (!formData.firstName) newErrors.firstName = 'Nombre es requerido';
    if (!formData.lastName) newErrors.lastName = 'Apellido Paterno es requerido';
    if (!formData.relationship) newErrors.relationship = 'Relación es requerida';
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Fecha de Nacimiento es requerida';
    if (!formData.email) newErrors.email = 'Correo Electrónico es requerido';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Teléfono es requerido';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Prevenir el envío del formulario si hay errores
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/register/family/member/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Fallo en el registro del miembro de la familia');
      }

      const data = await response.json();
      setSuccessMessage('Miembro de la familia registrado con éxito!');
      console.log(data); // Puedes registrar o procesar los datos devueltos si es necesario
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8" style={{ backgroundColor: '#0D1A2D' }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src="/diversity.png" alt="Junta Vecinos" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Registra a un miembro de la familia
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-3xl">
        <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div>
            <label htmlFor="rut" className="block text-sm font-medium leading-6 text-white">
              RUT
            </label>
            <div className="mt-2">
              <input
                id="rut"
                name="rut"
                type="text"
                value={formData.rut}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.rut && <p className="text-red-500 text-xs mt-1">{errors.rut}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="rutMember" className="block text-sm font-medium leading-6 text-white">
              RUT del Miembro
            </label>
            <div className="mt-2">
              <input
                id="rutMember"
                name="rutMember"
                type="text"
                value={formData.rutMember}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.rutMember && <p className="text-red-500 text-xs mt-1">{errors.rutMember}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
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
                value={formData.lastName}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="relationship" className="block text-sm font-medium leading-6 text-white">
              Relación
            </label>
            <div className="mt-2">
              <input
                id="relationship"
                name="relationship"
                type="text"
                value={formData.relationship}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.relationship && <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-medium leading-6 text-white">
              Fecha de Nacimiento
            </label>
            <div className="mt-2">
              <input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.date_of_birth && <p className="text-red-500 text-xs mt-1">{errors.date_of_birth}</p>}
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
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 py-2 px-3 text-white font-semibold hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Registrar Miembro
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};
