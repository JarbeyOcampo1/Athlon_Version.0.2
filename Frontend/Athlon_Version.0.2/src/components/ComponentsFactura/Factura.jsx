import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import axios from "axios";
import FacturaTable from "./FacturaTable";
import FacturaForm from "./FacturaForm";
import './Factura.css';

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

    // Crear un estado para almacenar las facturas
    const [factura, setFactura] = useState([]);
    const [editingFactura, setEditingFactura] = useState(null);

     // Actualiza la lista de facturas cada vez que se crea uno nuevo
    useEffect (() => {
        fetchFactura
    },[]);

    // Recorre la lista de facturas y retorna una respuesta
    const fecthFactura = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/facturas');
            setFactura(response.data);
        } catch (error) {
            console.log('Error a cargar los datos', error);
        }
    };

    // Crear una factura o actualizar uno existente
    const createOrUpdateFactura = async (facturaData) => {
        try {
            if (editingFactura) {
                await axios.put(`http://localhost:8080/api/facturas/${editingFactura.facturaID}`, facturaData);
            }else {
                await axios.post('http://localhost:8080/api/facturas', facturaData);
                await fecthFactura();
            }
        } catch (error) {
            console.log('Error al crear una factura' ,error);
        }
    };

    // Editar una factura
    const handleEditingFactura = (factura) => {
        setEditingFactura(factura);
    };

    //Eliminar una factura
    const handleDeleteFactura = async (facturaID) => {
        try {
            await axios.delete(`http://localhost:8080/api/facturas/${facturaID}`)
            await fecthFactura();
        } catch (error) {
            alert('Error al eliminar una factura');
        }
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
            <div className="factura-contianer-principal">
                <h1 className="factura-h1-title"> Facturas </h1>
                <FacturaTable facturas={factura} onEdit={handleEditingFactura} onDelete={handleDeleteFactura}/>
                <h2 className="facturas-h2-edit-create">{editingFactura ? 'Editar Factura':'Crear Factura'}</h2>
                <FacturaForm onSubmit={createOrUpdateFactura} initialFac={editingFactura}/>
            </div>
        </div>
    );
}

export default Factura;
