// generateInvoice.js
import { jsPDF } from "jspdf";
import 'jspdf-autotable';  // To use autoTable plugin for tables in jsPDF

const generateInvoice = (billingInfo, cartItems, totalAmount, currency) => {
  const doc = new jsPDF();

  // Title and basic info
  doc.setFontSize(16);
  doc.text('Facture', 20, 20);
  doc.text(`Client: ${billingInfo.firstName} ${billingInfo.lastName}`, 20, 30);
  doc.text(`Pays: ${billingInfo.country}`, 20, 40);

  // Adding the table with the cart items
  doc.autoTable({
    head: [['Produit', 'Prix']],
    body: cartItems.map(item => [item.pack, `${item.price} ${currency}`]),
    startY: 50,
  });

  // Add total at the bottom
  doc.text(`Total: ${totalAmount} ${currency}`, 20, doc.lastAutoTable.finalY + 10);

  // Save the document
  doc.save('facture.pdf');
};

export default generateInvoice;
