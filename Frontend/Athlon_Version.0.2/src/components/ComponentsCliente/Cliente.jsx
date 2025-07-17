import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../Images/logo.png";
import axios from 'axios';
import ClienteTable from './ClienteTable';
import ClienteForm from './ClienteForm';
import './Cliente.css';

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

    // Crear un estado para almacenar los clientes
    const [clientes, setCliente] = useState([]);
    const [editingCliente, setEditingCliente] = useState(null);

    // Actualiza la lista de propietarios cada vez que se crea uno nuevo
    useEffect(() =>{
        fetchCliente();
    },[]);

     // Recorre la lista de clientes y retorna una respuesta
    const fetchCliente = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/clientes');
            setCliente(response.data);
        } catch (error) {
            console.error("Error al obtener los clientes:", error);
        }
    };

    //crear un cliente
    const CreateOrUpdateCliente = async (clienteData) => {
        try {
            if (editingCliente) {
                await axios.put(`http://localhost:8080/api/clientes/${editingCliente.clienteID}`, clienteData);
            }else {
                await axios.post(`http://localhost:8080/api/clientes`, clienteData);
                await fetchCliente();
            }
        } catch (error) {
            console.error("Error al crear o actualizar el cliente:", error);
        }
    };

     // Editar un cliente
     const handleEditCliente = (cliente) => {
        setEditingCliente(cliente);
     };

    // Eliminar un cliente
    const handleDeleteCliente = async (clienteID) => {
        try {
            await axios.delete(`http://localhost:8080/api/clientes/${clienteID}`);
            fetchCliente();
        } catch (error) {
            alert("Error al eliminar el cliente: " + error.message);
        }
    };

    return (
        <div>
            <div className="Container_Principal">
                <div className="logo-container">
                    <Link to="/Principal"><img src={logo} className="principal-logo-image" alt="Logo Gimnasio Athlon" /></Link>
                </div>
                 {/* Barra de navegación con el botón de salir */}
                <nav className="navbar">
                    <Link to="/Principal">Principal</Link>
                    <Link to="/Plan">Planes</Link>
                    <Link to="/Factura">Factura</Link>
                    <button onClick={handleLogout} className="logout-button">Salir</button>
                </nav>
            </div>
            <div className="cliente-container-principal">
                <h1 className="cliente-h1-title"> Clientes </h1>
                <ClienteTable clientes={clientes} onEdit={handleEditCliente} onDelete={handleDeleteCliente}/>
                <br />
                <h2 className="cliente-h2-edit-create"> {editingCliente ? 'Editar cliente' : 'Crear cliente'} </h2>
                <ClienteForm onSubmit={CreateOrUpdateCliente} initialCli={editingCliente}/> 
            </div>
        </div>
    );
}

export default Cliente;