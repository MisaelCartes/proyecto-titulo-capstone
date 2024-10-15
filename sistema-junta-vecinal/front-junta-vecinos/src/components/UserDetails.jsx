import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de importar jwt-decode
import Swal from 'sweetalert2';

const BASE_URL = 'http://127.0.0.1:8000'; // URL base de la API

export const UserDetails = () => {
    const { rut } = useParams(); // Obtener el rut de los parámetros de la URL
    const [user, setUser] = useState(null); // Estado para almacenar los detalles del usuario
    const navigate = useNavigate(); // Para redirigir
    console.log(rut)
    // Función para cargar los detalles del usuario desde la API
    const fetchUserDetails = () => {
        fetch(`${BASE_URL}/user/list/one/?rut=${rut}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'No se pudieron obtener los detalles del usuario.', 'error');
                navigate('/panel');
            });
    };

    // Verificar el token y el rol del usuario
    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                const { exp, rol } = decodedToken;
                if (exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    if (rol !== '1' && rol !== '2') {
                        Swal.fire('Acceso Denegado', 'No tienes permiso para ver estos detalles.', 'warning');
                        navigate('/login');
                    } else {
                        fetchUserDetails();
                    }
                }
            } catch (error) {
                console.error('Error decodificando el token:', error);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate, rut]);

    if (!user) {
        return <div className="text-white">Cargando...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-white mb-6">Detalles del Usuario</h1>
            <form className="bg-gray-800 text-white rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-400 font-semibold">Nombre</label>
                    <input
                        type="text"
                        value={user.firstName}
                        disabled
                        className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-400 font-semibold">Rut</label>
                    <input
                        type="text"
                        value={user.rut}
                        disabled
                        className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-400 font-semibold">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-400 font-semibold">Teléfono</label>
                    <input
                        type="text"
                        value={user.phone}
                        disabled
                        className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-400 font-semibold">Dirección</label>
                    <input
                        type="text"
                        value={user.address}
                        disabled
                        className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-400 font-semibold">Rol</label>
                    <input
                        type="text"
                        value={user.role}
                        disabled
                        className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
                    />
                </div>
            </form>
        </div>
    );
};
