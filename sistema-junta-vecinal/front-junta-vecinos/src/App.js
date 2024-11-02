import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Resgiter';
import SidebarPanel from './components/SidebarPanel';
import Home from './pages/Home';
import Page404 from './pages/Page404';
// import Footer from './pages/Footer';
import UpdateUser from './components/UpdateUser';
import ViewUser from './components/ViewUser';
import { UserDetails } from './components/UserDetails';
import { FamilyRegister } from './components/FamilyRegister';
import { CreateNews } from './components/CreateNews';
import { ViewNews } from './components/ViewNews';
import CreateCertificationFrom from './components/CreateCertificationFrom';
import CertificadoStatus from './components/CertificadoStatus';
import MapaInteractive from './components/MapaInteractive';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panel" element={<SidebarPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/footer" element={<Footer />} /> */}
        <Route path="/user/:rut/edit" element={<UpdateUser />} />
        <Route path="/user-view" element={<ViewUser />} />
        <Route path="/user/:rut/details" element={<UserDetails />} />
        <Route path="/family/register" element={<FamilyRegister />} />
        <Route path="/create/news" element={<CreateNews />} />
        <Route path="/read/news" element={<ViewNews />} />
        <Route path="/maps" element={<MapaInteractive />} />
        <Route path="/certificados/solicitar/" element={<CreateCertificationFrom />} />
        <Route path="/certificados/check/" element={<CertificadoStatus />} />
        <Route path="/noticias/:id/edit" element={<CreateNews />} />

        {/* Ruta para manejar rutas no encontradas */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>


  );
}

export default App;
