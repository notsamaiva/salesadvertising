import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return; // Stripe.js n'est pas encore chargé

    const card = elements.getElement(CardElement); // Récupérer les détails de la carte

    // Collecte des informations nécessaires pour le paiement
    const paymentMethodResult = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodResult.error) {
      setError(paymentMethodResult.error.message);
      return;
    }

    // Envoyer une requête à votre serveur pour créer un PaymentIntent
    setIsProcessing(true); // Début du traitement du paiement
    const response = await fetch("http://localhost/pricing_app/payment_intent.php", {
      method: "POST",
      body: JSON.stringify({
        payment_method_id: paymentMethodResult.paymentMethod.id,
        amount: 1000, // Exemple de montant (1000 cents = 10 USD)
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setIsProcessing(false); // Fin du traitement du paiement

    if (data.error) {
      setError(data.error);
      return;
    }

    // Obtenez le PaymentIntent et client_secret
    const { payment_intent, client_secret } = data;

    // Finaliser le paiement
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: paymentMethodResult.paymentMethod.id,
    });

    if (confirmError) {
      setError(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      setPaymentStatus("Paiement réussi !");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {paymentStatus && <p>{paymentStatus}</p>}
      <button type="submit" disabled={isProcessing || !stripe || !elements}>
        {isProcessing ? "Traitement..." : "Payer"}
      </button>
    </form>
  );
};

export default CheckoutForm;
