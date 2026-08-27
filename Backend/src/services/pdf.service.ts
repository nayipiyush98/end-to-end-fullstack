import path from 'path';
import PDFDocument from 'pdfkit';
import type { Response } from 'express';

/**
 * Generates an invoice PDF and pipes it to an Express response.
 * @param {Object} order - The dynamic order object containing user and item details.
 * @param {Object} res - The Express response object.
 */
export const createInvoice = (order : any, res : Response) => {
  // Initialize a new PDF document
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  // Set response headers for inline PDF viewing
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="invoice-${order.id}.pdf"`
  );

  // Pipe the PDF document directly to the response
  doc.pipe(res);

  // --- 1. Header Section ---
  // Note: Uncomment the line below to add your logo back in if the image file is present
  // doc.image('watermarked_img_6410829556103460.png', 50, 45, { width: 50 });

    // Safely resolve the path to your logo from the root of your project
    const logoPath = path.join(process.cwd(), 'scripts', 'public', 'logo.png');

// 1. Header Section
    doc.image(logoPath, 50, 45, { width: 60 }) // Places logo on the top left
    .fillColor('#000000');
    
    doc.font('Helvetica-Bold');
    doc.fontSize(30).text('INVOICE', 50, 50, { align: 'right' });

    doc.font('Helvetica');
    doc.fontSize(10).text(`INV-${String(order.id).padStart(6, "0")}`, 50, 75, { align: 'right' });

  // --- 2. Meta Data (Dates and Status) ---
  const customerInfoTop = 130;
  
  doc.text('Date:', 350, customerInfoTop)
     .text(order.createdAt.toLocaleDateString(), 450, customerInfoTop)
     .text('Payment Method:', 350, customerInfoTop + 15)
     .text(order.paymentMethod, 450, customerInfoTop + 15)
     .text('Order Status:', 350, customerInfoTop + 30)
     .text(order.status, 450, customerInfoTop + 30);

  // --- 3. Billing & Shipping Address ---
  doc.text('Bill To:', 50, customerInfoTop)
     .text(`Name: ${order.user.name}`, 50, customerInfoTop + 15)
     .text(`Email: ${order.user.email}`, 50, customerInfoTop + 30)
     .text('Ship To:', 200, customerInfoTop)
     .text(order.shippingAddress, 200, customerInfoTop + 15);

  // --- 4. Invoice Table Headers ---
  const invoiceTableTop = 230;
  doc.font('Helvetica-Bold');
  generateTableRow(doc, invoiceTableTop, null, 'Item', 'Quantity', 'Rate', 'Amount');
  generateHr(doc, invoiceTableTop + 20);
  doc.font('Helvetica');

  // --- 5. Dynamic Invoice Table Rows ---
  let position = invoiceTableTop + 30;
  let calculatedTotal = 0;

  for (const item of order.items) {
    const price = Number(item.price);
    const itemTotal = price * item.qty;
    calculatedTotal += itemTotal;
    console.log(item.product.images);
    generateTableRow(
      doc, 
      position, 
      item.product.images[0],
      item.product.name, 
      item.qty.toString(), 
      `$${price.toFixed(2)}`, 
      `$${itemTotal.toFixed(2)}`
    );
    
    generateHr(doc, position + 20);
    position += 30;

    // Add a new page if the items exceed the current page height
    if (position > 700) {
      doc.addPage();
      position = 50; 
    }
  }

  // --- 6. Totals section ---
  const subtotalPosition = position + 10;
     
  doc.font('Helvetica-Bold')
     .text('Total:', 350, subtotalPosition)
     .text(`$${calculatedTotal.toFixed(2)}`, 450, subtotalPosition);

  // --- 7. Footer (Notes) ---
  const notesPosition = subtotalPosition + 50;
  doc.font('Helvetica-Bold').text('Notes:', 50, notesPosition);
  doc.font('Helvetica').text('Thank you for shopping with us!', 50, notesPosition + 15);

  // Finalize PDF file
  doc.end();
}

// --- Helper Functions for Layout ---
function generateTableRow(
    doc: any,
    y: number, 
    imagePath : string | null,
    item: string, 
    quantity: string, 
    rate: string, 
    amount: string
) {
    doc.fontSize(10)
    if(imagePath) {
        const image = path.join(process.cwd(), 'scripts', 'public', imagePath);
        console.log(image);
        doc.image(image, 50, y - 10, { fit: [30, 30] });
    } else {
        doc.text('Image', 50, y);
    }
     doc.text(item, 100, y)
     .text(quantity, 250, y)
     .text(rate, 350, y)
     .text(amount, 450, y);
}

function generateHr(doc : any, y : number) {
  doc.strokeColor('#aaaaaa')
     .lineWidth(1)
     .moveTo(50, y)
     .lineTo(550, y)
     .stroke();
}