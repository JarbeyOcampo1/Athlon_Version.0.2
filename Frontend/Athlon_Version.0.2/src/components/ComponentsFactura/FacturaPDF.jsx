import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logoA from '/src/components/Images/LogoA.jpeg';

function FacturaPDF ({facturas}) {

    const pdf  = () => {
        const doc = new jsPDF();

        //logo del pdf
        doc.addImage(logoA , 'PNG', 10,10,30,30);

        //encabezado de la factura
        doc.setFontSize(16);
        doc.text("GIMNASIO ATHLON",80, 20);
        doc.setFontSize(12);
        doc.text("Reporte general de facturas", 80, 28);
        doc.line(10, 40, 200, 40);

        //Fecha del reporte
        const fechaActual = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.text(`Fecha del reporte: ${fechaActual}`, 150, 35);

        //columnas de la tabla
        const columns = [
            {header: "Fecha Factura", dataKey: "fechaFactura"},
            {header: "Fecha Vencimiento", dataKey: "fechaVencimiento"},
            {header: "Total", dataKey: "totalFactura"},
            {header: "Cliente", dataKey: "cliente"},
            {header: "Plan", dataKey: "plan"},
        ];
        
        //Filas de los datos
        const rows = facturas.map(fac => ({
            fechaFactura: fac.fechaFactura,
            fechaVencimiento: fac.fechaVencimiento,
            totalFactura: `$${fac.totalFactura}`,
            cliente: `${fac.cliente?.nombreC || 'N/A'} ${fac.cliente?.apellidoC || 'N/A'}`,
            plan: `${fac.plan?.nombrePlan || 'N/A'}`,
        }));

        //Estilo
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: rows.map(row => columns.map(col => row[col.dataKey])),
            startY: 50,
            styles: {
                fontSize: 10,
                cellPadding: 4,
                halign: 'center',
            },
            headStyles: {
                fillColor: [44, 62, 80],
                textColor: 255,
                fontStyle: 'bold',
            },
            alternateRowStyles: { fillColor: [245, 245, 245] },
        });

        //pie de pagina
        doc.setFontSize(10);
        doc.text("Este documento fue generado por el sistema de Athlon", 20,285);
        doc.text("Para mas informacion: athlon@gmail.com | TEL: 300-000-000", 20, 291);

        //guardar pdf
        doc.save("Reporte_General_Facturas.pdf")
    };

    return (
        <div className="pdf-container">
            <button className="factura-button" onClick={pdf}> Descargar Reporte General </button>
        </div>
    );
}

export default FacturaPDF;