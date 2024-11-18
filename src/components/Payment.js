
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MenuItem from '@mui/material/MenuItem';

import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Q9q8CKLormjlT3XgTXhO3vUqkuzGqHQAzfQ1giBWUA2EH0ojWsFPP1OvDMVS6l1Vp06d4YjWYcbf5AQLZrqlR7L00IT6GL1g3');

const PaymentForm = ({ handlePaymentConfirmation, billingInfo, totalAmount, navigate, country, pack, period }) => {
  
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const { currency, cartItems } = location.state || {};

  // Define handleSubmitPayment before return
  
    const handleSubmitPayment = async (event) => {
      event.preventDefault();

  if (!stripe || !elements) return;

  // Validate billing information
  if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.country || !billingInfo.city || !billingInfo.streetAddress) {
    setError('Veuillez remplir tous les champs de facturation avant de procéder au paiement.');
    return;
  }

  // Check if currency or cart items are missing
  if (!currency || !cartItems || cartItems.length === 0) {
    setError('Détails de paiement invalides. Veuillez revenir en arrière et réessayer.');
    return;
  }

  setIsProcessing(true);
  setError(null);

  const cardElement = elements.getElement(CardElement);
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (error) {
    setError(error.message);
    setIsProcessing(false);
    return;
  }
  try {
    const response = await fetch('http://localhost/pricing_app/payment.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method_id: paymentMethod.id,
        amount: Math.round(totalAmount),
        billing_info: billingInfo,
        currency: currency,
        return_url: 'http://localhost:3000/confirmation',
      }),
    });
  
    const result = await response.json();
    console.log("API result:", result);  // Vérification de la réponse API
  
    if (response.ok && !result.error) {
      const purchaseDetails = {
        cartItems: cartItems,
        totalAmount: totalAmount,
        currency: currency,
        billingInfo: billingInfo,
      };
  
      // Utilisation des valeurs renvoyées par l'API ou des valeurs par défaut
      const country = result.country || cartItems[0]?.country || 'defaultCountry';
      const pack = result.pack || cartItems[0]?.pack || 'defaultPack';
      const period = result.period || cartItems[0]?.period || 'defaultPeriod';
  
      const confirmationUrl = `/${country}/${pack}/${period}/payment/confirmation`;
  
      // Redirection avec les détails
      navigate(confirmationUrl, {
        state: {
          currency,
          country,
        },
      });
      window.location.href = `${confirmationUrl}?data=${encodeURIComponent(JSON.stringify(purchaseDetails))}`;
    } else {
      setError('Erreur serveur: ' + (result.error || 'Une erreur s\'est produite.'));
    }
  } catch (error) {
    console.error("API fetch error:", error);
    setError("Erreur lors de l'appel à l'API : " + error.message);
  }
  
  
  setIsProcessing(false);
};


  return (
    <Box component="form" onSubmit={handleSubmitPayment} sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Détails de paiement
      </Typography>
      <CardElement />
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
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
        {isProcessing ? 'Traitement en cours...' : 'Payer'}
      </Button>
    </Box>
  );
};


const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { currency, country, cartItems } = location.state || {};

  
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    streetAddress: '',
    link: '' // Ajout du champ 'link'
  });
  useEffect(() => {
    // Si cartItems est défini et a des éléments, on met à jour link avec la première valeur
    if (cartItems && cartItems.length > 0) {
      setBillingInfo((prevInfo) => ({
        ...prevInfo,
        link: cartItems[0].link, // Récupère le lien du premier élément
      }));
    }
  }, [cartItems]);

  const handleChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
console.log("Country:", country);
console.log("Pack:", cartItems[0]?.pack);
console.log("Period:", cartItems[0]?.period);

  if (!currency || !cartItems) {
    return (
      <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', marginTop: 20 }}>
        <Typography variant="h6" color="error">
          Détails de paiement invalides. Veuillez revenir en arrière et réessayer.
        </Typography>
      </Box>
    );
  }


  const handleReturnToPriceList = () => {
    navigate(`/${country}/price-list`);
  };

  const handlePaymentConfirmation = () => {
    setSnackbarMessage('Paiement confirmé avec succès !');
    setSnackbarOpen(true);
  };

  const totalAmount = Array.isArray(cartItems) && cartItems.length > 0
  ? cartItems.reduce((acc, item) => {
      const itemPrice = Number(item.price) || 0;
      const addOnPrices = [
        Number(item.addOnPrice1) || 0,
        Number(item.addOnPrice2) || 0,
        Number(item.addOnPrice3) || 0,
      ];

      // Sum the base price and add-ons
      const addOnTotal = addOnPrices.reduce((sum, price) => sum + price, 0);
      return acc + itemPrice + addOnTotal;
    }, 0).toFixed(2)
  : 0;

  return (
    <Elements stripe={stripePromise}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          marginTop: 20,
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        <Button
          variant="outlined"
          onClick={handleReturnToPriceList}
          sx={{
            marginTop: 2,
            borderColor: '#13017c',
            color: '#13017c',
            '&:hover': {
              backgroundColor: '#66bebf',
              color: '#fff',
            },
          }}
        >
          Retour à la liste des prix
        </Button>
        {cartItems.map((item, index) => (
  <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', marginBottom: 2 }} key={index}>
    URL Price: {item.link ? item.link : 'Lien non disponible'}
  </Typography>
))}


        <Typography variant="h4" sx={{ color: '#66bebf', marginTop: '20px' }} gutterBottom>
          Détails de paiement pour les produits de <strong>{country}</strong>
        </Typography>
        {cartItems.map((item, index) => {
  const itemPrice = Number(item.price) || 0;

  // Store add-on prices in an array
  const addOnPrices = [
    Number(item.addOnPrice1) || 0,
    Number(item.addOnPrice2) || 0,
    Number(item.addOnPrice3) || 0,
  ];
  return (
        <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', marginBottom: 2 }}>
       URL Price : {item.link}
</Typography>
     );
    })}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produit</TableCell>
                    <TableCell align="right">Prix total ({currency})</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {cartItems.map((item, index) => {
  const itemPrice = Number(item.price) || 0;

  // Store add-on prices in an array
  const addOnPrices = [
    Number(item.addOnPrice1) || 0,
    Number(item.addOnPrice2) || 0,
    Number(item.addOnPrice3) || 0,
  ];

  // Calculate the total add-on price by summing the values in the addOnPrices array
  const addOnTotal = addOnPrices.reduce((sum, price) => sum + price, 0);

  return (
    <React.Fragment key={index}>
      {/* Main item row */}
      
      <TableRow>
        <TableCell>{item.pack} for {item.period}</TableCell>
        <TableCell align="right">{itemPrice.toFixed(2)} {currency}</TableCell>
      </TableRow>

      {/* Add-ons rows */}
      {item.addOn1 && (
        <TableRow>
          <TableCell>{item.addOn1}</TableCell>
          <TableCell align="right">{addOnPrices[0].toFixed(2)} {currency}</TableCell>
        </TableRow>
      )}
      {item.addOn2 && (
        <TableRow>
          <TableCell>{item.addOn2}</TableCell>
          <TableCell align="right">{addOnPrices[1].toFixed(2)} {currency}</TableCell>
        </TableRow>
      )}
      {item.addOn3 && (
        <TableRow>
          <TableCell>{item.addOn3}</TableCell>
          <TableCell align="right">{addOnPrices[2].toFixed(2)} {currency}</TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
})}
 
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <Typography variant="h6">Total général :</Typography>
              <Typography variant="h6">
                {totalAmount} {currency}
              </Typography>
            </Box>
            <PaymentForm
  handlePaymentConfirmation={handlePaymentConfirmation}
  billingInfo={billingInfo}
  totalAmount={totalAmount}
  navigate={navigate}
  country={country}
  pack={cartItems[0]?.pack} // Pack de l'élément du panier
  period={cartItems[0]?.period} // Période de l'élément du panier
/>


          </Grid>

          <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 2 }}>
    <Typography variant="h5" gutterBottom>
      Informations de facturation
    </Typography>

    <TextField
      label="Prénom"
      name="firstName"
      value={billingInfo.firstName}
      onChange={handleChange}
      fullWidth
      required
      sx={{ mb: 2 }}
    />

    <TextField
      label="Nom"
      name="lastName"
      value={billingInfo.lastName}
      onChange={handleChange}
      fullWidth
      required
      sx={{ mb: 2 }}
    />

    <TextField
      label="Pays"
      name="country"
      value={billingInfo.country}
      onChange={handleChange}
      fullWidth
      required
      sx={{ mb: 2 }}
    />

    <TextField
      label="Ville"
      name="city"
      value={billingInfo.city}
      onChange={handleChange}
      fullWidth
      required
      sx={{ mb: 2 }}
    />

    <TextField
      label="Adresse"
      name="streetAddress"
      value={billingInfo.streetAddress}
      onChange={handleChange}
      fullWidth
      required
      sx={{ mb: 2 }}
    />

    {/* Champ masqué pour le lien */}
    <TextField
      type="hidden"
      name="link"
      value={billingInfo.link}
      onChange={handleChange}
    />
</Box>

</Grid>

        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Elements>
  );
};

export default Payment;
