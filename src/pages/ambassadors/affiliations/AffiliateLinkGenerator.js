import React, { useState, useEffect } from 'react'; 
import { Grid, Button, Typography, Box, MenuItem, FormControl, InputLabel, Select, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const AffiliateLinkGenerator = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost/pricing_app/get_countries.php');
        if (!response.ok) {
          throw new Error('Error fetching countries');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
        setSnackbarMessage('Failed to fetch countries. Please try again later.');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleButtonClick = async () => {
    if (country && user) {
      if (user.username) {
        try {
          const response = await fetch('http://localhost/pricing_app/get_user_id.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: user.username,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.id) {
            const generatedLink = `/${encodeURIComponent(country)}/price-list?ref=${encodeURIComponent(user.username)}`;

            const saveResponse = await fetch('http://localhost/pricing_app/save_affiliate_link.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_user: data.id,
                country: country,
                generated_link: generatedLink,
              }),
            });

            if (!saveResponse.ok) {
              throw new Error(`Failed to save link, status: ${saveResponse.status}`);
            }

            const saveData = await saveResponse.json();

            setSnackbarMessage(saveData.message);
            setOpenSnackbar(true);
            navigate(`/dashboard-ambassadors/AffiliateLinkList`);
            
          } else {
            setSnackbarMessage(data.error || 'Failed to fetch user ID');
            setOpenSnackbar(true);
          }
        } catch (error) {
          console.error('Fetch error:', error);
          setSnackbarMessage(error.message);
          setOpenSnackbar(true);
        }
      } else {
        setSnackbarMessage('User information is incomplete!');
        setOpenSnackbar(true);
      }
    } else if (!country) {
      setSnackbarMessage('Please select a country!');
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage('User not connected!');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', padding: 4 }}>
      <Grid container spacing={2} sx={{ height: '100vh', alignItems: 'flex-start', border: 'none' }}>
        <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 }, paddingTop: 0, paddingBottom: 2 }}>
          <Typography variant="h3" gutterBottom sx={{ color: '#13017c', marginTop: 0 }}>
            Choose Your Country
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ marginTop: 0 }}>
          select the country for which you wish to generate an affiliate link
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel sx={{ color: '#13017c' }}>Country</InputLabel>
            <Select
              value={country}
              onChange={handleCountryChange}
              label="Country"
              sx={{
                backgroundColor: '#fff',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#13017c' },
                  '&:hover fieldset': { borderColor: '#66bebf' },
                  '&.Mui-focused fieldset': { borderColor: '#13017c' },
                },
              }}
            >
              {loading ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : countries.length > 0 ? (
                countries.map((countryName, index) => (
                  <MenuItem key={index} value={countryName} sx={{ color: '#13017c', padding: '10px 20px' }}>
                    {countryName}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No countries available</MenuItem>
              )}
            </Select>
          </FormControl>
          <Button
  variant="contained"
  onClick={handleButtonClick}
  sx={{
    backgroundColor: '#66bebf',
    color: '#fff',
    padding: '10px 20px',

    borderRadius: '16px', // Optionnel : ajuste le rayon de la bordure
    '&:hover': {
      backgroundColor: '#13017c',
      borderColor: '#66bebf', // Change la couleur de la bordure au survol
    },
  }}
>
  Generate Affiliate Link
</Button>

        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'info'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AffiliateLinkGenerator;
