import { useEffect, useState } from "react";

function PlanForm ({onSubmit, initialPla}) {

    // estados para cada campo del formulario
    const [nombrePlan, setNombrePlan] = useState("");
    const [duracion, setDuracion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");

    // useEffect se ejecuta cuando cambian los props (en este caso, initialPla)
    // Si initialPla existe, llenamos el formulario con sus valores (modo edición)
    useEffect(() => {
        if (initialPla) {
            setNombrePlan(initialPla.nombrePlan);
            setDuracion(initialPla.duracion);
            setDescripcion(initialPla.descripcion);
            setPrecio(initialPla.precio);
        }
    },[initialPla]);

     // Función que se ejecuta al enviar el formulario
    const handleSubmit = (event) => {
        // Evitamos que el formulario recargue la página
        event.preventDefault();
        // Creamos un objeto con todos los datos del formulario
        const plaData = {nombrePlan, duracion, descripcion, precio};
        // Llamamos a la función que recibimos por props pasando los datos del plan
        onSubmit(plaData);
        setNombrePlan("");
        setDuracion("");
        setDescripcion("");
        setPrecio("");
    };

    return (
        <form  onSubmit={handleSubmit} className="plan-form">
            {/* Campos controlados de los productos */}
            <div className="plan-form-group">
                <label className="plan-label"> Nombre </label>
                <input className="plan-input" type="text" placeholder="Nombre de plan" value={nombrePlan} onChange={(e) => setNombrePlan(e.target.value)} required/>
            </div>
            <div className="plan-form-group">
                <label className="plan-label"> Duracion </label>
                <input className="plan-input" type="number" value={duracion} onChange={(e) => setDuracion(e.target.value)} required/>
            </div>
            <div className="plan-form-group">
                <label className="plan-label"> Descipcion </label>
                <input className="plan-input" type="text" placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required/>
            </div>
            <div className="plan-form-group">
                <label className="plan-label"> Precio </label>
                <input className="plan-input" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required/>
            </div>
            {/* Botón de envío que cambia su texto dependiendo si estamos en modo edición o creación */}
            <div className="plan-form-group">
                <button className="plan-button" type="submit"> {initialPla? 'Actualizar' : 'Agregar'} </button>
            </div>
        </form>
    );


};

export default PlanForm;