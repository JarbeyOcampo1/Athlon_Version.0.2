import closeSession from "../../closeSession";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import PlanTable from "./PlanTable";
import PlanForm from "./PlanForm";
import logo from "../Images/logo.png";
import './Plan.css';

function Plan () {

    // Inicializamos la función de navegación para salir de la sesión
    const handleLogout = closeSession();

    // Crear un estado para almacenar los planes
    const [planes, setPlanes] = useState([]);
    const [editingPlan, setEditingPlan] = useState(null);

    // Actualiza la lista de planes cada vez que se crea uno nuevo
    useEffect(() => {
        fetchPlan();
    },[]);

    // Recorre la lista de planes y retorna una respuesta
    const fetchPlan = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/planes');
            setPlanes(response.data);
        } catch (error) {
            console.error("Error al obtener los planes:", error);
        }
    };

    //crear un plan
    const createOrUpdatePlan = async (planData) => {
        try {
            if (editingPlan) {
                await axios.put(`http://localhost:8080/api/planes/${editingPlan.planID}`, planData);
            }else {
                await axios.post(`http://localhost:8080/api/planes`, planData);
                await fetchPlan();
            }
        } catch (error) {
            console.error("Error al crear o actualizar el plan:", error);
        }
    };

    //editar un plan
    const  handleEditPlan = (planes) => {
        setEditingPlan(planes);
    };

    // Eliminar un plan
    const handleDeletePlan = async (planID) => {
        try {
            await axios.delete(`http://localhost:8080/api/planes/${planID}`);
            fetchPlan();
        } catch (error) {
            alert('Error al eliminar el plan', error);
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
                    <Link to="/Cliente">Clientes</Link>
                    <Link to="/Principal">Principal</Link>
                    <Link to="/Factura">Factura</Link>
                    <button onClick={handleLogout} className="logout-button">Salir</button>
                </nav>
            </div>
            <div className="planes-container-principal">
                <h1 className="planes-h1-title"> Planes </h1>
                <PlanTable planes={planes} onEdit={handleEditPlan} onDelete={handleDeletePlan}/>
                <br />
                <h2 className="planes-h2-edit-create">{editingPlan ? 'Editar Plan' : 'Crear un plan'}</h2>
                <PlanForm onSubmit={createOrUpdatePlan} initialPla={editingPlan}/>
            </div>
        </div>
    );
}

export default Plan;