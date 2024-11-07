import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaUser, FaFolder, FaRegClipboard, FaClipboardCheck, FaEye, FaPaperPlane, FaFileAlt, FaTachometerAlt, FaMap, FaClipboardList, FaCog, FaQuestionCircle, FaBell, FaNewspaper, FaUserPlus, FaRegEye } from 'react-icons/fa';
import ViewUser from './ViewUser';
import Dashboard from './Dasboard';
import { ViewNews } from './ViewNews';
import { CreateNews } from './CreateNews';
import CreateCertificationFrom from './CreateCertificationFrom';
import CertificadoStatus from './CertificadoStatus';
import { FamilyRegister } from './FamilyRegister';
import MapaInteractive from './MapaInteractive';
import CertificadoMoveStatus from './CertificadoMoveStatus';
import FamilyMemberDetails from './FamilyMemberDetails';

//theme 
import { useTheme } from '../context/ThemeContext';

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
    const [viewFamilyMember, setviewFamilyMember] = useState(false);
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
        setviewFamilyMember(false);
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
        setviewFamilyMember(false);
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
        setviewFamilyMember(false);
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
        setviewFamilyMember(false);
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
        setviewFamilyMember(false);
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
        setviewFamilyMember(false);
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
        setviewFamilyMember(false);
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
        setviewFamilyMember(false);
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
        setviewFamilyMember(false);
    };
    
    const handleViewFamiliyMemberClick = () => {
        setviewFamilyMember(true);
        setViewCertificadoMoveStatus(false);
        setViewDashboard(false);
        setViewUser(false);
        setViewNews(false);
        setViewCreateNews(false);
        setViewCreateCertification(false);
        setViewCertificadoStatus(false);
        setViewFamilyRegister(false);
        setViewMapa(false);
    };

    const { themes } = useTheme();
    return (
        <div className="flex" style={{ backgroundColor: themes.background, color: themes.text }}>
            <div
                className={`transition-width duration-300 ${isOpen ? 'w-64' : 'w-16'} h-screen relative flex flex-col shadow-md border border-gray-700`}
                style={{ backgroundColor: '#2d3748', color: '#f7fafc' }}
            >
                <div className="flex items-center justify-center py-4">
                    <img
                        src="/diversity.png"
                        alt="Logo"
                        className={`${isOpen ? 'block' : 'hidden'} h-10 w-10`}
                    />
                </div>

                {/* Toggle Button - Mejorado sutilmente */}
                <div className="absolute right-0 top-0 transform translate-x-1/2">
                    <button
                        onClick={toggleSidebar}
                        className="m-8 p-1.5 bg-indigo-800 hover:bg-indigo-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 border border-indigo-500"
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
                                {(rol === "1" || rol === "2") && showUsuarios && (
                                    <div
                                        className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer"
                                        onClick={handleViewFamiliyMemberClick}
                                    >
                                        <FaRegEye className="mr-2" />
                                        <span>Ver Miembros</span>
                                    </div>
                                )}
                            </div>

                            <div className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center cursor-pointer" onClick={toggleCertificados}>
                                <FaFileAlt className="mr-2" />
                                <span>Certificados</span>
                            </div>
                            {showCertificados && (
                                <div className="pl-4">
                                    {rol === "1" && (
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
                    <div className="mt-auto mb-8">
                        <NavLink
                            to={`/user/${rut}/edit`}
                            className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                            activeClassName="bg-gray-600"
                        >
                            <img src="/boy.png" alt="Avatar" className="h-6 w-6 rounded-full mr-2" />
                            <span>Mi Perfil</span>
                        </NavLink>
                        {/* <NavLink
                            to="/configuraciones"
                            className="block py-2 px-4 hover:bg-gray-600 text-left flex items-center"
                            activeClassName="bg-gray-600"
                        >
                            <FaCog className="mr-2" />
                            <span>Configuraciones</span>
                        </NavLink> */}
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


            <div className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen" style={{ backgroundColor: themes.background, color: themes.text }}>

                <div className="mt-2 mb-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-4/5 p-2 border rounded-md focus:outline-none"
                        style={{
                            backgroundColor: themes.background, // Fondo según el tema
                            color: themes.text, // Color del texto según el tema
                            borderColor: themes.background === '#ffffff' ? '#e2e8f0' : themes.border, // Borde visible siempre
                            transition: 'border-color 0.3s, box-shadow 0.3s', // Transición suave en el cambio de borde y sombra
                            boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.1)' // Sombra suave y sutil sin sobrecargar
                        }}
                        // Estilo del borde cuando está enfocado (con el click)
                        onFocus={(e) => e.target.style.borderColor = '#007bff'} // Cambia a un borde más visible
                        onBlur={(e) => e.target.style.borderColor = themes.background === '#ffffff' ? '#e2e8f0' : themes.border} // Vuelve al borde original
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
                ) : viewFamilyMember ? (
                    <FamilyMemberDetails onBackClick={handleBackClick}/> 
                ) : null}
            </div>
        </div>
    );
};

export default SidebarPanel;