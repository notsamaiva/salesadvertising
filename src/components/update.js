import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { PDFDocument, rgb } from 'pdf-lib';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';

const generateInvoicePDF = (cartItems, totalAmount, currency, billingInfo) => { 
  const doc = new jsPDF();

  // Génération de l'en-tête, des détails du client, des items, et du total
  doc.addImage(logo, 'PNG', 10, 10, 40, 20);
  doc.setFont('Poppins', 'normal');
  doc.text("Invoice", 10, 50);
  // Ajoutez d'autres contenus ici...

  return doc.output('blob'); // Retourne le fichier PDF sous forme de blob
};

const downloadPartnershipPDF = async (billingInfo) => {
  const response = await fetch('/partnership.pdf');
  if (!response.ok) {
    console.error('Erreur lors de la récupération du fichier PDF');
    return null;
  }
  const existingPdfBytes = await response.arrayBuffer();
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const firstPage = pdfDoc.getPages()[0];
  firstPage.drawText(`${billingInfo.firstName} ${billingInfo.lastName}`, {
    x: 80, y: 650, size: 12, color: rgb(19 / 255, 1 / 255, 124 / 255),
  });

  return await pdfDoc.saveAsBase64(); // Retourne le fichier PDF sous forme de base64
};

const sendEmailWithPDFs = async (cartItems, totalAmount, currency, billingInfo) => {
  const invoicePDF = generateInvoicePDF(cartItems, totalAmount, currency, billingInfo);
  const partnershipPDF = await downloadPartnershipPDF(billingInfo);

  if (!invoicePDF || !partnershipPDF) {
    console.error('Erreur lors de la génération des PDFs');
    return;
  }

  const formData = new FormData();
  formData.append("invoicePDF", invoicePDF, `invoice_${billingInfo.firstName}_${billingInfo.lastName}.pdf`);
  formData.append("partnershipPDF", partnershipPDF, `partnership_with_${billingInfo.firstName}_${billingInfo.lastName}.pdf`);
  formData.append("email", billingInfo.email);

  try {
    const response = await fetch('https://votre-serveur-api.com/send-email', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      alert('Les PDFs ont été envoyés avec succès par email !');
    } else {
      console.error('Erreur lors de l\'envoi de l\'email');
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
};

const ConfirmationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get('data');
  const parsedData = JSON.parse(decodeURIComponent(data));
  const { cartItems, totalAmount, currency, billingInfo } = parsedData;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-center text-success">Payment Confirmation</h1>

        {/* Order Details */}
        <h3 className="mt-4">Order Details</h3>
        {/* Cart Items display code... */}
        
        <h3 className="mt-3">Total Amount</h3>
        <p className="h4 text-primary">{totalAmount} {currency}</p>

        <h3 className="mt-4">Billing Information</h3>
        <p><strong>Name:</strong> {billingInfo.firstName} {billingInfo.lastName}</p>
        <p><strong>Email:</strong> {billingInfo.email}</p>

        {/* Boutons pour télécharger les PDFs et envoyer par email */}
        <div className="text-center mt-4">
          <button
            className="btn btn-success btn-lg"
            onClick={() => generateInvoicePDF(cartItems, totalAmount, currency, billingInfo)}
          >
            Download Invoice
          </button>
          <button
            className="btn btn-primary btn-lg ml-3"
            onClick={() => downloadPartnershipPDF(billingInfo)}
          >
            Download Partnership
          </button>
          <button
            className="btn btn-warning btn-lg ml-3"
            onClick={() => sendEmailWithPDFs(cartItems, totalAmount, currency, billingInfo)}
          >
            Send PDFs by Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
