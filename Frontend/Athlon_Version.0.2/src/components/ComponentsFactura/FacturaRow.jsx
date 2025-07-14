import FacturaIndividualPDF from './FacturaIndividualPDF';
import './FacturaRow.css';

const FacturaRow = ({factura, onEdit, onDelete}) => {

    // Función para manejar el evento de editar
    const handleEdit = () => {
        console.log("Editando Factura:", factura);
        // Llama a la función onEdit pasando el propietario completo
        onEdit(factura);
    };

    // Función para manejar el evento de eliminar
    const handleDelete = () => {
        console.log("Eliminando factura:", factura);
        // Llama a la función onDelete pasando el ID del propietario
        onDelete(factura.facturaID);
    };

    // Renderizamos la fila del producto como una fila de tabla (<tr>)
    return (
        <tr>
            {/* Mostramos cada propiedad de la factura en una celda (<td>) */}
            <td>{factura.fechaFactura}</td>
            <td>{factura.fechaVencimiento}</td>
            <td>{factura.totalFactura}</td>
            <td>{factura.cliente?.cedulaC || 'N/A'}</td>
            <td>{factura.cliente?.nombreC || 'N/A'}</td>
            <td>{factura.plan?.nombrePlan || 'N/A'}</td>

            <td>
                {/* Celda de acciones con botones para editar y eliminar */}
                <div className="factura-actions-row">
                    <button className="factura-button-edit" onClick={handleEdit}> Editar </button>
                    <button className="factura-button-delete" onClick={handleDelete}> Eliminar </button>
                    <FacturaIndividualPDF factura={factura}/>
                </div>
            </td>
        </tr>
    );
};

export default FacturaRow;
