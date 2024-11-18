import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Divider } from '@mui/material';
import detailImage from '../images/detail.png'; // Import the image

const PriceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure the state with fallback values and convert prices to integers
  const {
    pack = "Default Pack",
    price = 0,
    currency = "EUR",
    addOn1 = null,
    addOn2 = null,
    addOn3 = null,
    addOnPrice1 = 0,
    addOnPrice2 = 0,
    addOnPrice3 = 0,
    period = "1 month",
    country = "Unknown Country",
    link = "no link"
  } = location.state || {};

  // Convert prices to integers
  const integerPrice = parseInt(price, 10) || 0;
  const integerAddOnPrice1 = parseInt(addOnPrice1, 10) || 0;
  const integerAddOnPrice2 = parseInt(addOnPrice2, 10) || 0;
  const integerAddOnPrice3 = parseInt(addOnPrice3, 10) || 0;

  // State to manage cart items
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = () => {
    const newItem = {
      pack,
      price: integerPrice,
      currency,
      period,
      addOn1,
      addOn2,
      addOn3,
      addOnPrice1: integerAddOnPrice1,
      addOnPrice2: integerAddOnPrice2,
      addOnPrice3: integerAddOnPrice3,
      country,
      link,
    };

    const updatedCartItems = [...cartItems, newItem];
    setCartItems(updatedCartItems);

    // Calculate total price with checks for validity
    const totalPrice = updatedCartItems
      .reduce((acc, item) => {
        const itemPrice = typeof item.price === 'number' ? item.price : 0;
        const itemAddOnPrice1 = typeof item.addOnPrice1 === 'number' ? item.addOnPrice1 : 0;
        const itemAddOnPrice2 = typeof item.addOnPrice2 === 'number' ? item.addOnPrice2 : 0;
        const itemAddOnPrice3 = typeof item.addOnPrice3 === 'number' ? item.addOnPrice3 : 0;
        return acc + itemPrice + itemAddOnPrice1 + itemAddOnPrice2 + itemAddOnPrice3;
      }, 0)
      .toFixed(2);

    // Navigate to the payment page
    navigate(`/details/${country}/${pack}/${period}/payment`, {
      state: {
        cartItems: updatedCartItems,
        currency,
        country,
        totalPrice,
      },
    });
  };

  return (
    <Box
      sx={{
        padding: 2,
        margin: '100px auto',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        boxShadow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
      }}
    >
      <Box sx={{ flex: 1, marginRight: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#13017c', textAlign: 'left' }}>
          Details of ads products you have selected in <strong>{country}</strong>
        </Typography>

        <Divider sx={{ my: 1, backgroundColor: '#55a4a3' }} />

        <Typography variant="h6">
          Selected package: <strong>{pack}</strong> for {period}
        </Typography>
        <Typography variant="h6">
          Price: <strong>{integerPrice} {currency}</strong>
        </Typography>

        {/* Display the additional services if they are available */}
        {addOn1 && (
          <Typography variant="h6">
            Additional service 1: <strong>{addOn1}</strong> - {integerAddOnPrice1} {currency}
          </Typography>
        )}
        {addOn2 && (
          <Typography variant="h6">
            Additional service 2: <strong>{addOn2}</strong> - {integerAddOnPrice2} {currency}
          </Typography>
        )}
        {addOn3 && (
          <Typography variant="h6">
            Additional service 3: <strong>{addOn3}</strong> - {integerAddOnPrice3} {currency}
          </Typography>
        )}

        <Divider sx={{ my: 1, backgroundColor: '#55a4a3' }} />

        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            marginTop: 2,
            borderColor: '#55a4a3',
            color: '#55a4a3',
            '&:hover': {
              backgroundColor: '#13017c',
              color: '#fff',
            },
          }}
        >
          Return to price list
        </Button>

        <Button
          variant="contained"
          onClick={handleAddToCart}
          sx={{
            marginTop: 2,
            marginLeft: 2,
            backgroundColor: '#13017c',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#55a4a3',
              color: '#13017c',
            },
          }}
        >
          Add to cart
        </Button>
      </Box>

      {/* Image section */}
      <Box
        component="img"
        src={detailImage}
        alt="Details"
        sx={{
          width: '250px',
          height: 'auto',
          borderRadius: 4,
          boxShadow: 1,
        }}
      />
    </Box>
  );
};

export default PriceDetails;
