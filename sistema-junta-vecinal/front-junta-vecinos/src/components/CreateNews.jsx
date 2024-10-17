import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export const CreateNews = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    source: '',
    author: '',
    publishedAt: '',
    category: '',
    urlToImage: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reiniciar errores previos

    try {
      // Enviar solicitud a /create/news
      await axios.post('http://127.0.0.1:8000/create/news', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Noticia creada',
        text: 'La noticia se ha creado exitosamente.',
      });

      // Reiniciar formulario
      setFormData({
        title: '',
        description: '',
        source: '',
        author: '',
        publishedAt: '',
        category: '',
        urlToImage: '',
      });
    } catch (error) {
      // Manejar errores
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }

      // Mostrar mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear la noticia. Por favor, intenta nuevamente.',
      });
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen w-full mt-8"> {/* Ancho del contenedor ajustado */}
      <div
        className="max-w-3xl rounded-lg p-8 mx-auto bg-gray-800" // Color de fondo para el formulario
        style={{ width: '100%' }} // Aseguramos que el formulario tenga un ancho del 100%
      >
        <h2 className="mb-8 text-center text-2xl font-bold leading-9 text-white">
          Crear una nueva noticia
        </h2>

        <form
          className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          onSubmit={handleSubmit}
        >
          {/** Título */}
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white"
            >
              Título
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
          </div>

          {/** Descripción */}
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Descripción
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/** Fuente */}
          <div className="sm:col-span-1">
            <label
              htmlFor="source"
              className="block text-sm font-medium text-white"
            >
              Fuente
            </label>
            <div className="mt-2">
              <input
                id="source"
                name="source"
                type="text"
                value={formData.source}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.source && (
                <p className="text-red-500 text-xs mt-1">{errors.source}</p>
              )}
            </div>
          </div>

          {/** Autor */}
          <div className="sm:col-span-1">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-white"
            >
              Autor
            </label>
            <div className="mt-2">
              <input
                id="author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.author && (
                <p className="text-red-500 text-xs mt-1">{errors.author}</p>
              )}
            </div>
          </div>

          {/** Fecha de publicación */}
          <div className="sm:col-span-1">
            <label
              htmlFor="publishedAt"
              className="block text-sm font-medium text-white"
            >
              Fecha de publicación
            </label>
            <div className="mt-2">
              <input
                id="publishedAt"
                name="publishedAt"
                type="date"
                value={formData.publishedAt}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.publishedAt && (
                <p className="text-red-500 text-xs mt-1">{errors.publishedAt}</p>
              )}
            </div>
          </div>

          {/** Categoría */}
          <div className="sm:col-span-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-white"
            >
              Categoría
            </label>
            <div className="mt-2">
              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          {/** URL de la imagen */}
          <div className="sm:col-span-1">
            <label
              htmlFor="urlToImage"
              className="block text-sm font-medium text-white"
            >
              Seleccionar imagen
            </label>
            <div className="mt-2">
              <input
                id="urlToImage"
                name="urlToImage"
                type="file"
                accept="image/*" // Aceptar solo archivos de imagen
                onChange={(e) => handleChange(e)} // Cambiar la función según sea necesario
                required
                className="block w-full rounded-md bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {errors.urlToImage && (
                <p className="text-red-500 text-xs mt-1">{errors.urlToImage}</p>
              )}
            </div>
          </div>


          {/** Botón de envío */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Crear Noticia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
