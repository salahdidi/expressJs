const PDFDocument = require('pdfkit');
const excelJS = require('exceljs');

// Export products to PDF
exports.exportProductsToPDF = async (products, res) => {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.text('Product List');
    products.forEach(product => {
        doc.text(`Name: ${product.name}, Price: ${product.price}, Stock: ${product.stock}`);
    });
    doc.end();
};

// Export products to Excel
exports.exportProductsToExcel = async (products, res) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');
    worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Price', key: 'price', width: 10 },
        { header: 'Stock', key: 'stock', width: 10 }
    ];
    products.forEach(product => worksheet.addRow(product));
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');
    await workbook.xlsx.write(res);
    res.end();
};
