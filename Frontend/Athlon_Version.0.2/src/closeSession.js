import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function closeSession() {

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

    return (handleLogout);
};


export default closeSession;

