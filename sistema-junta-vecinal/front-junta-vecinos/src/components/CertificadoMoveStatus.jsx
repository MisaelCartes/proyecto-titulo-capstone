import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useValidateRoleAndAccessToken } from '../middlewares/validateRoleAndAccessToken';
import dayjs from 'dayjs';
import { FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
const CertificadoMoveStatus = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const { themes } = useTheme();
    // Status configuration object
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

    // Function to get the status configuration securely
    const getStatusConfig = (status) => {
        const normalizedStatus = status?.toUpperCase();
        return statusConfig[normalizedStatus] || {
            icon: <FaClock size={20} className="text-gray-500" />,
            label: status || 'Desconocido',
            textColor: 'text-gray-500'
        };
    };

    useValidateRoleAndAccessToken(["1"], '/panel');

    const fetchRequests = useCallback(async () => {
        try {

            const response = await axios.get(`http://127.0.0.1:8000/certificados/list/admin/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
            Swal.fire('Error', 'No se pudo cargar la lista de solicitudes.', 'error');
            throw error;
        }
    }, [token]);

    const handleStatusChange = async (requestId, newStatus) => {
        try {
            await axios.put(
                `http://127.0.0.1:8000/certificados/edit/${requestId}/`,
                { status: newStatus },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            setRequests(requests.map(request =>
                request.id === requestId
                    ? { ...request, status: newStatus }
                    : request
            ));

            Swal.fire('Éxito', 'Estado actualizado correctamente', 'success');
        } catch (error) {
            console.error('Error al actualizar estado:', error);
            Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
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
    }, [fetchRequests]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl font-semibold">Cargando...</div>
            </div>
        );
    }


    return (
        <div className="flex-1 p-6 overflow-y-auto h-screen w-full mt-8" style={{ backgroundColor: themes.background }}>
            <div className="max-w-7xl rounded-lg p-8 mx-auto bg-gray-800">
                <h2 className="mb-8 text-center text-2xl font-bold leading-9 text-white">
                    Gestionar Estado de Solicitudes
                </h2>

                {requests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-gray-700 rounded-lg border-2 border-gray-600">
                        <FaCheckCircle size={50} className="text-gray-400 mb-4" />
                        <p className="text-xl text-gray-300 text-center font-medium">
                            No hay solicitudes pendientes de gestión
                        </p>
                        <p className="text-gray-400 text-center mt-2">
                            Cuando los usuarios realicen solicitudes, aparecerán aquí para su revisión
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
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                                {requests.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-700 transition-colors">
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
                                        <td className="py-3 px-4">
                                            <select
                                                className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={request.status}
                                                onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                            >
                                                <option value="">Cambiar Estado</option>
                                                <option value="approved">Aprobado</option>
                                                <option value="rejected">Rechazado</option>
                                            </select>
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

export default CertificadoMoveStatus;
