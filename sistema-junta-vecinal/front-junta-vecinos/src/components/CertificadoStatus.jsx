import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useValidateRoleAndAccessToken } from '../middlewares/validateRoleAndAccessToken';
import dayjs from 'dayjs';
import { FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const CertificadoStatus = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const { themes } = useTheme();
    // Usar el middleware para verificar los roles permitidos (1 y 2)
    useValidateRoleAndAccessToken(["1", "2"], '/login');

    // Configuración de estado
    const statusConfig = {
        SOLICITADO: {
            icon: <FaClock size={20} className="text-yellow-500" />,
            label: 'Solicitado',
            textColor: 'text-yellow-500'
        },
        APROBADO: {
            icon: <FaCheckCircle size={20} className="text-green-500" />,
            label: 'Aprobado',
            textColor: 'text-green-500'
        },
        RECHAZADO: {
            icon: <FaTimesCircle size={20} className="text-red-500" />,
            label: 'Rechazado',
            textColor: 'text-red-500'
        }
    };

    // Función para obtener la configuración del estado
    const getStatusConfig = (status) => {
        const normalizedStatus = status?.toUpperCase();
        return statusConfig[normalizedStatus] || {
            icon: <FaClock size={20} className="text-gray-500" />,
            label: status || 'Desconocido',
            textColor: 'text-gray-500'
        };
    };

    const fetchRequests = async () => {
        try {
            const decodedToken = jwtDecode(token);
            const rut = decodedToken.rut;

            const response = await axios.get(`http://127.0.0.1:8000/certificados/list/user/?rut=${rut}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
            Swal.fire('Error', 'No se pudo cargar la lista de solicitudes.', 'error');
            throw error;
        }
    };

    useEffect(() => {
        fetchRequests()
            .then(data => {
                if (Array.isArray(data)) {
                    setRequests(data);
                } else {
                    throw new Error('Datos no son un array');
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="flex-1 p-6 overflow-y-auto h-screen w-full mt-8" style={{ backgroundColor: themes.background }}>
            <div className="max-w-7xl rounded-lg p-8 mx-auto bg-gray-800">
                <h2 className="mb-8 text-center text-2xl font-bold leading-9 text-white">
                    Estado de Mis Solicitudes
                </h2>

                {requests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-gray-700 rounded-lg border-2 border-gray-600">
                        <FaClock size={50} className="text-gray-400 mb-4" />
                        <p className="text-xl text-gray-300 text-center font-medium">
                            No hay solicitudes de certificados registradas
                        </p>
                        <p className="text-gray-400 text-center mt-2">
                            Las solicitudes que realices aparecerán aquí
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg shadow-lg border-2 border-gray-600">
                        <table className="min-w-full bg-gray-800 text-white">
                            <thead>
                                <tr className="bg-gray-900 border border-gray-700">
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">Usuario</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">RUT</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">Fecha de Creación</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">Relación</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                                {requests.map((request, index) => (
                                    <tr key={index} className="hover:bg-gray-700 transition-colors">
                                        <td className="py-3 px-4 text-gray-300">{request.user}</td>
                                        <td className="py-3 px-4 text-gray-300">{request.rut}</td>
                                        <td className="py-3 px-4 text-gray-300">
                                            {dayjs(request.dateCreation).format('DD/MM/YYYY : HH:mm:ss')}
                                        </td>
                                        <td className="py-3 px-4 text-gray-300">{request.relationship}</td>
                                        <td className="py-3 px-4 text-gray-300">
                                            <div className="flex items-center gap-2">
                                                {getStatusConfig(request.status).icon}
                                                <span className={`${getStatusConfig(request.status).textColor} font-medium`}>
                                                    {getStatusConfig(request.status).label}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>


    );
};

export default CertificadoStatus;
