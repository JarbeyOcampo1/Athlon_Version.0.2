import { jsPDF} from "jspdf";
import logoA from '/src/components/Images/LogoA.jpeg';

function FacturaIndividualPDF ({factura}) {
    const pdfI = () => {
        const doc = new jsPDF();

        //Agregar el logo del gimnasio
        doc.addImage(logoA, 'PNG', 10, 10, 30, 30);

        //Encabezado principal
        doc.setFontSize(16);
        doc.text("GIMNASIO ATHLON",80, 20);
        doc.setFontSize(12);
        doc.text("Factura Oficial del gimnasio Athlon", 80, 28);
        doc.line(10, 40, 200, 40);

        //Fecha del reporte
        const fechaActual = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.text(`Fecha del reporte: ${fechaActual}`, 150, 35);


        //Datos del cliente
        doc.text("Detalle del cliente:", 20, 50);
        doc.text(`Nombre: ${factura.cliente?.nombreC || 'N/A'} ${factura.cliente?.apellidoC || ''}`, 20, 58);
        doc.text(`Cedula: ${factura.cliente?.cedulaC || 'N/A'}`, 20, 66);

        //Datos del plan 
        doc.text("Detalle del plan: ", 20, 80);
        doc.text(`Plan: ${factura.plan?.nombrePlan || 'N/A'}`, 20, 88);
        doc.text(`Precio: $${factura.plan?.precio || 'N/A'}`, 20, 96);

        //Datos fechas
        doc.text("Fechas: ", 20, 110);
        doc.text(`Fecha Factura: ${factura.fechaFactura}`, 20, 118);
        doc.text(`Fecha Vencimiento: ${factura.fechaVencimiento}`, 20, 126);

        //Total 
        doc.setFontSize(14);
        doc.setTextColor(0, 100, 0);
        doc.text(`Total a pagar: $${factura.totalFactura}`, 20, 145);
        doc.setTextColor(0, 0, 0);

        //pie de pagina
        doc.setFontSize(10);
        doc.text("Gracias por su compra.", 20, 270);
        doc.text("Gimnasio Athlon - Vive fuerte, Vive sano.", 20, 276);
        doc.text("Contacto: 300-000-000 | Calle 123, Medellin, Colombia", 20, 282);

        //guardar los datos
        const nombreCliente = `${factura.cliente?.nombreC || 'Cliente'}`;
        doc.save(`Factura_${nombreCliente}.pdf`);
    };

    return (
        <div className="pdf-container">
            <button className="factura-button" onClick={pdfI}> Factura </button>
        </div>
    );
}

export default FacturaIndividualPDF;