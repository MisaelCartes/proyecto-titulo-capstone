import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import validarRut from '../middlewares/validarRut';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useValidateRoleAndAccessToken } from '../middlewares/validateRoleAndAccessToken';
import { FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';


const UpdateUser = () => {
    const { themes } = useTheme();

    const { rut } = useParams();
    console.log("rut params: ", rut)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        motherLastName: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
        housingType: "",
        photo: null,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Estado de carga
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useValidateRoleAndAccessToken(['1', '2'], '/login')

    useEffect(() => {
        // Obtener datos del usuario enviando el RUT en el cuerpo de la solicitud GET
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/user/list/one/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                rut: rut
            },
        })
            .then((response) => {
                console.log("Datos del usuario recibidos:", response.data);

                const user = response.data;
                setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    motherLastName: user.motherLastName,
                    rut: user.rut,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    password: "", // No pre-cargar la contraseña
                    housingType: user.housingType,
                    photo: user.photo,
                });
            })
            .catch((error) => {
                console.error("Error al cargar los datos del usuario:", error);
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error al cargar los datos del usuario.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });

    }, [navigate, rut]);

    const isValidCharacter = (input) => /^[a-zA-ZÀ-ÿ\s]+$/.test(input);
    const isValidChileanPhoneNumber = (number) => /^9\d{8}$/.test(number);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const validateFormData = () => {
        const newErrors = {};

        // Validar campos
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

        if (formData.password && formData.password.length >= 2) {
            if (formData.password.length > 30) {
                newErrors.password = "El password debe tener al menos 6 caracteres.";
            }
        }


        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        const newErrors = validateFormData();

        // Si hay errores, establecerlos en el estado y no enviar el formulario
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true); // Activar indicador de carga

        // Enviar los datos actualizados
        axios.put(`http://127.0.0.1:8000/user/edit/`, {
            rut: formData.rut,
            firstName: formData.firstName,
            lastName: formData.lastName,
            motherLastName: formData.motherLastName,
            password: formData.password,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            housingType: formData.housingType,
            photo: formData.photo,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
            .then(() => {
                Swal.fire({
                    title: "Actualización exitosa",
                    text: "Los datos del usuario se han actualizado correctamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                navigate('/panel');
            })
            .catch((error) => {
                console.error("Error al actualizar el usuario:", error);
                const errorMessage = error.response ? error.response.data.message : "Ocurrió un error al actualizar los datos del usuario.";
                Swal.fire({
                    title: "Error",
                    text: errorMessage,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            })
            .finally(() => {
                setLoading(false); // Desactivar indicador de carga
            });
    };

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8" style={{ backgroundColor: themes.background }}>
            <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
                <div className="bg-gray-800 px-8 py-10 rounded-lg">
                    {/* Botón de Volver dentro del form y alineado a la izquierda */}
                    <div className="mb-6 text-left">
                        <NavLink
                            to="/panel"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            <FaArrowLeft className="mr-2" />
                            Volver
                        </NavLink>
                    </div>

                    <h2 className="mb-8 text-center text-2xl font-bold leading-9 text-white">
                        Actualiza tu cuenta
                    </h2>

                    <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit}>
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
                                    className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                        </div>

                        {/* Repite el mismo patrón para cada campo del formulario */}
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
                                    className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                                    value={formData.motherLastName}
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                {errors.motherLastName && <p className="text-red-500 text-xs mt-1">{errors.motherLastName}</p>}
                            </div>
                        </div>

                        {/* Continúa con el mismo patrón para RUT, dirección, teléfono, email, contraseña y foto */}
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
                                    className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                                    className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                            >
                                Actualizar cuenta
                            </button>
                            {errors.submit && <p className="text-red-500 text-xs mt-1">{errors.submit}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default UpdateUser;
