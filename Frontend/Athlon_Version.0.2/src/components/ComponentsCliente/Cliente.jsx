import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../Images/logo.png";

function Cliente () {

    // Inicializamos la función de navegación
    const navigate = useNavigate();

    // Verifica si el token de autenticación existe en el almacenamiento local
    useEffect(() => {
        const autenticar = localStorage.getItem("Exito");
        if (!autenticar) {
            navigate("/");
        }
    }, [navigate]);

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("Exito");
        navigate("/");
    };

    return (
        <div>
            <div className="Container_Principal">
                <div className="logo-container">
                    <img src={logo} className="principal-logo-image" alt="Logo Gimnasio Athlon" />
                </div>
                <nav className="navbar">
                    <Link to="/Principal">Principal</Link>
                    <Link to="/Plan">Planes</Link>
                    <Link to="/Factura">Factura</Link>
                    <button onClick={handleLogout} className="logout-button">Salir</button>
                </nav>
            </div>
            <div>
                <h1>HOLAA</h1>
            </div>
        </div>
    );
}

export default Cliente;