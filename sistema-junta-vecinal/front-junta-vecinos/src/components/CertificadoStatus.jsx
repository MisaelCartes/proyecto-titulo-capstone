import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import axios from 'axios'; // Importar Axios
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { jwtDecode } from 'jwt-decode'; // Importar jwtDecode

const CertificadoStatus = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]); // Initialize with an empty array
    const [loading, setLoading] = useState(true);

    // Función para cargar las solicitudes desde el archivo JSON
    const fetchRequests = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token');
        }

        try {
            const decodedToken = jwtDecode(token);
            const { rol } = decodedToken; // Obtener el rol del token

            // Verificar si el rol es diferente de 1 o 2
            if (rol !== "1" && rol !== "2") {
                Swal.fire('Acceso Denegado', 'No tienes permiso para acceder a esta página.', 'error');
                navigate('/panel'); // Redirigir a otra página si no tiene acceso
                return;
            }

            // Hacer la solicitud para obtener datos desde el archivo JSON
            const response = await axios.get('http://127.0.0.1:8000/'); 
            return response.data; // Asegúrate que esto devuelva un array
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
            throw error;
        }
    };

    useEffect(() => {
        // Cargar solicitudes cuando el componente se monta
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
                Swal.fire('Error', 'No se pudo cargar la lista de solicitudes.', 'error');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Cargando...</div>; // Display loading state
    }

    return (
        <div className="mx-auto w-12/13 px-4 mt-8">
            <h1 className="text-2xl font-bold mb-4">Estado de Mis Solicitudes</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-white rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 text-left">N° Solicitud</th>
                            <th className="py-2 px-4 text-left">Nombre de Solicitud</th>
                            <th className="py-2 px-4 text-left">RUT</th>
                            <th className="py-2 px-4 text-left">Nombre Completo</th>
                            <th className="py-2 px-4 text-left">Fecha de Solicitud</th>
                            <th className="py-2 px-4 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                                <td className="py-2 px-4 text-left">{request.requestNumber}</td>
                                <td className="py-2 px-4 text-left">{request.requestName}</td>
                                <td className="py-2 px-4 text-left">{request.rut}</td>
                                <td className="py-2 px-4 text-left">{request.fullName}</td>
                                <td className="py-2 px-4 text-left">{request.requestDate}</td>
                                <td className="py-2 px-4 text-left">{request.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CertificadoStatus;
