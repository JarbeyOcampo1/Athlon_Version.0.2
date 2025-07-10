import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";

function Factura () {

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
                 {/* Barra de navegación con el botón de salir */}
                <nav className="navbar">
                    <Link to="/Cliente">Clientes</Link>
                    <Link to="/Plan">Plan</Link>
                    <Link to="/Principal">Principal</Link>
                    <button onClick={handleLogout} className="logout-button">Salir</button>
                </nav>
            </div>
        </div>
    );
}

export default Factura;
