import FacturaRow from "./FacturaRow";
import './FacturaTable.css';

function FacturaTable ({facturas, onEdit, onDelete}) {
    return (
        <div className="factura-table-container">
            {/* Tabla */}
            <table className="factura-table">
                <thead className="factura-table-header">
                    <tr className="factura-table-row">
                        <th className="factura-th"> Fecha Factura </th>
                        <th className="factura-th"> Fecha Vencimiento </th>
                        <th className="factura-th"> total Factura </th>
                        <th className="factura-th"> Clientes </th>
                        <th className="factura-th"> Acciones </th>

                    </tr>
                </thead>
                {/* Tabla donde van las filas de pacientes */}
                <tbody className="factura-table-body">
                    {/* Si existen pacientes y hay al menos uno en el array */}
                    {facturas && facturas.length > 0 ? (
                        facturas.map((factura) => (
                            <FacturaRow key={factura.facturaID} factura={factura} onEdit={onEdit} onDelete={onDelete}/>
                        ))
                        ): (
                            <tr>
                                <td colSpan={5}> No hay facturas disponibles </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default FacturaTable;