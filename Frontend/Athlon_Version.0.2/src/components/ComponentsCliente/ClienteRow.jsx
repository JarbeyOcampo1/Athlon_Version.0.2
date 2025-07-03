
const ClienteRow = ({cliente, onEdit, onDelete}) => {

    // Función para manejar el evento de editar
    const handleEdit = () => {
        console.log("Editando cliente:", cliente);
        // Llama a la función onEdit pasando el propietario completo
        onEdit(cliente);
    };

    // Función para manejar el evento de eliminar
    const handleDelete = () => {
        console.log("Eliminando cliente:", cliente);
        // Llama a la función onDelete pasando el ID del propietario
        onDelete(cliente.clienteID);
    };
};

export default ClienteRow;