import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import contactImage from '../images/country.png'; // Import local image

const ChooseCountry = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]); // State to store fetched countries
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch countries from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost/pricing_app/get_countries.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched countries:', data); // Vérifiez si les pays sont loggés ici
        setCountries(data); // Mettez à jour le state avec les pays récupérés
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Handle country change
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  // Handle button click
  const handleButtonClick = () => {
    if (country) {
      // Redirect to the URL based on the selected country
      navigate(`/${country}/price-list`);
    } else {
      alert('Please select a country!'); // Alert if no country is selected
    }
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', padding: 4 }}>
      <Grid container spacing={2} sx={{ height: '100vh', alignItems: 'center', border: 'none' }}>
        
        {/* Form Section */}
        <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 }, padding: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ color: '#13017c' }}>
            Choose Your Country
          </Typography>
          
          {/* Country Select Dropdown */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel sx={{ color: '#13017c' }}>Country</InputLabel>
            <Select
              value={country}
              onChange={handleCountryChange}
              label="Country"
              sx={{
                backgroundColor: '#fff',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#13017c',
                  },
                  '&:hover fieldset': {
                    borderColor: '#66bebf',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#13017c',
                  },
                },
              }}
            >
              {countries.length > 0 ? (
                countries.map((countryName, index) => (
                  <MenuItem 
                    key={index} 
                    value={countryName}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#66bebf', // Color on hover
                        color: '#fff',
                      },
                      color: '#13017c', // Text color
                      padding: '10px 20px', // Internal spacing
                    }}
                  >
                    {countryName}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No countries available</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Notify Me Button */}
          <Button 
            variant="contained" 
            onClick={handleButtonClick} // Handle button click
            sx={{
              backgroundColor: '#66bebf',
              color: '#fff',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#13017c', // Background color on hover
              }
            }}
          >
            NEXT STEP
          </Button>

          {/* Contact Message */}
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            You haven't found your country? 
            <Link to="/contact-us" style={{ color: '#66bebf', textDecoration: 'underline' }}> Contact us.</Link>
          </Typography>
        </Grid>

        {/* Image Section */}
        <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 }, display: 'flex', justifyContent: 'center' }}>
          <Box 
            component="img"
            sx={{
              width: '500px',
              height: 'auto',
              transform: 'translateX(50px)', // Move the image to the right
            }}
            alt="Country selection image"
            src={contactImage}
          />
        </Grid>

      </Grid>
    </Box>
  );
};

export default ChooseCountry;


