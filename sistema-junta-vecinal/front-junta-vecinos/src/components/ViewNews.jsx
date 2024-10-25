import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const ViewNews = () => {
    const [articles, setArticles] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/noticias/');
                setArticles(response.data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error cargando las publicaciones del blog.',
                });
            }
        };

        fetchData();
    }, []);

    const getOneArticle = async (id) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/obtener/noticia/', {
                data: { id }
            });
            return response.data;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al obtener la noticia.',
            });
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete('http://127.0.0.1:8000/eliminar/noticia/', {
                        data: { id }
                    });
                    Swal.fire('¡Eliminado!', 'La noticia ha sido eliminada.', 'success');
                    setArticles(articles.filter(article => article.id !== id));
                } catch (error) {
                    Swal.fire('Error', 'No se pudo eliminar la noticia', 'error');
                }
            }
        });
    };

    const openModal = (article) => {
        setSelectedArticle(article);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedArticle(null);
    };

    const truncateDescription = (description, maxLength = 100) => {
        if (!description) return '';
        if (description.length <= maxLength) return description;
        return description.slice(0, maxLength) + '...';
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Noticias de la Comunidad</h2>
            <p className="text-center text-gray-600 mb-12">
                Mantente informado sobre los eventos, actividades y anuncios importantes de nuestro barrio.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={`http://localhost:8000/${article.urlToImage}`}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <p className="text-sm text-gray-500">
                                    {new Date(article.publishedAt).toLocaleDateString()} • {article.category}
                                </p>
                                <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
                                <p className="text-gray-600 mt-2">
                                    {truncateDescription(article.description)}
                                </p>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center space-x-4">
                                        <NavLink
                                            to={`/noticias/${article.id}/edit`}
                                            title="Editar"
                                            className="text-green-500 hover:text-green-400 transition-colors duration-300"
                                        >
                                            <FaEdit className="h-6 w-6" />
                                        </NavLink>
                                        <button
                                            onClick={() => handleDelete(article.id)}
                                            title="Eliminar"
                                            className="text-red-600 hover:text-red-500 transition-colors duration-300"
                                        >
                                            <FaTrash className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => openModal(article)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                                    >
                                        Leer más
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No hay noticias disponibles.</p>
                )}
            </div>


            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-2xl relative mt-16 outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
                style={{
                    overlay: { zIndex: 1000 },
                    content: { maxHeight: '85vh', overflowY: 'auto' }
                }}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-300"
                >
                    <FaTimes size={24} />
                </button>
                {selectedArticle && (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-gray-800">{selectedArticle.title}</h1>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <p><b>Fecha de Publicación: </b> {new Date(selectedArticle.publishedAt).toLocaleDateString()}</p>
                            <span>•</span>
                            <p><b>Vigencia: </b>{new Date(selectedArticle.dateVigencia).toLocaleDateString()}</p>
                            <span>•</span>
                            <p><b>{selectedArticle.category}</b></p>
                        </div>
                        <img
                            src={`http://localhost:8000/${selectedArticle.urlToImage}`}
                            alt={selectedArticle.title}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                        <div className="prose max-w-none">
                            <h2 className="text-xl font-semibold text-gray-700">Descripción</h2>
                            <p className="text-gray-600 leading-relaxed">{selectedArticle.description}</p>
                        </div>
                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                <b>Autor: </b>{selectedArticle.author} | <b>Fuente: </b>{selectedArticle.source}
                            </p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};