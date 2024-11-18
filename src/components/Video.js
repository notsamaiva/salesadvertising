// src/components/AddOnCard.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const AddOnCard = ({ title, price, currency, selectedAddOn, setSelectedAddOn }) => {
  const handleSelect = () => {
    setSelectedAddOn(title);
  };

  const isSelected = selectedAddOn === title;

  // Liste des avantages
  const benefits = [
    'your logo for brand integration, the textual content ofthe advertisement, detailed color speciﬁcations toensure visual coherence, and any supplementaryimages essential for conveying your messageeffectively',
  ];

  return (
    <Box
      onClick={handleSelect}
      sx={{
        border: isSelected ? '2px solid #66bebf' : '1px solid #ccc',

        padding: 3,
        backgroundColor: isSelected ? '#66bebf' : '#ffffff',
        textAlign: 'center',
        flex: 1,
        boxShadow: isSelected ? '0px 12px 20px rgba(0, 0, 0, 0.3)' : 'none',
        transition: 'background-color 0.3s, box-shadow 0.3s, border-color 0.3s',
      }}
    >
      {/* Title */}
      <Typography variant="h5" sx={{ color: '#13017c ', mb: 2, fontWeight: 'bold' }}>{title}</Typography>

      {/* Price */}
      <Typography variant="h4" >
        {price} {currency}
      </Typography>

      {/* Text under the price */}
      <Typography variant="h7" gutterBottom sx={{ color: '#13017c ', textAlign: 'center' }}>
        <Box
          sx={{
            backgroundColor: '#66bebf', // Changed to primary color
            color: '#ffffff',
            display: 'inline-block',
            padding: '5px 10px',
            borderRadius: '20px',
            marginBottom: '15px',
            textAlign: 'center',
          }}
        >
          2 iterations permitted
        </Box>
      </Typography>

      <Typography variant="body2" style={{ color: '#58468c', fontWeight: 'bold' }}>
Complementary to part
of an offer greater than orequal to that of FlyPro
</Typography>

      {/* List of benefits with icons */}
      <Box sx={{ textAlign: 'left', mb: 2 }}>
        {benefits.map((benefit, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CardGiftcardIcon sx={{ color: '#13017c ', mr: 1 }} />
            <Typography variant="body1" >{benefit}</Typography>
          </Box>
        ))}
      </Box>

      {/* Select Button */}
      <Button 
        variant={isSelected ? "contained" : "outlined"}
        onClick={handleSelect}
        sx={{ 
          mt: 2, 
          borderColor: isSelected ? '#66bebf' : '#ccc',
          color: isSelected ? '#ffffff' : '#66bebf', 
          backgroundColor: isSelected ? '#66bebf' : 'transparent',
          '&:hover': {
            backgroundColor: '#66bebf',
            color: '#ffffff',
          },
        }}
      >
        {isSelected ? 'added' : 'add this'}
      </Button>
    </Box>
  );
};

export default AddOnCard;
