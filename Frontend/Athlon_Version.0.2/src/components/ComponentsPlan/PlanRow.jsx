import './PlanRow.css';

const PlanRow = ({plan, onEdit, onDelete}) => {

    // Función para manejar el evento de editar
    const handleEdit = () => {
        console.log("Editando Plan:", plan);
        // Llama a la función onEdit pasando el propietario completo
        onEdit(plan);
    };

    // Función para manejar el evento de eliminar
    const handleDelete = () => {
        console.log("Eliminando plan:", plan);
        // Llama a la función onDelete pasando el ID del propietario
        onDelete(plan.planID);
    };

    // Renderizamos la fila del producto como una fila de tabla (<tr>)
    return(
        <tr>
            {/* Mostramos cada propiedad del producto en una celda (<td>) */}
            <td>{plan.nombrePlan}</td>
            <td>{plan.duracion}</td>
            <td>{plan.descripcion}</td>
            <td>{plan.precio}</td>
            {/* Celda de acciones con botones para editar y eliminar */}
            <td> 
                <div className="plan-actions-row">
                    <button className="plan-button-edit" onClick={handleEdit}> Editar </button>
                    <button className="plan-button-delete" onClick={handleDelete}> Eliminar </button>
                </div>
            </td>
        </tr>
    );
};

export default PlanRow;

