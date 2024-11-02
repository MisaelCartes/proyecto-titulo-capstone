import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useValidateRoleAndAccessToken } from '../middlewares/validateRoleAndAccessToken';


const BASE_URL = 'http://127.0.0.1:8000'; // URL base de la API

export const UserDetails = () => {
    const { rut } = useParams();
    const [user, setUser] = useState(null);
    const [familyMembers, setFamilyMembers] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // Middleware para validar el rol y el token
    useValidateRoleAndAccessToken(["1"]); 

    useEffect(() => {
        fetchUserDetails();
        fetchFamilyMembers();
    }, [rut]);

    const fetchUserDetails = () => {
        fetch(`${BASE_URL}/user/list/one/?rut=${rut}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

    const fetchFamilyMembers = () => {
        fetch(`${BASE_URL}/miembros/familia/?rut=${rut}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud de miembros de familia');
                }
                return response.json();
            })
            .then(data => {
                setFamilyMembers(data);
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'No se pudieron obtener los miembros de la familia.', 'error');
            });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Detalles del Usuario</h1>
            {user ? (
                <form className="bg-gray-800 text-white rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-400 font-semibold">Nombre</label>
                        <input
                            type="text"
                            value={user.firstName}text-gray-800
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
            ) : (
                <p className="text-gray-400">Cargando detalles del usuario...</p>
            )}

            {/* Tabla para los miembros de familia */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-6">Miembros de la Familia</h2>
            <hr className="border-t-2 border-gray-400 my-6" />

            {familyMembers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-gray-800 text-white rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left border-b border-gray-600 text-gray-300">Rut</th>
                                <th className="px-4 py-2 text-left border-b border-gray-600 text-gray-300">Nombre</th>
                                <th className="px-4 py-2 text-left border-b border-gray-600 text-gray-300">Apellido</th>
                                <th className="px-4 py-2 text-left border-b border-gray-600 text-gray-300">Relación</th>
                                <th className="px-4 py-2 text-left border-b border-gray-600 text-gray-300">N° Familia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {familyMembers.map((member, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border-b border-gray-600 text-gray-400">{member.rut}</td>
                                    <td className="px-4 py-2 border-b border-gray-600 text-gray-400">{member.firstName}</td>
                                    <td className="px-4 py-2 border-b border-gray-600 text-gray-400">{member.lastName}</td>
                                    <td className="px-4 py-2 border-b border-gray-600 text-gray-400">{member.relationship}</td>
                                    <td className="px-4 py-2 border-b border-gray-600 text-gray-400">{member.family}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-800">No se encontraron miembros de la familia.</p>
            )}
        </div>
    );
};
