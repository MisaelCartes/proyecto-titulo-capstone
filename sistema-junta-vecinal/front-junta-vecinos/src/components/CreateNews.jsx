import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

export const CreateNews = () => {
  const { id } = useParams(); // Capturamos el ID desde los params
  console.log(id);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    source: '',
    author: '',
    publishedAt: '',
    dateVigencia: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState(null); // Estado separado para la imagen
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false); // Determina si estamos en modo edición o creación

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      // Realizamos el GET para obtener la noticia por su ID
      axios
        .get(`http://127.0.0.1:8000/obtener/noticia/${id}`) // Enviar el ID por parámetro
        .then((response) => {
          const { title, description, source, author, publishedAt, dateVigencia, category } = response.data;
          setFormData({
            title,
            description,
            source,
            author,
            publishedAt: dayjs(publishedAt).format('YYYY-MM-DDTHH:mm'), // Formato para input type="datetime-local"
            dateVigencia: dayjs(dateVigencia).format('YYYY-MM-DDTHH:mm'),
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
    setImageFile(file); // Guardar el archivo en el estado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Crear un FormData para manejar el envío de datos y archivos
    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('description', formData.description);
    dataToSend.append('source', formData.source);
    dataToSend.append('author', formData.author);
    dataToSend.append('publishedAt', dayjs(formData.publishedAt).format('YYYY-MM-DD HH:mm'));
    dataToSend.append('dateVigencia', dayjs(formData.dateVigencia).format('YYYY-MM-DD HH:mm'));
    dataToSend.append('category', formData.category);
    if (imageFile) {
      dataToSend.append('urlToImage', imageFile); // Agregar la imagen al FormData
    }
    if (isEditing) {
      dataToSend.append('id', id); // Agregar el id si estamos editando
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
        },
      });

      Swal.fire({
        icon: 'success',
        title: isEditing ? 'Noticia editada' : 'Noticia creada',
        text: `La noticia ha sido ${isEditing ? 'editada' : 'creada'} exitosamente.`,
      });

      setFormData({
        title: '',
        description: '',
        source: '',
        author: '',
        publishedAt: '',
        dateVigencia: '',
        category: '',
      });
      setImageFile(null);
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
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen w-full mt-8">
      <div className="max-w-3xl rounded-lg p-8 mx-auto bg-gray-800">
        <h2 className="mb-8 text-center text-2xl font-bold leading-9 text-white">
          {isEditing ? 'Editar noticia' : 'Crear una nueva noticia'}
        </h2>
        <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit}>
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-white">Título</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Ingrese un titulo"
              value={formData.title}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-white">Descripción</label>
            <textarea
              id="description"
              name="description"
              placeholder="Ingrese una descripción"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          <div>
            <label htmlFor="source" className="block text-sm font-medium text-white">Fuente</label>
            <input
              id="source"
              name="source"
              placeholder="Ingrese la fuente de la noticia"
              type="text"
              value={formData.source}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white"
            />
            {errors.source && <p className="text-red-500 text-xs mt-1">{errors.source}</p>}
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-white">Autor</label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="Ingrese el nombre del autor"
              value={formData.author}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white"
            />
            {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
          </div>
          <div>
            <label htmlFor="publishedAt" className="block text-sm font-medium text-white">Fecha de Publicación</label>
            <input
              id="publishedAt"
              name="publishedAt"
              type="datetime-local"
              placeholder="Ingrese la fecha de publicación"
              value={formData.publishedAt}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white"
            />
            {errors.publishedAt && <p className="text-red-500 text-xs mt-1">{errors.publishedAt}</p>}
          </div>
          <div>
            <label htmlFor="dateVigencia" className="block text-sm font-medium text-white">Fecha de Vigencia</label>
            <input
              id="dateVigencia"
              name="dateVigencia"
              type="datetime-local"
              placeholder="Ingrese la fecha de vigencia"
              value={formData.dateVigencia}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white"
            />
            {errors.dateVigencia && <p className="text-red-500 text-xs mt-1">{errors.dateVigencia}</p>}
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-white">Categoría</label>
            <input
              id="category"
              name="category"
              type="text"
              placeholder="Ingrese la categoría de la noticia"
              value={formData.category}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white"
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="urlToImage" className="block text-sm font-medium text-white">Imagen</label>
            <input
              id="urlToImage"
              name="urlToImage"
              type="file"
              onChange={handleImageChange}
              className="block w-full text-white"
            />
            {errors.urlToImage && <p className="text-red-500 text-xs mt-1">{errors.urlToImage}</p>}
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700"
            >
              {isEditing ? 'Actualizar Noticia' : 'Crear Noticia'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
