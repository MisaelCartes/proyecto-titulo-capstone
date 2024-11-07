import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaUser, FaFolder, FaRegClipboard, FaClipboardCheck, FaEye, FaPaperPlane, FaFileAlt, FaTachometerAlt, FaMap, FaClipboardList, FaCog, FaQuestionCircle, FaBell, FaNewspaper, FaUserPlus } from 'react-icons/fa';
import ViewUser from './ViewUser';
import Dashboard from './Dasboard';
import { ViewNews } from './ViewNews';
import { CreateNews } from './CreateNews';
import CreateCertificationFrom from './CreateCertificationFrom';
import CertificadoStatus from './CertificadoStatus';
import { FamilyRegister } from './FamilyRegister';
import MapaInteractive from './MapaInteractive';
import CertificadoMoveStatus from './CertificadoMoveStatus';

const SidebarPanel = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showCertificados, setShowCertificados] = useState(false);
    const [showReservas, setShowReservas] = useState(false);
    const [showUsuarios, setShowUsuarios] = useState(false);
    const [viewUser, setViewUser] = useState(false);
    const [viewDashboard, setViewDashboard] = useState(true);
    const [viewNews, setViewNews] = useState(false);
    const [viewCreateNews, setViewCreateNews] = useState(false);
    const [viewCreateCertification, setViewCreateCertification] = useState(false);
    const [viewCertificadoStatus, setViewCertificadoStatus] = useState(false);
    const [viewFamilyRegister, setViewFamilyRegister] = useState(false);
    const [viewMapa, setViewMapa] = useState(false);
    const [viewCertificadoMoveStatus, setViewCertificadoMoveStatus] = useState(false);
    const navigate = useNavigate();
    const [rut, setRut] = useState(null);
    const [rol, setRole] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                const { exp, rut, rol } = decodedToken;
                setRut(rut);
                setRole(rol);
                console.log(rol)

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

    const toggleUsuarios = () => {
        setShowUsuarios(!showUsuarios);
    };

    const handleUserClick = () => {
        setViewUser(true);
        setViewDashboard(false);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
        setViewFamilyRegister(false);
        setViewMapa(false);
        setViewCertificadoMoveStatus(false);
    };

    const handleNewsClick = () => {
        setViewNews(true);
        setViewDashboard(false);
        setViewUser(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
        setViewFamilyRegister(false);
        setViewMapa(false);
        setViewCertificadoMoveStatus(false);
    };

    const handleCreateNewsClick = () => {
        setViewCreateNews(true);
        setViewDashboard(false);
        setViewUser(false);
        setViewNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
        setViewFamilyRegister(false);
        setViewMapa(false);
        setViewCertificadoMoveStatus(false);
    };

    const handleCreateCertificationClick = () => {
        setViewCreateCertification(true);
        setViewDashboard(false);
        setViewUser(false);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCertificadoStatus(false);
        setViewFamilyRegister(false);
        setViewMapa(false);
        setViewCertificadoMoveStatus(false);
    };

    const handleCertificadoStatusClick = () => {
        setViewCertificadoStatus(true);
        setViewDashboard(false);
        setViewUser(false);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
        setViewFamilyRegister(false);
        setViewMapa(false);
        setViewCertificadoMoveStatus(false);
    };

    const handleFamilyRegisterClick = () => {
        setViewFamilyRegister(true);
        setViewDashboard(false);
        setViewUser(false);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
        setViewMapa(false);
        setViewCertificadoMoveStatus(false);
    };

    const handleBackClick = () => {
        setViewDashboard(true);
        setViewUser(false);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
        setViewFamilyRegister(false);
        setViewMapa(false);
        setViewCertificadoMoveStatus(false);
    };

    const handleMapaClick = () => {
        setViewMapa(true);
        setViewUser(false);
        setViewDashboard(false);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
        setViewFamilyRegister(false);
        setViewCertificadoMoveStatus(false);
    };

    const handleCertificadoMoveStatusClick = () => {
        setViewCertificadoMoveStatus(true);
        setViewDashboard(false);
        setViewUser(false);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
        setViewFamilyRegister(false);
        setViewMapa(false);
    };

    return (
        <div className="flex">
            <div className={`transition-width duration-300 bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-16'} h-screen relative flex flex-col`}>
                <div className="flex items-center justify-center py-4">
                    <img
                        src="/diversity.png"
                        alt="Logo"
                        className={`${isOpen ? 'block' : 'hidden'} h-10 w-10`}
                    />
                </div>

                <div className="absolute right-0 top-0 transform translate-x-1/2">
                    <button
                        onClick={toggleSidebar}
                        className="m-8 p-1 bg-gray-700 rounded-full focus:outline-none hover:bg-gray-600"
                    >
                        <span className="text-white text-lg">{isOpen ? '<' : '>'}</span>
                    </button>
                </div>

                <div className="mt-10 flex-grow overflow-y-auto">
                    {isOpen && (
                        <>
                            {rol === "1" && (
                                <NavLink
                                    to="/panel"
                                    className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                                    activeClassName="bg-gray-600"
                                    onClick={() => { setViewDashboard(true); setViewUser(false); setViewNews(false); setViewCreateNews(false); setViewCreateCertification(false); setViewCertificadoStatus(false); setViewFamilyRegister(false); }}
                                >
                                    <FaTachometerAlt className="mr-2" />
                                    <span>Dashboard</span>
                                </NavLink>
                            )}

                            {(rol === "1" || rol === "2") && (
                                <div
                                    className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
                                    onClick={toggleUsuarios}
                                >
                                    <FaUser className="mr-2" />
                                    <span>Usuarios</span>
                                </div>
                            )}

                            <div className="pl-4">
                                {rol === "1" && showUsuarios && (
                                    <div
                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
                                        onClick={handleUserClick}
                                    >
                                        <FaUser className="mr-2" />
                                        <span>Ver Usuarios</span>
                                    </div>
                                )}
                                {(rol === "1" || rol === "2") && showUsuarios && (
                                    <div
                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
                                        onClick={handleFamilyRegisterClick}
                                    >
                                        <FaUserPlus className="mr-2" />
                                        <span>Agregar Miembro</span>
                                    </div>
                                )}
                            </div>

                            <div className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer" onClick={toggleCertificados}>
                                <FaFileAlt className="mr-2" />
                                <span>Certificados</span>
                            </div>
                            {showCertificados && (
                                <div className="pl-4">
                                    {rol === "1" && ( // Solo visible para administradores
                                        <div
                                            className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
                                            onClick={handleCertificadoMoveStatusClick}
                                        >
                                            <FaClipboardCheck className="mr-2" />
                                            <span>Gestionar Solicitudes</span>
                                        </div>
                                    )}
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
                                    {rol === "1" && (
                                        <div
                                            className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
                                            onClick={handleCreateNewsClick}
                                        >
                                            <FaPaperPlane className="mr-2" />
                                            <span>Publicar Noticia</span>
                                        </div>
                                    )}
                                    <div
                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
                                        onClick={handleNewsClick}
                                    >
                                        <FaEye className="mr-2" />
                                        <span>Ver Noticias</span>
                                    </div>
                                </div>
                            )}

                            {rol === "1" && (
                                <div
                                    className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                                    onClick={handleMapaClick}
                                    activeClassName="bg-gray-600"
                                >
                                    <FaMap className="mr-2" />
                                    <span>Mapas</span>
                                </div>
                            )}
                        </>
                    )}
                </div>

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

            <div className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen">
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {viewUser && rol === "1" ? (
                    <ViewUser onBackClick={handleBackClick} />
                ) : viewDashboard && rol === "1" ? (
                    <Dashboard />
                ) : viewNews ? (
                    <ViewNews onBackClick={handleBackClick} />
                ) : viewCreateNews && rol === "1" ? (
                    <CreateNews />
                ) : viewCreateCertification ? (
                    <CreateCertificationFrom onBackClick={handleBackClick} />
                ) : viewCertificadoStatus ? (
                    <CertificadoStatus onBackClick={handleBackClick} />
                ) : viewFamilyRegister ? (
                    <FamilyRegister onBackClick={handleBackClick} />
                ) : viewMapa && rol === "1" ? (
                    <MapaInteractive onBackClick={handleBackClick} />
                ) : viewCertificadoMoveStatus && rol === "1" ? (
                    <CertificadoMoveStatus onBackClick={handleBackClick} />
                ) : null}
            </div>
        </div>
    );
};

export default SidebarPanel;