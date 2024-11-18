import React, { useState } from 'react'; 
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
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_live_51MBcFECTKeEgqMF1YjC9qUVPKZAuE1GeaKMiYMt0uPhAOT4ppnJPeiSpaSegIfmH4SyWWEL6AwCftp4UeFUkHkoe00sYIYKyha'); // Remplacez par votre clé publique Stripe

const PaymentForm = ({ handlePaymentConfirmation }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmitPayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('PaymentMethod:', paymentMethod);
      // Continuez avec le paiement en envoyant paymentMethod au serveur
    }

    setIsProcessing(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmitPayment} sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Détails de paiement
      </Typography>
      <CardElement />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePaymentConfirmation}
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

const Payment = () => {
  const location = useLocation();
  const { currency, country, cartItems } = location.state || {};
  const navigate = useNavigate();
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: country,
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    pin: '',
    phone: '',
  });

  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  if (!currency || !cartItems) {
    return (
      <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', marginTop: 20 }}>
        <Typography variant="h6" color="error">
          Détails de paiement invalides. Veuillez revenir en arrière et réessayer.
        </Typography>
      </Box>
    );
  }

  const handleChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleReturnToPriceList = () => {
    navigate(`/${country}/price-list`);
  };

  const handlePaymentConfirmation = () => {
    console.log('Payment confirmed!');
    setSnackbarMessage('Paiement confirmé avec succès !');
    setSnackbarOpen(true);
    // Ajoutez ici votre logique de confirmation de paiement
  };

  const totalAmount = Array.isArray(cartItems) && cartItems.length > 0
    ? cartItems.reduce((acc, item) => {
        const itemPrice = Number(item.price) || 0;
        const addOnPrice = Number(item.addOnPrice) || 0;
        return acc + itemPrice + addOnPrice;
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

        <Typography variant="h4" sx={{ color: '#66bebf', marginTop: '20px' }} gutterBottom>
          Détails de paiement pour les produits de <strong>{country}</strong>
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
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
                  const addOnPrice = Number(item.addOnPrice) || 0;

                  return (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell>{item.name} {item.pack} for {item.period}</TableCell>
                        <TableCell align="right">{itemPrice.toFixed(2)} {currency}</TableCell>
                      </TableRow>
                      {item.addOn && item.addOnPrice > 0 && (
                        <TableRow>
                          <TableCell>{item.addOn}</TableCell>
                          <TableCell align="right">{addOnPrice.toFixed(2)} {currency}</TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

         
            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}
            >
              <Typography variant="h6">Total général :</Typography>
              <Typography variant="h6">
                {totalAmount} {currency}
              </Typography>
            </Box>

            <PaymentForm handlePaymentConfirmation={handlePaymentConfirmation} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Informations de facturation
              </Typography>
              {/* Formulaire d'informations de facturation ici */}
            </Box>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
        </Grid>
      </Box>
      
    </Elements>
  );
};

export default Payment;
