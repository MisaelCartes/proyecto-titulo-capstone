import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { useTheme } from '../context/ThemeContext';

export const CreateNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    source: '',
    author: '',
    publishedAt: '',
    dateVigencia: '',
    category: '',
  });
  const { themes } = useTheme();

  const handleBack = () => {
    // Navegar a la página anterior
    navigate(-1);
  };
  const token = localStorage.getItem('token');
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [rol, setRol] = useState(null);

  const checkUserRole = () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { rol } = decodedToken;
        setRol(rol);
        if (rol !== "1") {
          Swal.fire('Acceso Denegado', 'No tienes permiso para acceder a esta página.', 'error');
          navigate('/panel');
        }
      } catch (error) {
        console.error('Error decodificando el token:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkUserRole();

    if (id) {
      setIsEditing(true);
      axios
        .get(`http://127.0.0.1:8000/obtener/noticia/`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { id }
        })
        .then((response) => {
          const { title, description, source, author, publishedAt, dateVigencia, category } = response.data;
          // Formatear las fechas para el input datetime-local
          const formattedPublishedAt = dayjs(publishedAt).format('YYYY-MM-DDTHH:mm');
          const formattedDateVigencia = dayjs(dateVigencia).format('YYYY-MM-DDTHH:mm');

          setFormData({
            title,
            description,
            source,
            author,
            publishedAt: formattedPublishedAt,
            dateVigencia: formattedDateVigencia,
            category,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar la noticia',
            text: 'No se pudo cargar la noticia. Inténtalo más tarde.',
          });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Función para el formato de edición
  const formatDateForAPIEdit = (dateString) => {
    const date = dayjs(dateString);
    return date.format('YYYY-MM-DDTHH:mm:ss'); // Formato para edición
  };

  // Función para el formato de creación
  const formatDateForAPICreate = (dateString) => {
    const date = dayjs(dateString);
    return date.format('YYYY-MM-DD HH:mm'); // Formato para creación
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('description', formData.description);
    dataToSend.append('source', formData.source);
    dataToSend.append('author', formData.author);

    // Usar el formato según el caso (edición o creación)
    if (isEditing) {
      dataToSend.append('publishedAt', formatDateForAPIEdit(formData.publishedAt));
      dataToSend.append('dateVigencia', formatDateForAPIEdit(formData.dateVigencia));
    } else {
      dataToSend.append('publishedAt', formatDateForAPICreate(formData.publishedAt));
      dataToSend.append('dateVigencia', formatDateForAPICreate(formData.dateVigencia));
    }
    dataToSend.append('category', formData.category);
    if (imageFile) {
      dataToSend.append('urlToImage', imageFile);
    }
    if (isEditing) {
      dataToSend.append('id', id);
    }

    try {
      const endpoint = isEditing
        ? `http://127.0.0.1:8000/editar/noticia/`
        : `http://127.0.0.1:8000/crear/noticias/`;

      const response = await axios({
        method: isEditing ? 'PUT' : 'POST',
        url: endpoint,
        data: dataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });

      Swal.fire({
        icon: 'success',
        title: isEditing ? 'Noticia editada' : 'Noticia creada',
        text: `La noticia ha sido ${isEditing ? 'editada' : 'creada'} exitosamente.`,
      });

      navigate('/panel'); // Redirigir después de crear/editar exitosamente

    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.error || 'Hubo un problema al procesar la solicitud.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al procesar la solicitud. Por favor, intenta nuevamente.',
        });
      }
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto h-screen w-full" style={{ backgroundColor: themes.background }}>
    <div className="max-w-3xl rounded-lg p-8 mx-auto bg-gray-800">
        {isEditing && (
          <div className="mb-4 text-left">
            <button
              onClick={handleBack}
              className="rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700"
            >
              Volver
            </button>
          </div>
        )}

        <h2 className="mb-8 text-center text-2xl font-bold leading-9 text-white">
          {isEditing ? 'Editar noticia' : 'Crear una nueva noticia'}
        </h2>

        <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit}>
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">Título</label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Ingrese un titulo"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">Descripción</label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                placeholder="Ingrese una descripción"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="source" className="block text-sm font-medium leading-6 text-white">Fuente</label>
            <div className="mt-2">
              <input
                id="source"
                name="source"
                placeholder="Ingrese la fuente de la noticia"
                type="text"
                value={formData.source}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.source && <p className="text-red-500 text-xs mt-1">{errors.source}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium leading-6 text-white">Autor</label>
            <div className="mt-2">
              <input
                id="author"
                name="author"
                type="text"
                placeholder="Ingrese el nombre del autor"
                value={formData.author}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="publishedAt" className="block text-sm font-medium leading-6 text-white">Fecha de Publicación</label>
            <div className="mt-2">
              <input
                id="publishedAt"
                name="publishedAt"
                type="datetime-local"
                step="1"
                value={formData.publishedAt}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.publishedAt && <p className="text-red-500 text-xs mt-1">{errors.publishedAt}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="dateVigencia" className="block text-sm font-medium leading-6 text-white">Fecha de Vigencia</label>
            <div className="mt-2">
              <input
                id="dateVigencia"
                name="dateVigencia"
                type="datetime-local"
                step="1"
                value={formData.dateVigencia}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.dateVigencia && <p className="text-red-500 text-xs mt-1">{errors.dateVigencia}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">Categoría</label>
            <div className="mt-2">
              <input
                id="category"
                name="category"
                type="text"
                placeholder="Ingrese la categoría de la noticia"
                value={formData.category}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="urlToImage" className="block text-sm font-medium leading-6 text-white">Imagen</label>
            <div className="mt-2">
              <input
                id="urlToImage"
                name="urlToImage"
                type="file"
                onChange={handleImageChange}
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {errors.urlToImage && <p className="text-red-500 text-xs mt-1">{errors.urlToImage}</p>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {isEditing ? 'Actualizar Noticia' : 'Crear Noticia'}
            </button>
          </div>
        </form>
    </div>
</div>

  );
};