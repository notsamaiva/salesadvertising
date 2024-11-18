import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';

const EditPricelist = () => {
  const { pricelistId } = useParams(); // Get the pricelist ID from the URL
  const [formData, setFormData] = useState({
    currency: '',
    country: '',
    period: '',
    starter_price: '',
    promo_price: '',
    premium_price: '',
    standard: '',
    interstitial: '',
    videoads: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPricelist = async () => {
      try {
        const response = await fetch(`http://localhost/pricing_app/get_price.php?id=${pricelistId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const pricelist = await response.json();
        if (pricelist.error) {
          setError(pricelist.error);
        } else {
          setFormData(pricelist);
        }
      } catch (err) {
        setError(`Error fetching pricelist: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPricelist();
  }, [pricelistId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare data to send
    const dataToSend = {
      id: pricelistId,
      currency: formData.currency.trim(),
      country: formData.country.trim(),
      period: formData.period.trim(),
      starter_price: parseFloat(formData.starter_price.trim()),
      promo_price: parseFloat(formData.promo_price.trim()),
      premium_price: parseFloat(formData.premium_price.trim()),
      standard: formData.standard.trim(),
      interstitial: formData.interstitial.trim(),
      videoads: formData.videoads.trim(),
    };

    // Send data to the server
    try {
      const response = await fetch('http://localhost/pricing_app/update_pricelist.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
          const result = await response.json();
          if (result.status === 'success') {
              navigate('/dashboard-admin/offers'); // Redirect after successful update
          } else {
              alert(result.message); // Display the error message from the server
          }
      } else {
          const errorText = await response.text();
          alert(`Server error: ${response.status} ${errorText}`);
      }
  } catch (error) {
      alert('Network error: ' + error.message);
  }
  
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
        fontFamily: 'Poppins, sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid item xs={11} sm={8} md={6} component={Paper} elevation={6} square sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
            Modifier la liste des prix
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {[
                { label: 'Devise', name: 'currency' },
                { label: 'Pays', name: 'country' },
                { label: 'Période', name: 'period' },
                { label: 'Prix de départ', name: 'starter_price', type: 'number' },
                { label: 'Prix promo', name: 'promo_price', type: 'number' },
                { label: 'Prix premium', name: 'premium_price', type: 'number' },
                { label: 'Standard', name: 'standard' },
                { label: 'Interstitial', name: 'interstitial' },
                { label: 'Vidéo Ads', name: 'videoads' },
              ].map((field) => (
                <Grid item xs={12} sm={4} key={field.name}>
                  <Typography variant="body1" sx={{ mb: 1, fontSize: '0.875rem', color: 'crimson' }}>
                    {field.label}
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id={field.name}
                    placeholder={field.label}
                    name={field.name}
                    type={field.type || 'text'}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                mt: 3,
                mb: 2,
                bgcolor: '#111111',
                borderRadius: '32px',
                '&:hover': { bgcolor: '#333333' },
              }}
            >
              Enregistrer les modifications
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditPricelist;
