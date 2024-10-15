import React, { useState } from 'react';
import Swal from 'sweetalert2';

const CreateCertificationForm = () => {
    const [formData, setFormData] = useState({
        rut: '',
        nombres: '',
        email: '',
        telefono: '',
        motivo: '',
        fechaSolicitud: '',
        direccion: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Limpiar error en campo específico
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones simples (puedes expandir esto)
        const newErrors = {};
        if (!formData.rut) newErrors.rut = 'El RUT es obligatorio.';
        if (!formData.nombres) newErrors.nombres = 'El nombre es obligatorio.';
        if (!formData.email) newErrors.email = 'El correo es obligatorio.';
        if (!formData.telefono) newErrors.telefono = 'El teléfono es obligatorio.';
        if (!formData.motivo) newErrors.motivo = 'El motivo es obligatorio.';
        if (!formData.fechaSolicitud) newErrors.fechaSolicitud = 'La fecha es obligatoria.';
        if (!formData.direccion) newErrors.direccion = 'La dirección es obligatoria.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        Swal.fire({
            title: 'Solicitud enviada',
            text: 'Tu solicitud de certificado ha sido enviada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            background: '#0D1A2D',
            color: '#cbd5e0',
        });
        console.log(formData); // Aquí podrías manejar el envío de datos
    };

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8" style={{ backgroundColor: '#0D1A2D' }}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-10 w-auto" src="/diversity.png" alt="Junta Vecinos" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Solicitar un nuevo certificado
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
                                style={{ backgroundColor: 'white' }}
                            />
                            {errors.rut && <p className="text-red-500 text-xs mt-1">{errors.rut}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="nombres" className="block text-sm font-medium leading-6 text-white">
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
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                style={{ backgroundColor: 'white' }}
                            />
                            {errors.nombres && <p className="text-red-500 text-xs mt-1">{errors.nombres}</p>}
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
                                style={{ backgroundColor: 'white' }}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-white">
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
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                style={{ backgroundColor: 'white' }}
                            />
                            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="motivo" className="block text-sm font-medium leading-6 text-white">
                            Motivo
                        </label>
                        <div className="mt-2">
                            <input
                                id="motivo"
                                name="motivo"
                                type="text"
                                value={formData.motivo}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                style={{ backgroundColor: 'white' }}
                            />
                            {errors.motivo && <p className="text-red-500 text-xs mt-1">{errors.motivo}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="fechaSolicitud" className="block text-sm font-medium leading-6 text-white">
                            Fecha de Solicitud
                        </label>
                        <div className="mt-2">
                            <input
                                id="fechaSolicitud"
                                name="fechaSolicitud"
                                type="date"
                                value={formData.fechaSolicitud}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                style={{ backgroundColor: 'white' }}
                            />
                            {errors.fechaSolicitud && <p className="text-red-500 text-xs mt-1">{errors.fechaSolicitud}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-white">
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
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                style={{ backgroundColor: 'white' }}
                            />
                            {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 py-2 px-3 text-white font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        >
                            Enviar Solicitud
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCertificationForm;
