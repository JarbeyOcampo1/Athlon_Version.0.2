import FacturaRow from "./FacturaRow";
import './FacturaTable.css';

function FacturaTable({ facturas, onEdit, onDelete }) {
  return (
    <div className="factura-table-container">
      <table className="factura-table">
        <thead className="factura-table-header">
          <tr className="factura-table-row">
            <th className="factura-th">Fecha Factura</th>
            <th className="factura-th">Fecha Vencimiento</th>
            <th className="factura-th">Total Factura</th>
            <th className="factura-th">Cliente</th>
            <th className="factura-th">Plan</th>
            <th className="factura-th">Acciones</th>
          </tr>
        </thead>
        <tbody className="factura-table-body">
          {facturas && facturas.length > 0 ? (
            facturas.map((factura) => (
                <FacturaRow key={factura.facturaID} factura={factura}onEdit={onEdit} onDelete={onDelete} />
            ))
          ) : (
            <tr>
              <td colSpan={6}>No hay facturas disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FacturaTable;
