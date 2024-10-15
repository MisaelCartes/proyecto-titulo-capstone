import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export const CreateNews = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    date: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset previous errors

    // Create form data for sending to the backend
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('author', formData.author);
    data.append('date', formData.date);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      // Send request to /create/news
      await axios.post('http://127.0.0.1:8000/create/news', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Noticia creada',
        text: 'La noticia se ha creado exitosamente.',
      });

      // Reset form
      setFormData({
        title: '',
        content: '',
        author: '',
        date: '',
        image: null,
      });
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }

      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear la noticia. Por favor, intenta nuevamente.',
      });
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8"
      style={{ backgroundColor: '#0D1A2D' }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="/diversity.png"
          alt="Junta Vecinos"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Crear una nueva noticia
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-3xl">
        <form
          className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          onSubmit={handleSubmit}
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-white"
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
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-white"
            >
              Contenido
            </label>
            <div className="mt-2">
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="4"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.content && (
                <p className="text-red-500 text-xs mt-1">{errors.content}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium leading-6 text-white"
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
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.author && (
                <p className="text-red-500 text-xs mt-1">{errors.author}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-white"
            >
              Fecha
            </label>
            <div className="mt-2">
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 text-white"
            >
              Imagen (opcional)
            </label>
            <div className="mt-2">
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-indigo-600 ring-inset hover:bg-indigo-700 focus:outline focus:outline-2 focus:outline-indigo-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            >
              Crear noticia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
