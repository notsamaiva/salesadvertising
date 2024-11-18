// src/components/PriceCard.js
import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const PriceCard = ({ 
  title, 
  price, 
  currency, 
  period, 
  selectedPack, 
  setSelectedPack, 
  setSelectedPrice, 
  setSelectedCurrency, 
}) => {
  const handleSelect = () => {
    setSelectedPack(title);
    setSelectedPrice(price);
    setSelectedCurrency(currency);
  };

  const dailyPrice = (price / 30).toFixed(2); // Calculer le prix journalier

  const benefits = [
    'Showcasing your products and services on the FlyStore',
    'Strategic placement of your advertising banners on the FlyPool app',
    '03 display banner ads, sponsored ads, pop-ups, etc.',
  ];

  return (
    <Box
      onClick={handleSelect}
      sx={{
        border: selectedPack === title ? '1px solid #66bebf' : '2px solid #ccc',
        borderRadius: 12,
        padding: 3,
        backgroundColor: selectedPack === title ? '#66bebf' : '#ffffff',
        flex: 1,
        textAlign: 'center',
        boxShadow: selectedPack === title ? '0px 12px 30px rgba(0, 0, 0, 0.4)' : 'none', // Augmenter l'ombre pour la surbrillance
        transform: selectedPack === title ? 'scale(1.05)' : 'scale(1)', // Agrandir légèrement l'élément
        transition: 'transform 0.3s, background-color 0.3s, box-shadow 0.3s, border 0.3s',
        cursor: 'pointer',
      }}
    >
      {/* Titre en gras et agrandi */}
      <Typography variant="h4" sx={{ color: '#13017c', fontWeight: 'bold', mb: 2 }}>{title}</Typography>

      {/* Section Prix alignée à droite */}
      <Box sx={{ textAlign: 'right', my: 1 }}>
        {/* Affichage du prix mensuel */}
        <Typography variant="h5" sx={{ color: '#13017c' }}>
          <strong>{price} {currency}</strong> / {period}
        </Typography>

        {/* Affichage du prix journalier */}
        <Typography variant="body2" color="textSecondary" sx={{ color: '#66bebf' }}>
          {dailyPrice} {currency} / jour
        </Typography>
      </Box>

      {/* Séparateur avec épaisseur augmentée */}
      <Divider sx={{ my: 2, height: '3px', backgroundColor: '#66bebf' }} />

      {/* Liste des avantages avec des icônes de validation */}
      <Box sx={{ textAlign: 'left' }}>
        {benefits.map((benefit, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CheckCircleOutlineIcon sx={{ color: '#13017c', mr: 1 }} />
            <Typography variant="body1">{benefit}</Typography>
          </Box>
        ))}
      </Box>

      {/* Bouton de sélection */}
      <Button 
        variant={selectedPack === title ? "contained" : "outlined"}
        onClick={handleSelect}
        sx={{ 
          mt: 2, 
          borderColor: '#66bebf', 
          borderRadius: 12,
          color: selectedPack === title ? '#ffffff' : '#66bebf',
          backgroundColor: selectedPack === title ? '#66bebf' : 'transparent',
          '&:hover': {
            backgroundColor: '#66bebf', 
            color: '#ffffff', 
            borderColor: '#66bebf'
          }
        }}
      >
        {selectedPack === title ? 'selected' : 'start with this'}
      </Button>
    </Box>
  );
};

export default PriceCard;
