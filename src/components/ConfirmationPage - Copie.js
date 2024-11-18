import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { PDFDocument, rgb } from 'pdf-lib';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png'; // Assurez-vous que le chemin est correct
import partnership from '../images/partnership.pdf';
// Fonction pour générer le PDF de la facture

const generateInvoicePDF = (cartItems, totalAmount, currency, billingInfo) => { 
  const doc = new jsPDF();

  // Ajouter le logo et les informations de l'entreprise dans l'entête
  doc.addImage(logo, 'PNG', 10, 10, 40, 20);

  const companyInfo = [
      'FlyPool',
      '23w 23 Woodvale Avenue, Giffnock,',
      'Glasgow, G46 6RG, Scotland',
      'Company number SL024140',
      'Phone: +33 9 86 87 49 30'
  ];

  doc.setFont('Poppins', 'normal');
  doc.setFontSize(10);
  let yPosition = 15;

  companyInfo.forEach(line => {
      doc.text(line, 200, yPosition, { align: 'right' });
      yPosition += 5;
  });

  doc.setDrawColor(19, 1, 124);
  doc.setLineWidth(0.2);
  doc.line(10, yPosition + 5, 200, yPosition + 5);

  // Positionner les informations du client et le titre
  let clientInfoYPosition = yPosition + 20;
  const billingInfoLines = [
      `${billingInfo.firstName} ${billingInfo.lastName}`,
      `${billingInfo.country}`,
      `${billingInfo.city}`,
      `${billingInfo.streetAddress}`
  ];

  const xOffset = 110;  // Augmenté pour décaler les informations vers la droite
  billingInfoLines.forEach(line => {
      doc.text(line, xOffset, clientInfoYPosition);
      clientInfoYPosition += 5;
  });

  clientInfoYPosition += 15;

  // Titre de la facture
  doc.setFont('Poppins', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(19, 1, 124);
  doc.text(`Advertising space invoice - ${billingInfo.country}`, 10, clientInfoYPosition);

  // Début du tableau
  clientInfoYPosition += 15;

  // Styles de l'en-tête du tableau
  doc.setFontSize(14); // Augmenter la taille de l'en-tête
  doc.setFont('Poppins', 'bold'); // Mettre en gras
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(19, 1, 124); // Couleur de fond #13017c pour l'en-tête

  // En-tête du tableau
  const headers = ["Description", "Selected Product", "Details"];
  const headerXPositions = [10, 70, 150];
  const headerYPosition = clientInfoYPosition;

  doc.rect(10, headerYPosition - 8, 190, 10, 'F'); // Arrière-plan de l'en-tête
  headers.forEach((header, index) => {
      doc.text(header, headerXPositions[index], headerYPosition);
  });

  clientInfoYPosition += 10;

  // Détails des produits et options
  doc.setFontSize(12);
  doc.setFont('Poppins', 'normal'); // Revenir à la police normale pour les détails
  doc.setTextColor(0, 0, 0); // Texte noir pour les lignes

  cartItems.forEach((item, index) => {
      const rowColor = index % 2 === 0 ? 255 : 245;

      doc.setFillColor(rowColor, rowColor, rowColor);

      // Ligne principale pour le package en gras
      doc.setFont('Poppins', 'bold'); // Mettre en gras le texte pour "Package"
      doc.rect(10, clientInfoYPosition - 6, 190, 10, 'F'); // Fond de la ligne
      doc.text("Advertising package", 10, clientInfoYPosition);
      doc.text(`${item.pack} for ${item.period}`, 70, clientInfoYPosition);
      doc.text(`${item.price} ${item.currency}`, 150, clientInfoYPosition);
      clientInfoYPosition += 10;

      // Afficher les options supplémentaires avec arrière-plan #66bfbe
      doc.setFont('Poppins', 'normal'); // Revenir à la police normale pour les options
      doc.setTextColor(255, 255, 255); // Texte blanc pour les options

      if (item.addOn1) {
          doc.setFillColor(102, 191, 190); // Couleur #66bfbe pour les options supplémentaires
          doc.rect(10, clientInfoYPosition - 6, 190, 10, 'F');
          doc.text("Additional option 1", 10, clientInfoYPosition);
          doc.text(`${item.addOn1}`, 70, clientInfoYPosition);
          doc.text(`${item.addOnPrice1} ${item.currency}`, 150, clientInfoYPosition);
          clientInfoYPosition += 10;
      }
      if (item.addOn2) {
          doc.setFillColor(102, 191, 190);
          doc.rect(10, clientInfoYPosition - 6, 190, 10, 'F');
          doc.text("Additional option 2", 10, clientInfoYPosition);
          doc.text(`${item.addOn2}`, 70, clientInfoYPosition);
          doc.text(`${item.addOnPrice2} ${item.currency}`, 150, clientInfoYPosition);
          clientInfoYPosition += 10;
      }
      if (item.addOn3) {
          doc.setFillColor(102, 191, 190);
          doc.rect(10, clientInfoYPosition - 6, 190, 10, 'F');
          doc.text("Additional option 3", 10, clientInfoYPosition);
          doc.text(`${item.addOn3}`, 70, clientInfoYPosition);
          doc.text(`${item.addOnPrice3} ${item.currency}`, 150, clientInfoYPosition);
          clientInfoYPosition += 10;
      }

      // Réinitialiser le texte noir et ligne de séparation
      doc.setTextColor(0, 0, 0); 
      doc.line(10, clientInfoYPosition, 200, clientInfoYPosition);
      clientInfoYPosition += 5;
  });

  // Ajouter le montant total
  clientInfoYPosition += 10;
  doc.setFontSize(14); // Taille de la police augmentée pour le total
  doc.setFont('Poppins', 'bold'); // Texte en gras
  doc.setTextColor(19, 1, 124); // Couleur du texte pour le montant total
  doc.text("Total Amount", 10, clientInfoYPosition);
  doc.text(`${totalAmount} ${currency}`, 150, clientInfoYPosition);

  // Pied de page
  doc.setFontSize(10);
  doc.setTextColor(19, 1, 124);
  doc.text("Email: info@flypool.me", 40, 280);
  doc.setTextColor(0, 0, 255);
  doc.textWithLink("Website: https://flypool.me/", 120, 280, { url: "https://flypool.me/" });

  // Sauvegarder le fichier PDF avec le nom du client dans le nom du fichier
  doc.save(`invoice_${billingInfo.firstName}_${billingInfo.lastName}.pdf`);
};


const downloadPartnershipPDF = async (billingInfo) => {
  const partnership = '/partnership.pdf';  // Le chemin vers le fichier dans le dossier public

  // Récupérer le fichier PDF depuis le dossier public
  const response = await fetch(partnership);
  if (!response.ok) {
    console.error('Erreur lors de la récupération du fichier PDF');
    return;
  }

  const existingPdfBytes = await response.arrayBuffer();

  // Charger le document PDF
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Obtenir la première page du PDF
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Ajouter le texte avec le nom du client, en couleur #13017c
  const { firstName, lastName } = billingInfo;
  firstPage.drawText(`${firstName} ${lastName}`, {
    x: 80,
    y: 650, // Ajustez la valeur de 'y' selon le besoin
    size: 12,
    color: rgb(19 / 255, 1 / 255, 124 / 255), // Couleur #13017c
  });

  // Sauvegarder le nouveau PDF
  const pdfBytes = await pdfDoc.save();

  // Télécharger le fichier PDF modifié
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `partnership_with_${firstName}_${lastName}.pdf`;
  link.click();
};



const ConfirmationPage = () => {
  const location = useLocation();

  // Extraction des paramètres de l'URL
  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get('data');
  const parsedData = JSON.parse(decodeURIComponent(data));

  // Extraction des informations spécifiques
  const { cartItems, totalAmount, currency, billingInfo } = parsedData;

  // Si aucun élément de panier n'est présent, retourner un message d'erreur
  if (!cartItems || cartItems.length === 0) {
    return <div>Pas d'éléments dans le panier</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-center text-success">Payment Confirmation</h1>

        {/* Afficher les informations de l'article dans le panier */}
        <h3 className="mt-4">Order Details</h3>
        {cartItems.map((item, index) => (
          <div key={index} className="mb-3">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Pack:</strong> {item.pack}</p>
                <p><strong>Price:</strong> {item.price} {item.currency}</p>
                <p><strong>Period:</strong> {item.period}</p>
                <p><strong>Country:</strong> {item.country}</p>
              </div>
              <div className="col-md-6">
                {/* Afficher les options supplémentaires et leurs prix */}
                {item.addOn1 && (
                  <p><strong>Option 1:</strong> {item.addOn1} - {item.addOnPrice1} {item.currency}</p>
                )}
                {item.addOn2 && (
                  <p><strong>Option 2:</strong> {item.addOn2} - {item.addOnPrice2} {item.currency}</p>
                )}
                {item.addOn3 && (
                  <p><strong>Option 3:</strong> {item.addOn3} - {item.addOnPrice3} {item.currency}</p>
                )}
              </div>
            </div>
            <hr />
          </div>
        ))}

        {/* Afficher le montant total */}
        <h3 className="mt-3">Total Amount</h3>
        <p className="h4 text-primary">{totalAmount} {currency}</p>

        {/* Afficher les informations de facturation */}
        <h3 className="mt-4">Billing Information</h3>
        <p><strong>Name:</strong> {billingInfo.firstName} {billingInfo.lastName}</p>
        <p><strong>Country:</strong> {billingInfo.country}</p>
        <p><strong>City:</strong> {billingInfo.city}</p>
        <p><strong>Street Address:</strong> {billingInfo.streetAddress}</p>

        {/* Bouton pour télécharger la facture PDF */}
        <div className="text-center mt-4">
          <button
            className="btn btn-success btn-lg"
            onClick={() => generateInvoicePDF(cartItems, totalAmount, currency, billingInfo)}
          >
            Download Invoice
          </button>
          {/* Nouveau bouton pour télécharger le document de partenariat */}
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
