import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaUser, FaFolder, FaRegClipboard, FaEye, FaPaperPlane, FaFileAlt, FaTachometerAlt, FaMap, FaClipboardList, FaCog, FaQuestionCircle, FaBell, FaNewspaper } from 'react-icons/fa';
import ViewUser from './ViewUser';
import Dashboard from './Dasboard';
import { ViewNews } from './ViewNews';
import { CreateNews } from './CreateNews';
import CreateCertificationFrom from './CreateCertificationFrom'; // Importar el nuevo componente
import CertificadoStatus from './CertificadoStatus'; // Importar el nuevo componente

const SidebarPanel = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showCertificados, setShowCertificados] = useState(false);
    const [showReservas, setShowReservas] = useState(false);
    const [viewUser, setViewUser] = useState(false);
    const [viewDashboard, setViewDashboard] = useState(true);
    const [viewNews, setViewNews] = useState(false);
    const [viewCreateNews, setViewCreateNews] = useState(false);
    const [viewCreateCertification, setViewCreateCertification] = useState(false); // Nuevo estado
    const [viewCertificadoStatus, setViewCertificadoStatus] = useState(false); // Nuevo estado
    const navigate = useNavigate();
    const [rut, setRut] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                const { exp, rut } = decodedToken;
                setRut(rut);

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
        setViewUser(true);
        setViewDashboard(false);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
    };

    const handleNewsClick = () => {
        setViewNews(true);
        setViewDashboard(false);
        setViewUser(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
    };

    const handleCreateNewsClick = () => {
        setViewCreateNews(true);
        setViewDashboard(false);
        setViewUser(false);
        setViewNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
    };

    const handleCreateCertificationClick = () => {
        setViewCreateCertification(true);
        setViewDashboard(false);
        setViewUser(false);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCertificadoStatus(false);
    };

    const handleCertificadoStatusClick = () => {
        setViewCertificadoStatus(true);
        setViewDashboard(false);
        setViewUser(false);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
    };

    const handleBackClick = () => {
        setViewUser(false);
        setViewDashboard(true);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
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
                                onClick={() => { setViewDashboard(true); setViewUser(false); setViewNews(false); setViewCreateNews(false); setViewCreateCertification(false); setViewCertificadoStatus(false); }}
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
                                    <div
                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
                                        onClick={handleCreateCertificationClick}
                                    >
                                        <FaRegClipboard className="mr-2" />
                                        <span>Solicitar Certificado</span>
                                    </div>
                                    <div
                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
                                        onClick={handleCertificadoStatusClick}
                                    >
                                        <FaFolder className="mr-2" />
                                        <span>Consultar Solicitudes</span>
                                    </div>
                                </div>
                            )}

                            <div className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer" onClick={toggleReservas}>
                                <FaNewspaper className="mr-2" />
                                <span>Noticias</span>
                            </div>
                            {showReservas && (
                                <div className="pl-4">
                                    <div
                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
                                        onClick={handleCreateNewsClick}
                                    >
                                        <FaPaperPlane className="mr-2" />
                                        <span>Publicar Noticia</span>
                                    </div>
                                    <div
                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
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
                            to={`/user/${rut}/edit`}
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
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {viewUser ? (
                    <ViewUser onBackClick={handleBackClick} />
                ) : viewDashboard ? (
                    <Dashboard />
                ) : viewNews ? (
                    <ViewNews onBackClick={handleBackClick} />
                ) : viewCreateNews ? (
                    <CreateNews />
                ) : viewCreateCertification ? (
                    <CreateCertificationFrom onBackClick={handleBackClick} />
                ) : viewCertificadoStatus ? (
                    <CertificadoStatus onBackClick={handleBackClick} />
                ) : null}
            </div>
        </div>
    );
};

export default SidebarPanel;