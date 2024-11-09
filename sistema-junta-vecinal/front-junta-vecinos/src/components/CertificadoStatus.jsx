import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useValidateRoleAndAccessToken } from '../middlewares/validateRoleAndAccessToken';
import dayjs from 'dayjs';
import { FaClock, FaCheckCircle, FaTimesCircle, FaDownload } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const CertificadoStatus = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const { themes } = useTheme();

    useValidateRoleAndAccessToken(["1", "2"], '/login');

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

    const actionConfig = {
        download: {
            icon: <FaDownload size={20} className="text-green-500" />,
            label: 'Descargar',
            textColor: 'text-green-500'
        }
    };


    const getStatusConfig = (status) => {
        const normalizedStatus = status?.toUpperCase();
        return statusConfig[normalizedStatus] || {
            icon: <FaClock size={20} className="text-gray-500" />,
            label: status || 'Desconocido',
            textColor: 'text-gray-500'
        };
    };


    const handleDownload = async (certificateId, rut) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/certificados/download/${certificateId}/${rut}/`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    responseType: 'blob' // Importante para recibir el archivo
                }
            );

            // Crear URL temporal para el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Crear enlace temporal y simular clic
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `certificado-${certificateId}.pdf`);
            document.body.appendChild(link);
            link.click();

            // Limpiar URL temporal
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);

            Swal.fire({
                icon: 'success',
                title: '¡Descarga exitosa!',
                text: 'El certificado se ha descargado correctamente.',
                timer: 2000,
                timerProgressBar: true
            });

        } catch (error) {
            console.error('Error al descargar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo descargar el certificado. Por favor intente nuevamente.',
                timer: 2000,
                timerProgressBar: true
            });
        }
    };

    // muestra las solicitudes que fueron realizadas durante los ultimos 3 meses 
    // Muestra las solicitudes de forma ordenadas por numero solicitud de mas actualizada a la mas antigua.
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const decodedToken = jwtDecode(token);
                const rut = decodedToken.rut;
    
                const response = await axios.get(`http://127.0.0.1:8000/certificados/list/user/?rut=${rut}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
    
                // Calcular la fecha de hace 3 meses
                const threeMonthsAgo = dayjs().subtract(3, 'month');
    
                // Filtrar y ordenar las solicitudes
                const filteredAndSortedRequests = response.data
                    .filter(request => dayjs(request.dateCreation).isAfter(threeMonthsAgo))
                    .sort((a, b) => b.id - a.id);
    
                setRequests(filteredAndSortedRequests);
            } catch (error) {
                console.error('Error al obtener solicitudes:', error);
                // Swal.fire('Error', 'No se pudo cargar la lista de solicitudes.', 'error');
            } finally {
                setLoading(false);
            }
        };
    
        fetchRequests();
    }, [token]);

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
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">N° Solicitud</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">Usuario</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">RUT</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">Fecha de Creación</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">Relación</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">Estado</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-200">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                                {requests.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-700 transition-colors">
                                        <td className="py-3 px-4 text-gray-300">{request.id.toString().padStart(4, '0')}</td>
                                        <td className="py-3 px-4 text-gray-300">{request.user}</td>
                                        <td className="py-3 px-4 text-gray-300">{request.rut}</td>
                                        <td className="py-3 px-4 text-gray-300">
                                            {dayjs(request.dateCreation).format('DD/MM/YYYY : HH:mm:ss')}
                                        </td>
                                        <td className="py-3 px-4 text-gray-300">{request.relationship.toUpperCase()}</td>
                                        <td className="py-3 px-4 text-gray-300">
                                            <div className="flex items-center gap-2">
                                                {getStatusConfig(request.status).icon}
                                                <span className={`${getStatusConfig(request.status).textColor} font-medium`}>
                                                    {getStatusConfig(request.status).label}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-300">
                                            { request.status.toUpperCase() === 'APROBADO' &&(
                                                <button
                                                    onClick={() => handleDownload(request.id, request.rut)}
                                                    className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
                                                >
                                                    {actionConfig.download.icon}
                                                    <span>{actionConfig.download.label}</span>
                                                </button>
                                            )}
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