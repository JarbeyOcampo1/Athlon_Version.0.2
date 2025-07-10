import PlanRow from './PlanRow';
import './PlanTable.css';

function PlanTable ({planes, onEdit, onDelete}) {

    return (
        <div className="plan-table-container">
            {/* Tabla */}
            <table className="plan-table">
                {/* Encabezado de la tabla con los nombres de las columnas */}
                <thead className="plan-table-header">
                    <tr className="plan-table-row">
                        <th className="plan-th"> Nombre </th>
                        <th className="plan-th"> Duracion </th>
                        <th className="plan-th"> Descripcion </th>
                        <th className="plan-th"> Precio </th>
                        <th className="plan-th"> Acciones </th>
                    </tr>
                </thead>
                {/* Tabla donde van las filas de planes */}
                <tbody className="plan-table-body">
                    {/* Si existen propietarios y hay al menos uno en el array */}
                    {planes && planes.length > 0 ? (
                        planes.map((plan) => (
                            <PlanRow key={plan.planID} plan={plan} onEdit={onEdit} onDelete={onDelete}/>
                        )) 
                        ) : (
                            <tr>
                                <td colSpan={5}> No hay planes disponibles </td>
                            </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PlanTable;