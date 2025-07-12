import { useEffect, useState } from "react";
import './FacturaForm.css'

function FacturaForm({ onSubmit, initialFac }) {

  // estados para cada campo del formulario
  const [fechaFactura, setFechaFactura] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [totalFactura, setTotalFactura] = useState('');
  const [clienteID, setClienteID] = useState('');
  const [planID, setPlanID] = useState('');

  const [clientes, setClientes] = useState([]);
  const [planes, setPlanes] = useState([]);

  // useEffect para cargar clientes y planes
  useEffect(() => {
    fetch('http://localhost:8080/api/clientes')
      .then((response) => response.json())
      .then((data) => {
        const clientesData = Array.isArray(data) ? data : data.content;
        setClientes(clientesData || []);
      })
      .catch((error) => console.error('Error fetching clientes', error));

    fetch('http://localhost:8080/api/planes')
      .then((response) => response.json())
      .then((data) => {
        const planesData = Array.isArray(data) ? data : data.content;
        setPlanes(planesData || []);
      })
      .catch((error) => console.error('Error fetching planes', error));

    if (initialFac) {
      setFechaFactura(initialFac.fechaFactura);
      setFechaVencimiento(initialFac.fechaVencimiento);
      setTotalFactura(initialFac.totalFactura);
      setClienteID(initialFac.cliente?.clienteID || '');
      setPlanID(initialFac.plan?.planID || '');
    }
  }, [initialFac]);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    const factData = {
      fechaFactura,
      fechaVencimiento,
      totalFactura,
      cliente: {
        clienteID: Number(clienteID),
      },
      plan: {
        planID: Number(planID),
      }
    };

    onSubmit(factData);

    // Limpiar formulario
    setFechaFactura('');
    setFechaVencimiento('');
    setTotalFactura('');
    setClienteID('');
    setPlanID('');
  };

  return (
    <form onSubmit={handleSubmit} className="factura-form">
      <div className="factura-form-group">
        <label className="factura-label">Fecha Factura</label>
        <input className="factura-input" type="date" value={fechaFactura} onChange={(e) => setFechaFactura(e.target.value)} required />
      </div>
      <div className="factura-form-group">
        <label className="factura-label">Fecha Vencimiento</label>
        <input className="factura-input" type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} required />
      </div>
      <div className="factura-form-group">
        <label className="factura-label">Total Factura</label>
        <input className="factura-input" type="number" value={totalFactura} onChange={(e) => setTotalFactura(e.target.value)} required />
      </div>
      <div className="factura-form-group">
        <label className="factura-label">Clientes</label>
        <select className="factura-select" value={clienteID} onChange={(e) => setClienteID(e.target.value)} required>
          <option value="">Selecciona un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.clienteID} value={cliente.clienteID}>
              {cliente.nombreC} {cliente.apellidoC} - C.C {cliente.cedulaC}
            </option>
          ))}
        </select>
      </div>
      <div className="factura-form-group">
        <label className="factura-label">Planes</label>
        <select className="factura-select" value={planID} onChange={(e) => setPlanID(e.target.value)} required>
          <option value="">Selecciona un plan</option>
          {planes.map((plan) => (
            <option key={plan.planID} value={plan.planID}>
              {plan.nombrePlan} - ${plan.precio}
            </option>
          ))}
        </select>
      </div>
      <div className="factura-form-group">
        <button className="factura-button" type="submit">{initialFac ? 'Actualizar' : 'Agregar'}</button>
      </div>
    </form>
  );
};

export default FacturaForm;
