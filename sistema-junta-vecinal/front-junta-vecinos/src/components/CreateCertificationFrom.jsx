import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const CreateCertificationFrom = () => {
    const [formData, setFormData] = useState({
        rut: '',
        nombres: '',
        email: '',
        telefono: '',
        motivo: '',
        fechaSolicitud: '',
        direccion: '',
        urlToImage: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reiniciar errores previos

        try {
            // Enviar solicitud a /create/certification
            await axios.post('http://127.0.0.1:8000/create/certification', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Certificación creada',
                text: 'La certificación se ha creado exitosamente.',
            });

            // Reiniciar formulario
            setFormData({
                rut: '',
                nombres: '',
                email: '',
                telefono: '',
                motivo: '',
                fechaSolicitud: '',
                direccion: '',
                urlToImage: '',
            });
        } catch (error) {
            // Manejar errores
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }

            // Mostrar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear la certificación. Por favor, intenta nuevamente.',
            });
        }
    };

    return (
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen w-full mt-8">
            <div className="max-w-3xl rounded-lg p-8 mx-auto bg-gray-800">
                <h2 className="mb-8 text-center text-2xl font-bold leading-9 text-white">
                    Crear una nueva certificación
                </h2>

                <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit}>
                    {/** RUT */}
                    <div>
                        <label htmlFor="rut" className="block text-sm font-medium text-white">
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
                                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                            {errors.rut && <p className="text-red-500 text-xs mt-1">{errors.rut}</p>}
                        </div>
                    </div>

                    {/** Nombres */}
                    <div>
                        <label htmlFor="nombres" className="block text-sm font-medium text-white">
                            Nombres
                        </label>
                        <div className="mt-2">
                            <input
                                id="nombres"
                                name="nombres"
                                type="text"
                                value={formData.nombres}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                            {errors.nombres && <p className="text-red-500 text-xs mt-1">{errors.nombres}</p>}
                        </div>
                    </div>

                    {/** Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    {/** Teléfono */}
                    <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-white">
                            Teléfono
                        </label>
                        <div className="mt-2">
                            <input
                                id="telefono"
                                name="telefono"
                                type="text"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                        </div>
                    </div>

                    {/** Motivo */}
                    <div>
                        <label htmlFor="motivo" className="block text-sm font-medium text-white">
                            Motivo
                        </label>
                        <div className="mt-2">
                            <select
                                id="motivo"
                                name="motivo"
                                value={formData.motivo}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            >
                                <option value="">Seleccione un motivo</option>
                                <option value="laboral">Laboral</option>
                                <option value="educacional">Educacional</option>
                                <option value="particular">Particular</option>
                                <option value="otro">Otro</option>
                            </select>
                            {errors.motivo && <p className="text-red-500 text-xs mt-1">{errors.motivo}</p>}
                        </div>
                    </div>

                    {/** Fecha de solicitud */}
                    <div>
                        <label htmlFor="fechaSolicitud" className="block text-sm font-medium text-white">
                            Fecha de solicitud
                        </label>
                        <div className="mt-2">
                            <input
                                id="fechaSolicitud"
                                name="fechaSolicitud"
                                type="date"
                                value={formData.fechaSolicitud}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                            {errors.fechaSolicitud && <p className="text-red-500 text-xs mt-1">{errors.fechaSolicitud}</p>}
                        </div>
                    </div>

                    {/** Dirección */}
                    <div className="sm:col-span-2">
                        <label htmlFor="direccion" className="block text-sm font-medium text-white">
                            Dirección
                        </label>
                        <div className="mt-2">
                            <input
                                id="direccion"
                                name="direccion"
                                type="text"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                            {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
                        </div>
                    </div>

                    {/** Botón de enviar */}
                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-600 py-2 px-4 text-white font-semibold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Crear Certificación
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCertificationFrom; // Exportación por defecto
