import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useTheme } from '../context/ThemeContext';


export const ViewNews = () => {
    const [articles, setArticles] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    const validateToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken && decodedToken.exp > currentTime;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            if (!decodedToken || !validateToken()) {
                localStorage.removeItem('token');
                navigate('/');
                return;
            }
            setUserRole(decodedToken.rol);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            localStorage.removeItem('token');
            Swal.fire('Error', 'No se pudo verificar el token.', 'error');
            navigate('/');
        }
    }, [navigate]);

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


    const handleDelete = async (id) => {
        if (!validateToken() || userRole !== "1") {
            Swal.fire('Error', 'No tienes permisos para realizar esta acción', 'error');
            navigate('/');
            return;
        }

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
                    const token = localStorage.getItem('token');
                    if (!token) throw new Error('No token available');

                    await axios.delete('http://127.0.0.1:8000/eliminar/noticia/', {
                        headers: { Authorization: `Bearer ${token}` },
                        data: { id }
                    });
                    Swal.fire('¡Eliminado!', 'La noticia ha sido eliminada.', 'success');
                    setArticles(articles.filter(article => article.id !== id));
                } catch (error) {
                    if (error.response?.status === 401 || error.response?.status === 403) {
                        Swal.fire('Error', 'No tienes permisos para realizar esta acción', 'error');
                        navigate('/');
                    } else {
                        Swal.fire('Error', 'No se pudo eliminar la noticia', 'error');
                    }
                }
            }
        });
    };

    const { themes } = useTheme();
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
        <div className="max-w-6xl mx-auto p-6" style={{ backgroundColor: themes.background, color: themes.text }}>
            <h2 className="text-3xl font-bold text-center mb-6" style={{ color: themes.text }}>Noticias de la Comunidad</h2>
            <p className="text-center mb-12" style={{ color: themes.text }}>
                Mantente informado sobre los eventos, actividades y anuncios importantes de nuestro barrio.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <div key={index} className="rounded-lg shadow-md overflow-hidden" style={{ backgroundColor: themes.card, color: themes.text }}>
                            <img
                                src={`http://localhost:8000/${article.urlToImage}`}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <p className="text-sm" style={{ color: themes.secondary }}>
                                    {new Date(article.publishedAt).toLocaleDateString()} • {article.category}
                                </p>
                                <h3 className="text-lg font-semibold mt-2" style={{ color: themes.text }}>{article.title}</h3>
                                <p className="mt-2" style={{ color: themes.secondary }}>
                                    {truncateDescription(article.description)}
                                </p>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center space-x-4">
                                        {userRole === "1" && validateToken() && (
                                            <>
                                                <NavLink
                                                    to={`/noticias/${article.id}/edit`}
                                                    title="Editar"
                                                    className="hover:underline transition-colors duration-300"
                                                    style={{ color: themes.primary }}
                                                >
                                                    <FaEdit className="h-6 w-6" />
                                                </NavLink>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    title="Eliminar"
                                                    className="hover:text-red-500 transition-colors duration-300"
                                                    style={{ color: '#ff0000' }}
                                                >
                                                    <FaTrash className="h-6 w-6" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => openModal(article)}
                                        className="py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                                        style={{ backgroundColor: themes.primary, color: themes.card }}
                                    >
                                        Leer más
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center" style={{ color: themes.secondary }}>No hay noticias disponibles.</p>
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className="max-w-4xl mx-auto p-8 rounded-lg shadow-2xl relative mt-16 outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
                style={{
                    overlay: { zIndex: 1000 },
                    content: { maxHeight: '85vh', overflowY: 'auto', backgroundColor: themes.card, color: themes.text }
                }}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 hover:text-red-500 transition duration-300"
                    style={{ color: themes.secondary }}
                >
                    <FaTimes size={24} />
                </button>
                {selectedArticle && (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold" style={{ color: themes.text }}>{selectedArticle.title}</h1>
                        <div className="flex items-center text-sm space-x-4" style={{ color: themes.secondary }}>
                            <p><b>Fecha de Publicación:</b> {new Date(selectedArticle.publishedAt).toLocaleDateString()}</p>
                            <span>•</span>
                            <p><b>Vigencia:</b> {new Date(selectedArticle.dateVigencia).toLocaleDateString()}</p>
                            <span>•</span>
                            <p><b>{selectedArticle.category}</b></p>
                        </div>
                        <img
                            src={`http://localhost:8000/${selectedArticle.urlToImage}`}
                            alt={selectedArticle.title}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                        <div className="prose max-w-none">
                            <h2 className="text-xl font-semibold" style={{ color: themes.text }}>Descripción</h2>
                            <p className="leading-relaxed" style={{ color: themes.secondary }}>{selectedArticle.description}</p>
                        </div>
                        <div className="mt-8 pt-4" style={{ borderTopColor: themes.border, borderTopWidth: '1px' }}>
                            <p className="text-sm" style={{ color: themes.secondary }}>
                                <b>Autor:</b> {selectedArticle.author} | <b>Fuente:</b> {selectedArticle.source}
                            </p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};