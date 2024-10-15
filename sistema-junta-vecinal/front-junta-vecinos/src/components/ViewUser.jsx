import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Importar NavLink
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const BASE_URL = 'http://127.0.0.1:8000'; // URL base de la API

const ViewUser = () => {
  const [users, setUsers] = useState([]);

  // Función para cargar los usuarios desde la API
  const fetchUsers = () => {
    fetch(`${BASE_URL}/users/list/`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Imprimir los datos de usuarios en la consola
        setUsers(data);
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista de usuarios.', 'error');
      });
  };

  // Cargar usuarios cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para eliminar un usuario
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
        // Hacer la solicitud DELETE a la API
        fetch(`${BASE_URL}/user/delete/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rut }),
        })
          .then((response) => {
            if (response.ok) {
              // Eliminar el usuario de la lista localmente
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

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Listado de Usuarios</h1>
        <NavLink
          to="/register" // La ruta a la que quieres redirigir
          className="bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4 text-center">
          Agregar Usuario
        </NavLink>
      </div>

      <p className="mb-4">
        Una lista de todos los usuarios en tu cuenta, incluyendo su nombre, rut, correo electrónico y rol.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Nombre Completo</th>
              <th className="py-2 px-4 text-left">Rut</th>
              <th className="py-2 px-4 text-left">Correo</th>
              <th className="py-2 px-4 text-left">Rol</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="py-2 px-4 text-left">
                  {`${user.firstName} ${user.lastName} ${user.motherLastName}`}
                </td>
                <td className="py-2 px-4 text-left">{user.rut}</td>
                <td className="py-2 px-4 text-left">{user.email}</td>
                <td className="py-2 px-4 text-left">{user.role}</td>
                <td className="py-2 px-4 flex justify-around">
                  <NavLink to={`/user/${user.rut}/details`} title="View Details" className="text-gray-400 hover:text-gray-300 mx-0.5">
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
