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

};

export default PlanForm;