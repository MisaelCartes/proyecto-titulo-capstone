import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaUser, FaFolder, FaRegClipboard, FaEye, FaPaperPlane, FaFileAlt, FaTachometerAlt, FaMap, FaClipboardList, FaCog, FaQuestionCircle, FaBell, FaNewspaper } from 'react-icons/fa';
import ViewUser from './ViewUser'; // Asegúrate de importar tu componente
import Dashboard from './Dasboard';
import { ViewNews } from './ViewNews';


const SidebarPanel = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showCertificados, setShowCertificados] = useState(false);
    const [showReservas, setShowReservas] = useState(false);
    const [viewUser, setViewUser] = useState(false); // Estado para controlar la vista de usuarios
    const [viewDashboard, setViewDashboard] = useState(true); // Estado para mostrar el Dashboard
    const [viewNews, setViewNews] = useState(false); // Nuevo estado para controlar la vista de noticias
    const navigate = useNavigate(); // Hook para la navegación
    const [rut, setRut] = useState(null); // Estado para almacenar el rut

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                const { exp, rut } = decodedToken;
                setRut(rut); // Guardar el rut en el estado

                if (exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    console.log('Token válido');
                }
            } catch (error) {
                console.error('Error decodificando el token:', error);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleCertificados = () => {
        setShowCertificados(!showCertificados);
    };

    const toggleReservas = () => {
        setShowReservas(!showReservas);
    };

    const handleUserClick = () => {
        setViewUser(true); // Activar la vista de usuario
        setViewDashboard(false); // Desactivar la vista del Dashboard
        setViewNews(false); // Desactivar la vista de noticias
    };

    const handleNewsClick = () => {
        setViewNews(true); // Activar la vista de noticias
        setViewDashboard(false); // Desactivar la vista del Dashboard
        setViewUser(false); // Desactivar la vista de usuarios
    };

    const handleBackClick = () => {
        setViewUser(false); // Volver a la vista anterior
        setViewDashboard(true); // Activar la vista del Dashboard
        setViewNews(false); // Desactivar la vista de noticias
    };

    return (
        <div className="flex">
            {/* Menú Plegable */}
            <div className={`transition-width duration-300 bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-16'} h-screen relative flex flex-col`}>
                {/* Logo */}
                <div className="flex items-center justify-center py-4">
                    <img
                        src="/diversity.png"
                        alt="Logo"
                        className={`${isOpen ? 'block' : 'hidden'} h-10 w-10`}
                    />
                </div>

                {/* Botón de Plegar */}
                <div className="absolute right-0 top-0 transform translate-x-1/2">
                    <button
                        onClick={toggleSidebar}
                        className="m-8 p-1 bg-gray-700 rounded-full focus:outline-none hover:bg-gray-600"
                    >
                        <span className="text-white text-lg">{isOpen ? '<' : '>'}</span>
                    </button>
                </div>

                {/* Ítems del Menú */}
                <div className="mt-10 flex-grow overflow-y-auto">
                    {isOpen && (
                        <>
                            <NavLink
                                to="/panel"
                                className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                                activeClassName="bg-gray-600"
                                onClick={() => { setViewDashboard(true); setViewUser(false); setViewNews(false); }} // Cambiar a Dashboard
                            >
                                <FaTachometerAlt className="mr-2" />
                                <span>Dashboard</span>
                            </NavLink>
                            <div
                                className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
                                onClick={handleUserClick}
                            >
                                <FaUser className="mr-2" />
                                <span>Usuarios</span>
                            </div>
                            <div className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer" onClick={toggleCertificados}>
                                <FaFileAlt className="mr-2" />
                                <span>Certificados</span>
                            </div>
                            {showCertificados && (
                                <div className="pl-4">
                                    <NavLink
                                        to="/certificados/solicitar"
                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                                        activeClassName="bg-gray-600"
                                    >
                                        <FaRegClipboard className="mr-2" />
                                        <span>Solicitar Certificado</span>
                                    </NavLink>
                                    <NavLink
                                        to="/solicitudes/consultar"
                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                                        activeClassName="bg-gray-600"
                                    >
                                        <FaFolder className="mr-2" />
                                        <span>Consultar Solicitudes</span>
                                    </NavLink>
                                </div>
                            )}

                            <div className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer" onClick={toggleReservas}>
                                <FaNewspaper className="mr-2" />
                                <span>Noticias</span>
                            </div>
                            {showReservas && (
                                <div className="pl-4">
                                    <NavLink
                                        to="/noticias/publicar"
                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                                        activeClassName="bg-gray-600"
                                        onClick={handleNewsClick}
                                    >
                                        <FaPaperPlane className="mr-2" />
                                        <span>Publicar Nueva Noticia</span>
                                    </NavLink>
                                    <div

                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                                        activeClassName="bg-gray-600"
                                        onClick={handleNewsClick}
                                    >
                                        <FaEye className="mr-2" />
                                        <span>Ver Noticias</span>
                                    </div>
                                </div>
                            )}
                            <NavLink
                                to="/mapas"
                                className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                                activeClassName="bg-gray-600"
                            >
                                <FaMap className="mr-2" />
                                <span>Mapas</span>
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Mi Perfil, Configuraciones y Ayuda al final del menú */}
                {isOpen && (
                    <div className="mt-auto mb-4">
                        <NavLink
                            to={`/user/${rut}/edit`} // Usa el rut en la ruta
                            className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                            activeClassName="bg-gray-600"
                        >
                            <img src="/boy.png" alt="Avatar" className="h-6 w-6 rounded-full mr-2" />
                            <span>Mi Perfil</span>
                        </NavLink>
                        <NavLink
                            to="/configuraciones"
                            className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                            activeClassName="bg-gray-600"
                        >
                            <FaCog className="mr-2" />
                            <span>Configuraciones</span>
                        </NavLink>
                        <NavLink
                            to="/ayuda"
                            className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                            activeClassName="bg-gray-600"
                        >
                            <FaQuestionCircle className="mr-2" />
                            <span>Ayuda</span>
                        </NavLink>
                    </div>
                )}
            </div>

            {/* Contenido Principal */}
            <div className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen">
                {/* Barra de búsqueda */}
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {viewUser ? (
                    <ViewUser onBackClick={handleBackClick} /> // Renderizar ViewUser
                ) : viewDashboard ? (
                    <Dashboard /> // Renderizar Dashboard
                ) : viewNews ? (
                    <ViewNews onBackClick={handleBackClick} /> // Renderizar ViewNews
                ) : null}
            </div>
        </div>
    );
};

export default SidebarPanel;
