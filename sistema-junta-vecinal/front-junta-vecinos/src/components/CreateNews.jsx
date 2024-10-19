import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import dayjs from 'dayjs';

export const CreateNews = () => {
  const [formData, setFormData] = useState({
    title: 'Nueva Noticia',
    description: 'Es una nueva noticia',
    source: 'Noticia importante...',
    author: 'Jimmy Huste',
    publishedAt: '',
    dateVigencia: '',
    category: 'Informativo',
  });
  const [imageFile, setImageFile] = useState(null); // Estado separado para la imagen
  const [errors, setErrors] = useState({});

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

    try {
      const response = await axios.post('http://127.0.0.1:8000/crear/noticias/', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Asegurarse de que el tipo de contenido sea multipart/form-data
        },
      });

      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Noticia creada',
        text: 'La noticia se ha creado exitosamente.',
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
        // Verificar si el error contiene el mensaje específico
        if (error.response.data.error === 'Solo se permiten imágenes en formato .jpg, .jpeg o .png.') {
          Swal.fire({
            icon: 'error',
            title: 'Error en el formato de imagen',
            text: error.response.data.error,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al crear la noticia. Por favor, intenta nuevamente.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear la noticia. Por favor, intenta nuevamente.',
        });
      }
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen w-full mt-8">
      <div className="max-w-3xl rounded-lg p-8 mx-auto bg-gray-800">
        <h2 className="mb-8 text-center text-2xl font-bold leading-9 text-white">
          Crear una nueva noticia
        </h2>
        <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit}>
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-white">Título</label>
            <input
              id="title"
              name="title"
              type="text"
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
              value={formData.category}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white"
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
          <div>
            <label htmlFor="urlToImage" className="block text-sm font-medium text-white">Cargar Imagen</label>
            <input
              id="urlToImage"
              name="urlToImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white"
            />
            {errors.urlToImage && <p className="text-red-500 text-xs mt-1">{errors.urlToImage}</p>}
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700"
            >
              Crear Noticia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
