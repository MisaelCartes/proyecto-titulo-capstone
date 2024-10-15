import React, { useEffect, useState } from 'react'; 
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

const dummyData = {
  status: "ok",
  totalResults: 3,
  articles: [
    {
      source: "Comunidad Renca",
      author: "Misael Cartes",
      title: "Actualización de Proyectos Comunitarios",
      description: "Conoce los avances más recientes en los proyectos de mejora del vecindario, que abarcan una variedad de iniciativas diseñadas para transformar nuestra comunidad en un lugar más atractivo, funcional y seguro para todos sus residentes. Entre las mejoras más destacadas se encuentran la creación de nuevas áreas verdes que no solo embellecerán el paisaje urbano, sino que también proporcionarán espacios recreativos para que las familias y los niños puedan disfrutar de actividades al aire libre. Estos parques contarán con modernos juegos infantiles, zonas de picnic y senderos para caminatas, lo que fomentará un estilo de vida más saludable y activo entre los vecinos. ",
      urlToImage: "/blog.jpg",
      publishedAt: "2020-03-16",
      category: "Informativa"
    },
    {
      source: "Comunidad Pudahuel",
      author: "Jimmy Huste Exantus",
      title: "Consejos para la Seguridad del Barrio",
      description: "Conoce los avances más recientes en los proyectos de mejora del vecindario, que abarcan una variedad de iniciativas diseñadas para transformar nuestra comunidad en un lugar más atractivo, funcional y seguro para todos sus residentes. Entre las mejoras más destacadas se encuentran la creación de nuevas áreas verdes que no solo embellecerán el paisaje urbano, sino que también proporcionarán espacios recreativos para que las familias y los niños puedan disfrutar de actividades al aire libre. Estos parques contarán con modernos juegos infantiles, zonas de picnic y senderos para caminatas, lo que fomentará un estilo de vida más saludable y activo entre los vecinos.",
      urlToImage: "/blog.jpg",
      publishedAt: "2020-03-10",
      category: "Seguridad y Prevención"
    },
    {
      source: "Comunidad Santiago",
      author: "Felipe Sandobal",
      title: "Aviso Importante sobre Nuevas Normativas",
      description: "Informamos sobre los cambios recientes en las normativas locales...",
      urlToImage: "/blog.jpg",
      publishedAt: "2020-02-12",
      category: "Avisos y Comunicados"
    }
  ]
};

export const ViewNews = () => {
    const [articles, setArticles] = useState([]);
    const [errors, setErrors] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = dummyData; // Usando datos de prueba
          setArticles(data.articles);
        } catch (error) {
          setErrors({ fetch: "Error cargando las publicaciones del blog." });
        }
      };

      fetchData();
    }, []);

    const openModal = (article) => {
      setSelectedArticle(article);
      setModalIsOpen(true);
    };

    const closeModal = () => {
      setModalIsOpen(false);
      setSelectedArticle(null);
    };

    const truncateDescription = (description, maxLength = 100) => {
      if (description.length <= maxLength) return description;
      return description.slice(0, maxLength) + '...';
    };

    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Noticias de la Comunidad</h2>
        <p className="text-center text-gray-600 mb-12">
          Mantente informado sobre los eventos, actividades y anuncios importantes de nuestro barrio.
        </p>
        {errors.fetch && <p className="text-red-500">{errors.fetch}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()} • {article.category}</p>
                <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
                <p className="text-gray-600 mt-2">
                  {truncateDescription(article.description)}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => openModal(article)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Leer más
                  </button>
                </div>
              </div>
            </div>
          ))}
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
                <p>{new Date(selectedArticle.publishedAt).toLocaleDateString()}</p>
                <span>•</span>
                <p>{selectedArticle.category}</p>
              </div>
              <img 
                src={selectedArticle.urlToImage} 
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