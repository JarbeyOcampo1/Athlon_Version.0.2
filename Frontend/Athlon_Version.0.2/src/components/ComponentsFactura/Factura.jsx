import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import axios from "axios";
import FacturaTable from "./FacturaTable";
import FacturaForm from "./FacturaForm";
import './Factura.css';
import FacturaPDF from "./FacturaPDF";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";

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
    const notificadasRef = useRef(new Set());

     // Actualiza la lista de facturas cada vez que se crea uno nuevo
    useEffect (() => {
        fetchFactura();
    },[]);

    // Recorre la lista de facturas y retorna una respuesta
    const fetchFactura = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/facturas');
            setFactura(response.data);

            // Notificaciones de vencimiento
            const hoy = new Date();
            response.data.forEach( fac => {
                if (!fac.fechaVencimiento || !fac.facturaID) return;

                const vencimiento = new Date(fac.fechaVencimiento);
                const diasRestantes = Math.ceil((vencimiento - hoy) / (1000 * 60 * 60 * 24));

                if (diasRestantes <= 3 && diasRestantes >= 0 && !notificadasRef.current.has(fac.facturaID)) {
                    notificadasRef.current.add(fac.facturaID);
                    toast.warning(`⚠️ La factura de cliente ${fac.cliente?.nombreC || 'N/A'} con cedula ${fac.cliente?.cedulaC || 'N/A'} vence en ${diasRestantes} dia(s).`);
                } else if (diasRestantes < 0 && !notificadasRef.current.has(fac.facturaID)) {
                    toast.error(`❌ La factura de cliente ${fac.cliente?.nombreC || 'N/A'} con cédula ${fac.cliente?.cedulaC || 'N/A'} ya está vencida.`);
                    notificadasRef.current.add(fac.facturaID);
                }
            });
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
                await fetchFactura();
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
            await fetchFactura();
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
                <FacturaPDF facturas={factura}/>
                <FacturaTable facturas={factura} onEdit={handleEditingFactura} onDelete={handleDeleteFactura}/>
                <h2 className="facturas-h2-edit-create">{editingFactura ? 'Editar Factura':'Crear Factura'}</h2>
                <FacturaForm onSubmit={createOrUpdateFactura} initialFac={editingFactura}/>
            </div>
            <ToastContainer position="top-right" autoClose={5000}/>
        </div>
    );
}

export default Factura;
