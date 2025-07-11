import { useEffect, useState } from "react";
import './FacturaForm.css'

function FacturaForm ({onSubmit, initialFac}) {

    // estados para cada campo del formulario
    const [fechaFactura, setFechaFactura] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [totalFactura, setTotalFactura] = useState('');
    const [clienteID, setClienteID] = useState('');

    const [clientes, setClientes] = useState([]);

    // useEffect se ejecuta cuando cambian los props (en este caso, initialFac)
    // Si initialFac existe, llenamos el formulario con sus valores (modo edición)
    useEffect (() => {
        fetch ('http://localhost:8080/api/clientes')
        .then((response) => response.json())
        .then((data) => {
            const clientesData = Array.isArray(data) ? data : data.content;
            setClientes(clientesData || []);;
        })
        .catch((error) => console.error('Error fetching clientes ', error));

        if (initialFac) {
            setFechaFactura(initialFac.fechaFactura);
            setFechaVencimiento(initialFac.fechaVencimiento);
            setTotalFactura(initialFac.totalFactura);
            setClienteID(initialFac.clienteID?.clienteID || '');
        };
    }, [initialFac]);
    
    // Función que se ejecuta al enviar el formulario
    const handleSubmit = (event) => {
        event.preventDefault();

        const factData = {
            fechaFactura, fechaVencimiento, totalFactura, 
            clienteID : {
                clienteID: Number(clienteID)
            }
        };
        onSubmit(factData);
        setFechaFactura('');
        setFechaVencimiento('');
        totalFactura('');
        setClienteID('');
    };

    return (
        <form onSubmit={handleSubmit} className="factura-form">
            {/* Campos controlados de los productos */}
            <div className="factura-form-group">
                <label className="factura-label"> Fecha Factura </label>
                <input className="factura-input" type="time" value={fechaFactura} onChange={(e) => setFechaFactura(e.target.value)} required/>
            </div>
            <div className="factura-form-group">
                <label className="factura-label"> Fecha Vencimiento </label>
                <input className="factura-input" type="time" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} required/>
            </div>
            <div className="factura-form-group">
                <label className="factura-label"> Total Factura </label>
                <input className="factura-input" type="date" value={totalFactura} onChange={(e) => setTotalFactura(e.target.value)} required/>
            </div>
            <div className="factura-form-group">
                <label className="factura-label"> Clientes </label>
                <select className="factura-select" value={clienteID} onChange={(e) => setClienteID(Number(e.target.value))} required> 
                    <option className="factura-select-option" value=""> Selecciona un cliente </option>
                    {clientes.map((cliente) => (
                        <option className="factura-select-option" key={cliente.clienteID} value={cliente.clienteID}>
                            {cliente.nombreC} {cliente.apellidoC} - C.C {cliente.cedulaC}
                        </option>
                    ))}
                </select>
            </div>
            {/* Botón de envío que cambia su texto dependiendo si estamos en modo edición o creación */}
             <div className="factura-form-group">
                <button  className="factura-button" type="submit"> {initialFac ? 'Actualizar' : 'Agregar'} </button>
            </div>
        </form>
    );
};

export default FacturaForm;