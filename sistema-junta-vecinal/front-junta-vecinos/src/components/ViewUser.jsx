import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useValidateRoleAndAccessToken } from '../middlewares/validateRoleAndAccessToken';
import { useTheme } from '../context/ThemeContext';

const BASE_URL = 'http://127.0.0.1:8000';

const ViewUser = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    useValidateRoleAndAccessToken(["1"], '/panel')
    const fetchUsers = () => {
        fetch(`${BASE_URL}/users/list/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos:', data);
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('La respuesta no es un array:', data);
                }
            })
            .catch((error) => {
                console.error("Error al cargar la data de los usuarios:", error);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = (rut) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Una vez eliminado, no podrás recuperar este usuario.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${BASE_URL}/user/delete/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ rut }),
                })
                    .then((response) => {
                        if (response.ok) {
                            const updatedUsers = users.filter(user => user.rut !== rut);
                            setUsers(updatedUsers);
                            Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
                        } else {
                            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
                        }
                    })
                    .catch(() => {
                        Swal.fire('Error', 'Hubo un problema con la solicitud.', 'error');
                    });
            }
        });
    };
    const { themes } = useTheme();

    return (
        <div className="container mx-auto px-4" style={{ backgroundColor: themes.background, color: themes.text }}>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold" style={{ color: themes.text }}>Listado de Usuarios</h1>
                <NavLink
                    to="/register"
                    className="bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4 text-center hover:bg-gray-700"
                >
                    Agregar Usuario
                </NavLink>
            </div>

            <p className="mb-4" style={{ color: themes.text }}>
                Una lista de todos los usuarios en tu cuenta, incluyendo su nombre, rut, correo electrónico y rol.
            </p>

            <div className="overflow-x-auto rounded-lg shadow-lg border-2 border-gray-600">
                <table className="min-w-full bg-gray-800 text-white">
                    <thead>
                        <tr className="bg-gray-900 border border-gray-700">
                            <th className="py-3 px-4 text-left font-semibold text-gray-200">Nombre Completo</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-200">Rut</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-200">Correo</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-200">Rol</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-200">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                        {users.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-700 transition-colors">
                                <td className="py-3 px-4 text-gray-300">{`${user.firstName} ${user.lastName} ${user.motherLastName}`}</td>
                                <td className="py-3 px-4 text-gray-300">{user.rut}</td>
                                <td className="py-3 px-4 text-gray-300">{user.email}</td>
                                <td className="py-3 px-4 text-gray-300">{user.role === 1 ? 'Admin' : 'Miembro'}</td>
                                <td className="py-3 px-4 text-gray-300">
                                    <div className="flex justify-around">
                                        <NavLink to={`/user/${user.rut}/details`} title="View Details" className="text-blue-400 hover:text-blue-300 mx-0.5">
                                            <FaEye className="h-5 w-5" />
                                        </NavLink>
                                        <NavLink to={`/user/${user.rut}/edit`} title="Edit" className="text-green-500 hover:text-green-400 mx-0.5">
                                            <FaEdit className="h-5 w-5" />
                                        </NavLink>
                                        <button
                                            title="Delete"
                                            className="text-red-600 hover:text-red-500 mx-0.5"
                                            onClick={() => handleDelete(user.rut)}
                                        >
                                            <FaTrashAlt className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewUser;