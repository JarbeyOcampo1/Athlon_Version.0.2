import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from './components/Images/logo.png';
import imagen1 from './components/Images/imagen1.jpg';
import imagen2 from './components/Images/imagen2.jpg';
import imagen3 from './components/Images/imagen3.jpg';
import closeSession from './closeSession';
import './Principal.css';

function Principal () {

    // Inicializamos la función de navegación para salir de la sesión
    const handleLogout = closeSession();

    return (
        <div>
            <div className="Container_Principal">
                <div className="logo-container">
                    <img src={logo} className="principal-logo-image" alt="Logo Gimnasio Athlon" />
                </div>
                {/* Barra de navegación con el botón de salir */}
                <nav className="navbar">
                    <Link to="/Cliente">Clientes</Link>
                    <Link to="/Plan">Planes</Link>
                    <Link to="/Factura">Factura</Link>
                    <button onClick={handleLogout} className="logout-button">Salir</button>
                </nav>
            </div>
            {/* Contenedor del título con animación */}
            <div className="title-container">
                <h1 className="title">
                    <span>G</span><span>I</span><span>M</span><span>N</span><span>A</span><span>S</span><span>I</span><span>O</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>A</span><span>T</span><span>H</span><span>L</span><span>O</span><span>N</span>
                </h1>
            </div>
            {/* Carrusel de imágenes (simulado con scroll horizontal) */}
            <div className="carrousel">
                <div><img src={imagen1} alt="imagen1" /></div>
                <div><img src={imagen2} alt="imagen2" /></div>
                <div><img src={imagen3} alt="imagen3" /></div>
                <div><img src={imagen1} alt="imagen1" /></div>
                <div><img src={imagen2} alt="imagen2" /></div>
                <div><img src={imagen3} alt="imagen3" /></div> 
                <div><img src={imagen1} alt="imagen1" /></div>
                <div><img src={imagen2} alt="imagen2" /></div>
                <div><img src={imagen3} alt="imagen3" /></div> 
                <div><img src={imagen1} alt="imagen1" /></div>
                <div><img src={imagen2} alt="imagen2" /></div>
                <div><img src={imagen3} alt="imagen3" /></div> 
                <div><img src={imagen1} alt="imagen1" /></div>
                <div><img src={imagen2} alt="imagen2" /></div>
                <div><img src={imagen3} alt="imagen3" /></div>
                <div><img src={imagen1} alt="imagen1" /></div>
                <div><img src={imagen2} alt="imagen2" /></div>
                <div><img src={imagen3} alt="imagen3" /></div>     
            </div>
            {/* Pie de página con enlaces a redes sociales */}
            <footer className="footer">
                <h2>Síguenos en nuestras redes sociales:</h2>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                </div>
            </footer>
        </div>
    );
}

export default Principal;
