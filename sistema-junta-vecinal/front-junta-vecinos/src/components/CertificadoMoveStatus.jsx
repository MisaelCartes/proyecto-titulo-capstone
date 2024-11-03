import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useValidateRoleAndAccessToken } from '../middlewares/validateRoleAndAccessToken';
import dayjs from 'dayjs';


const CertificadoMoveStatus = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    // Usar el middleware para verificar los roles permitidos (1)
    useValidateRoleAndAccessToken(["1"], '/panel');

    const fetchRequests = async () => {
      
        try {
            const decodedToken = jwtDecode(token);
            const rut = decodedToken.rut;
            
            const response = await axios.get(`http://127.0.0.1:8000/certificados/list/admin/?rut=${rut}`, {
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
        <div className="mx-auto w-12/13 px-4 mt-8">
            <h1 className="text-2xl font-bold mb-4">Gestionar Estado de Solicitudes</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-white rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 text-left">Usuario</th>
                            <th className="py-2 px-4 text-left">RUT</th>
                            <th className="py-2 px-4 text-left">Fecha de Creación</th>
                            <th className="py-2 px-4 text-left">Relación</th>
                            <th className="py-2 px-4 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                                <td className="py-2 px-4 text-left">{request.user}</td>
                                <td className="py-2 px-4 text-left">{request.rut}</td>
                                <td className="py-2 px-4 text-left">{dayjs(request.dateCreation).format('DD/MM/YYYY : HH:mm:ss')}</td>
                                <td className="py-2 px-4 text-left">{request.relationship}</td>
                                <td className="py-2 px-4 text-left">{request.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CertificadoMoveStatus;
