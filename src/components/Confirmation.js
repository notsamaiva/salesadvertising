import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Pour récupérer les paramètres de l'URL

const Confirmation = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    // Extraire les paramètres de l'URL
    const searchParams = new URLSearchParams(location.search);
    const paymentIntentId = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("client_secret");

    if (paymentIntentId && clientSecret) {
      // Appeler le backend pour vérifier le statut du paiement
      fetch("http://localhost/pricing_app/statut_paiement.php", {
        method: "POST",
        body: JSON.stringify({ payment_intent_id: paymentIntentId, client_secret: clientSecret }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "succeeded") {
            setPaymentStatus("success");
            setTransactionDetails(data.transaction); // Détails de la transaction
          } else {
            setPaymentStatus("failed");
            setError(data.error || "Le paiement a échoué.");
          }
        })
        .catch((error) => {
          setPaymentStatus("failed");
          setError("Une erreur s'est produite lors de la vérification du paiement.");
        });
    }
  }, [location]);

  if (paymentStatus === null) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Confirmation de paiement</h1>
      {paymentStatus === "success" ? (
        <div>
          <h2>Votre paiement a été effectué avec succès !</h2>
          <p>Merci pour votre achat !</p>
          <p><strong>Détails de la transaction :</strong></p>
          <ul>
            <li>Montant : ${transactionDetails.amount / 100}</li> {/* Montant en dollars */}
            <li>Nom : {transactionDetails.first_name} {transactionDetails.last_name}</li>
            <li>Adresse : {transactionDetails.street_address}, {transactionDetails.city}, {transactionDetails.country}</li>
          </ul>
        </div>
      ) : (
        <div>
          <h2>Le paiement a échoué</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
