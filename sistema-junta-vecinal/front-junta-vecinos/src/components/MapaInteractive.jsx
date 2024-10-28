import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

// Configuración del mapa
const mapContainerStyle = {
  height: "75vh",
  width: "100%",
};

const center = {
  lat: -33.4523,
  lng: -70.7566,
};

const usersData = [
  { id: 1, name: "Juan Pérez", address: "Av. San Pablo 8444, Pudahuel, Chile", lat: -33.4440, lng: -70.7669, info: "Vecino del sector San Pablo", rut: "12.345.678-9" },
  { id: 2, name: "María González", address: "Av. Teniente Cruz 750, Pudahuel, Chile", lat: -33.4539, lng: -70.7489, info: "Vecino del sector Teniente Cruz", rut: "23.456.789-0" },
  { id: 3, name: "Pedro Martínez", address: "Av. La Estrella 1000, Pudahuel, Chile", lat: -33.4637, lng: -70.7552, info: "Vecino del sector La Estrella", rut: "34.567.890-1" },
  { id: 4, name: "Ana Rodríguez", address: "Av. Laguna Sur 8000, Pudahuel, Chile", lat: -33.4730, lng: -70.7420, info: "Vecino del sector Laguna Sur", rut: "45.678.901-2" },
  { id: 5, name: "Luis Fernández", address: "Av. José Joaquín Pérez 7340, Pudahuel, Chile", lat: -33.4320, lng: -70.7589, info: "Vecino del sector José Joaquín Pérez", rut: "56.789.012-3" },
  { id: 6, name: "Claudia Torres", address: "Av. General Bonilla 6500, Pudahuel, Chile", lat: -33.4410, lng: -70.7720, info: "Vecino del sector General Bonilla", rut: "67.890.123-4" },
  { id: 7, name: "Francisco Muñoz", address: "Av. Federico Errázuriz 1300, Pudahuel, Chile", lat: -33.4520, lng: -70.7650, info: "Vecino del sector Federico Errázuriz", rut: "78.901.234-5" },
  { id: 8, name: "Carolina Silva", address: "Av. El Tranque 1240, Pudahuel, Chile", lat: -33.4280, lng: -70.7480, info: "Vecino del sector El Tranque", rut: "89.012.345-6" },
  { id: 9, name: "Sergio Herrera", address: "Av. La Travesía 8750, Pudahuel, Chile", lat: -33.4590, lng: -70.7390, info: "Vecino del sector La Travesía", rut: "90.123.456-7" },
  { id: 10, name: "Patricia Castro", address: "Av. San Francisco 8420, Pudahuel, Chile", lat: -33.4680, lng: -70.7580, info: "Vecino del sector San Francisco", rut: "01.234.567-8" },
  { id: 11, name: "Diego Morales", address: "Av. La Paz 3000, Pudahuel, Chile", lat: -33.4450, lng: -70.7490, info: "Vecino del sector La Paz", rut: "12.345.678-9" },
  { id: 12, name: "Lorena Vega", address: "Av. Colón 5500, Pudahuel, Chile", lat: -33.4570, lng: -70.7550, info: "Vecino del sector Colón", rut: "23.456.789-0" },
  { id: 13, name: "Javier Castillo", address: "Av. O'Higgins 4000, Pudahuel, Chile", lat: -33.4690, lng: -70.7540, info: "Vecino del sector O'Higgins", rut: "34.567.890-1" },
  { id: 14, name: "Marcela Ríos", address: "Av. Las Torres 1500, Pudahuel, Chile", lat: -33.4420, lng: -70.7430, info: "Vecino del sector Las Torres", rut: "45.678.901-2" },
  { id: 15, name: "Gonzalo Ruiz", address: "Av. Santiago 800, Pudahuel, Chile", lat: -33.4325, lng: -70.7520, info: "Vecino del sector Santiago", rut: "56.789.012-3" },
  { id: 16, name: "Valentina Soto", address: "Av. Libertador Bernardo O'Higgins 1200, Pudahuel, Chile", lat: -33.4530, lng: -70.7580, info: "Vecino del sector Libertador", rut: "67.890.123-4" },
  { id: 17, name: "Ignacio Pérez", address: "Av. Valparaíso 750, Pudahuel, Chile", lat: -33.4640, lng: -70.7680, info: "Vecino del sector Valparaíso", rut: "78.901.234-5" },
  { id: 18, name: "Natalia Ramírez", address: "Av. Constitución 600, Pudahuel, Chile", lat: -33.4595, lng: -70.7710, info: "Vecino del sector Constitución", rut: "89.012.345-6" },
  { id: 19, name: "Cristian Salazar", address: "Av. El Sol 900, Pudahuel, Chile", lat: -33.4480, lng: -70.7800, info: "Vecino del sector El Sol", rut: "90.123.456-7" },
  { id: 20, name: "María José López", address: "Av. La Libertad 2000, Pudahuel, Chile", lat: -33.4620, lng: -70.7490, info: "Vecino del sector La Libertad", rut: "01.234.567-8" }
];

// Componente del Mapa
const MapaInteractive = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const onMarkerClick = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const onCloseClick = () => {
    setSelectedUser(null);
  };
 
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="p-4 mt-2">
        <h2 className="text-2xl font-bold mb-4">Mapa Distribución de Usuarios</h2>
        <div className="border rounded-lg overflow-hidden shadow-lg"> {/* Estilo del mapa con borde redondeado */}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
          >
            {usersData.map(user => (
              <MarkerF
                key={user.id}
                position={{ lat: user.lat, lng: user.lng }}
                onClick={() => onMarkerClick(user)}
              />
            ))}
          </GoogleMap>
        </div>

        {/* Modal para mostrar información del usuario seleccionado */}
        <Modal
          isOpen={!!selectedUser}
          onRequestClose={onCloseClick}
          ariaHideApp={false}
          className="max-w-10xl mx-auto p-8 bg-white bg-opacity-70 rounded-lg shadow-2xl relative mt-16 outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center"
          style={{
            overlay: { zIndex: 1000 },
            content: { maxHeight: '85vh', overflowY: 'auto' }
          }}
        >
          <button
            onClick={onCloseClick}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition duration-300"
          >
            <FaTimes size={24} />
          </button>
          {selectedUser && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-blue-800">{selectedUser.name}</h3>
              <p className="text-gray-800 text-lg">{selectedUser.address}</p>
              <p className="text-gray-600">{selectedUser.info}</p>
              <p className="font-semibold">RUT: {selectedUser.rut}</p>
            </div>
          )}
        </Modal>
      </div>
    </LoadScript>
  );
};

export default MapaInteractive;
