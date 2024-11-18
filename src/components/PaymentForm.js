import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ handlePaymentConfirmation }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    streetAddress: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBillingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmitPayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(''); // Reset error message before submission

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Erreur de création du PaymentMethod:', error);
      setErrorMessage(error.message);
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch('http://localhost/pricing_app/payment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount: 1000, // Montant en centimes
          billing_info: billingInfo,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setErrorMessage(data.error);
        setIsProcessing(false);
        return;
      }

      const { error: stripeError } = await stripe.confirmCardPayment(data.client_secret);
      if (stripeError) {
        console.error('Erreur de confirmation de paiement:', stripeError);
        setErrorMessage(stripeError.message);
      } else {
        console.log('Paiement confirmé avec succès');
        handlePaymentConfirmation();
      }
    } catch (err) {
      console.error('Erreur lors de la communication avec le serveur:', err);
      setErrorMessage('Une erreur est survenue, veuillez réessayer plus tard.');
    }

    setIsProcessing(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmitPayment} sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Informations de facturation
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Prénom"
            name="firstName"
            value={billingInfo.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Nom"
            name="lastName"
            value={billingInfo.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Adresse"
            name="streetAddress"
            value={billingInfo.streetAddress}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Ville"
            name="city"
            value={billingInfo.city}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Pays"
            name="country"
            value={billingInfo.country}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
      </Grid>

      {errorMessage && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Détails de paiement
      </Typography>
      <CardElement />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{
          marginTop: 4,
          backgroundColor: '#13017c',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#66bebf',
            color: '#fff',
          },
        }}
        disabled={isProcessing || !stripe || !elements}
      >
        Payer
      </Button>
    </Box>
  );
};

export default PaymentForm;
