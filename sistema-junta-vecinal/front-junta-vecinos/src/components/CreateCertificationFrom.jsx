import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useValidateRoleAndAccessToken } from '../middlewares/validateRoleAndAccessToken';


const CreateCertificationForm = () => {
    const [formData, setFormData] = useState({
        rutUser: '',
        rutRequest: '',
    });
    const [errors, setErrors] = useState({});
    const [infoVisible, setInfoVisible] = useState({
        rutUser: false,
        rutRequest: false,
    });
    const token = localStorage.getItem('token');
    useValidateRoleAndAccessToken(["1", "2"], '/login');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reiniciar errores previos

        try {
            await axios.post('http://127.0.0.1:8000/create/solicitud/', {
                rutUser: formData.rutUser,
                rutRequest: formData.rutRequest,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            Swal.fire({
                icon: 'success',
                title: 'Solicitud creada',
                text: 'La solicitud se ha creado exitosamente.',
            });

            setFormData({
                rutUser: '',
                rutRequest: '',
            });
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear la solicitud. Por favor, intenta nuevamente.',
            });
        }
    };

    const toggleInfo = (field) => {
        setInfoVisible((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen w-full mt-8">
            <div className="max-w-3xl rounded-lg p-8 mx-auto bg-gray-800">
                <h2 className="mb-8 text-center text-2xl font-bold leading-9 text-white">
                    Crear una nueva solicitud
                </h2>

                <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="rutUser" className="block text-sm font-medium text-white">
                            Rut del Usuario
                        </label>
                        <div className="mt-2 flex items-center">
                            <input
                                id="rutUser"
                                name="rutUser"
                                type="text"
                                placeholder='Ingrese el Rut del usuario'
                                value={formData.rutUser}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                            <button
                                type="button"
                                className="ml-2 flex items-center justify-center h-8 w-8 rounded-full bg-gray-600 text-white focus:outline-none"
                                onClick={() => toggleInfo('rutUser')}
                            >
                                ?
                            </button>
                        </div>
                        {infoVisible.rutUser && (
                            <p className="text-gray-500 text-xs mt-1">
                                El rut del usuario se refiere al jefe de hogar, quien gestiona los recursos y servicios del núcleo familiar. Este usuario puede tener otros miembros que residen en el mismo hogar. Es fundamental que el RUT del usuario esté correctamente ingresado para identificar al hogar y su composición, lo que facilita el acceso a beneficios y servicios comunitarios ofrecidos por la junta vecinal.
                            </p>
                        )}
                        {errors.rutUser && <p className="text-red-500 text-xs mt-1">{errors.rutUser}</p>}
                    </div>

                    <div>
                        <label htmlFor="rutRequest" className="block text-sm font-medium text-white">
                            Rut del Solicitante
                        </label>
                        <div className="mt-2 flex items-center">
                            <input
                                id="rutRequest"
                                name="rutRequest"
                                type="text"
                                placeholder='Ingrese el Rut de la solicitud'
                                value={formData.rutRequest}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                            <button
                                type="button"
                                className="ml-2 flex items-center justify-center h-8 w-8 rounded-full bg-gray-600 text-white focus:outline-none"
                                onClick={() => toggleInfo('rutRequest')}
                            >
                                ?
                            </button>
                        </div>
                        {infoVisible.rutRequest && (
                            <p className="text-gray-500 text-xs mt-1">
                                El rut del solicitante corresponde al integrante del núcleo familiar que realiza la solicitud. Este puede ser el mismo jefe de hogar o cualquier otro miembro que actúe en representación del hogar. Ingresar correctamente este RUT es crucial para asegurar que la solicitud sea procesada adecuadamente y que los beneficios se asignen de manera justa y eficiente, considerando la situación específica del hogar.
                            </p>
                        )}
                        {errors.rutRequest && <p className="text-red-500 text-xs mt-1">{errors.rutRequest}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-600 py-2 px-4 text-white font-semibold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Crear Solicitud
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCertificationForm;
