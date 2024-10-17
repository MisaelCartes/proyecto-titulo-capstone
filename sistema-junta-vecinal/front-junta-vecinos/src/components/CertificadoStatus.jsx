import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importar SweetAlert2

// Simulación del JSON de solicitudes
const requestsData = [
    {
        requestNumber: "SOL001",
        requestName: "Certificado de Nacimiento",
        requestDate: "2024-01-15",
        status: "En Proceso",
        rut: "12.345.678-9",
        fullName: "Juan Pérez González",
        creationDate: "2024-01-10",
        notes: "Solicitud urgente"
    },
    {
        requestNumber: "SOL002",
        requestName: "Certificado de Residencia",
        requestDate: "2024-02-20",
        status: "Aprobado",
        rut: "98.765.432-1",
        fullName: "Ana María López",
        creationDate: "2024-02-15",
        notes: ""
    },
    {
        requestNumber: "SOL003",
        requestName: "Certificado de Matrimonio",
        requestDate: "2024-03-05",
        status: "Rechazado",
        rut: "11.222.333-4",
        fullName: "Carlos Fernández",
        creationDate: "2024-02-28",
        notes: "Falta documentación"
    },
    {
        requestNumber: "SOL004",
        requestName: "Certificado de Antecedentes",
        requestDate: "2024-04-10",
        status: "Completado",
        rut: "44.555.666-7",
        fullName: "María García",
        creationDate: "2024-04-01",
        notes: ""
    },
    {
        requestNumber: "SOL005",
        requestName: "Certificado de Defunción",
        requestDate: "2024-05-25",
        status: "En Proceso",
        rut: "33.444.555-6",
        fullName: "Pedro González",
        creationDate: "2024-05-20",
        notes: "Caso delicado"
    }
];

const CertificadoStatus = () => {
    const [requests, setRequests] = useState([]);

    // Función para cargar las solicitudes (simulando una API)
    const fetchRequests = () => {
        // Simulando una llamada a la API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(requestsData);
            }, 1000);
        });
    };

    useEffect(() => {
        // Cargar solicitudes cuando el componente se monta
        fetchRequests()
            .then(data => {
                setRequests(data);
            })
            .catch(() => {
                Swal.fire('Error', 'No se pudo cargar la lista de solicitudes.', 'error');
            });
    }, []);

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
