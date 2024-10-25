import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const users = [
  {
    id: 1,
    name: "Usuario 1",
    address: "Calle 1, Pudahuel, Chile",
    lat: -33.3945,
    lng: -70.8047
  },
  // ... other users
];

export const MapaInteractive = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Para controlar el marcador seleccionado

  const containerStyle = {
    width: '100%',
    height: '100vh'
  };

  const center = {
    lat: -33.3945, // Centro inicial en Pudahuel
    lng: -70.8047
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDRZ2qUXEV0QLBIPSjpxeKxPVuIHcbmVM4"> {/* Reemplaza con tu clave de API */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14} // Zoom inicial para Pudahuel
      >
        {users.map(user => (
          <Marker
            key={user.id}
            position={{ lat: user.lat, lng: user.lng }}
            onClick={() => setSelectedUser(user)} // Selecciona el usuario al hacer clic
          />
        ))}

        {selectedUser && (
          <InfoWindow
            position={{ lat: selectedUser.lat, lng: selectedUser.lng }}
            onCloseClick={() => setSelectedUser(null)} // Cierra el InfoWindow
          >
            <div>
              <h3>{selectedUser.name}</h3>
              <p>{selectedUser.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapaInteractive;