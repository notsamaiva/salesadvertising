import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
const AddOnCard = ({ title, price, currency, selectedAddOn, setSelectedAddOn, isSelected }) => {
  const handleSelect = () => {
    setSelectedAddOn(title);
  };

  
  // Benefits list
    const benefits = React.useMemo(() => [
      'You must provide us with your logo; text of the ad; colours specifications',
    ], []);
  
  
  return (
    <Card
      onClick={() => setSelectedAddOn(title)}
      sx={{
        cursor: 'pointer',
        border: isSelected ? '2px solid #66bebf' : '1px solid #ccc',
        backgroundColor: isSelected ? '#e0f7fa' : '#fff', // Highlight with a vibrant color
        transition: 'background-color 0.3s ease, border 0.3s ease',
        '&:hover': {
          backgroundColor: '#f1f1f1',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2">{currency} {price}</Typography>
        </Box>
          {/* Text below price */}
      <Box
        sx={{
          backgroundColor: '#004ba5',
          color: '#ffffff',
          display: 'inline-block',
          padding: '5px 10px',
          borderRadius: '20px',
          marginBottom: '15px',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          2 iterations permitted
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: isSelected ? '#ffffff' : '#13017c', fontWeight: 'bold' }}>
        Complimentary with purchase over 100,000 impressions/month
      </Typography>

      {/* List of benefits with icons */}
      <Box sx={{ textAlign: 'left', mb: 2 }}>
        {benefits.map((benefit, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CardGiftcardIcon sx={{ color: isSelected ? '#ffffff' : '#13017c', mr: 1 }} />
            <Typography variant="body1" sx={{ color: isSelected ? '#ffffff' : '#13017c' }}>
              {benefit}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Select Button */}
      <Button
        variant={isSelected ? 'contained' : 'outlined'}
        onClick={handleSelect}
        sx={{
          mt: 2,
          borderColor: isSelected ? '#004ba5' : '#ccc',
          color: isSelected ? '#ffffff' : '#004ba5',
          backgroundColor: isSelected ? '#004ba5' : 'transparent',
          '&:hover': {
            backgroundColor: '#004ba5',
            color: '#ffffff',
          },
        }}
      >
        {isSelected ? 'Added' : 'Add This'}
      </Button>
      </CardContent>
    </Card>
  );
};

export default AddOnCard;
