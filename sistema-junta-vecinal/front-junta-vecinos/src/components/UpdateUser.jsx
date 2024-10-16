import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from 'jwt-decode';
import validarRut from '../middlewares/validarRut';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigateToLogin("Acceso denegado", "No tienes permiso para acceder a esta página.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.rol;

            if (userRole !== '1' && userRole !== '2') {
                navigateToLogin("Acceso denegado", "No tienes permiso para acceder a esta página.");
                return;
            }
            console.log("rut a enviar", rut)
            // Obtener datos del usuario usando el RUT en el cuerpo de la solicitud
            // Asegúrate de que 'rut' esté definido y tenga un valor antes de esta línea
            console.log("rut a enviar", rut);

            // Obtener datos del usuario enviando el RUT en el cuerpo de la solicitud GET
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/user/list/one/',
                headers: {
                    'Content-Type': 'application/json'
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

        } catch (error) {
            console.error("Error al decodificar el token:", error);
            navigate('/login');
        }
    }, [navigate, rut]);

    const navigateToLogin = (title, text) => {
        Swal.fire({ title, text, icon: "error", confirmButtonText: "Aceptar" });
        navigate('/login');
    };

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
        })
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
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8" style={{ backgroundColor: '#F7FAFC' }}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-10 w-auto" src="/diversity.png" alt="Junta Vecinos" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Actualiza tu cuenta
                </h2>
            </div>
            <div class="mt-4 text-left">
                <NavLink
                    to="/panel"
                    className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                    Volver
                </NavLink>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-3xl">
                <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit}>
                    {/* Primer layout */}
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
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
                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
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
                        <label htmlFor="motherLastName" className="block text-sm font-medium leading-6 text-gray-900">
                            Apellido Materno
                        </label>
                        <div className="mt-2">
                            <input
                                id="motherLastName"
                                name="motherLastName"
                                type="text"
                                value={formData.motherLastName}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.motherLastName && <p className="text-red-500 text-xs mt-1">{errors.motherLastName}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="rut" className="block text-sm font-medium leading-6 text-gray-900">
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
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
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
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
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

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Contraseña
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
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
                            Actualizar cuenta
                        </button>
                        {errors.submit && <p className="text-red-500 text-xs mt-1">{errors.submit}</p>}
                    </div>
                </form>
            </div>
        </div>

    );
};

export default UpdateUser;
