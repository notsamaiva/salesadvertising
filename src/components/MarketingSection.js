import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, Box, IconButton } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MarketingSection = () => {
  const { country } = useParams();
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null);
  const [period] = useState('monthly');

  // Fonction pour récupérer les prix depuis l'API
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(`http://localhost/pricing_app/get_prices.php?country=${country}`);
        
        console.log('Réponse de l\'API:', response.data); // Debugging
        
        if (response.data.success) {
          if (response.data.data && response.data.data.length > 0) {
            setPrices(response.data.data[0]);
          } else {
            setError('Aucun détail de prix trouvé pour le pays sélectionné.');
          }
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Une erreur s\'est produite lors de la récupération des prix.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [country]);

  // Gestion de la sélection d'un pack
  const handleSelectPack = (service) => {
    setSelectedPack(service.planName);
  };

  // Définition des services
  const services = [
    {
      title: 'Standard display app banner ad creative (incl. Collapsible format)',
      price: prices?.standard ? `${prices.standard} ${prices.currency}` : 'N/A',
      gain: '(complimentary with purchase over 100,000 impressions/month)',
      description: 'You must provide us with your logo; text of the ad; colours specifications',
      planName: 'standard_display',
    },
    {
      title: 'Full screen display app banner (interstitial)',
      price: prices?.interstitial ? `${prices.interstitial} ${prices.currency}` : 'N/A',
      gain: '(complimentary with purchase over 100,000 impressions/month)',
      description: 'You must provide us with your logo; text of the ad; colours specifications; any images you want to use',
      planName: 'full_screen',
    },
    {
      title: 'Video ads',
      price: prices?.videoads ? `${prices.videoads} ${prices.currency}` : 'N/A',
      gain: '(Complementary to part of an offer greater than or equal to that of FlyPro)',
      description: 'Provide logo for brand integration, ad text, color specifications for visual consistency, and images needed for effective messaging',
      planName: 'video_ads',
    },
  ];

  // Affichage du chargement
  if (loading) {
    return <Typography variant="h6" align="center">Loading prices...</Typography>;
  }

  // Affichage de l'erreur
  if (error) {
    return (
      <Typography variant="h6" align="center" color="error" style={{ fontWeight: 'bold', marginTop: '20px' }}>
        {error}
      </Typography>
    );
  }

  // Détermination du prix affiché selon le pack sélectionné
  let displayedPrice = 'N/A';
  if (selectedPack === 'standard_display') {
    displayedPrice = prices?.standard ? `${prices.standard} ${prices.currency}` : 'N/A';
  } else if (selectedPack === 'full_screen') {
    displayedPrice = prices?.interstitial ? `${prices.interstitial} ${prices.currency}` : 'N/A';
  } else if (selectedPack === 'video_ads') {
    displayedPrice = prices?.videoads ? `${prices.videoads} ${prices.currency}` : 'N/A';
  }

  return (
    <Grid container spacing={4} justifyContent="center" style={{ backgroundColor: '#EAF3FF', padding: '40px 0' }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" style={{ color: '#13017c', fontWeight: 'bold', marginBottom: '20px' }}>
          Additional prices
        </Typography>
        <Typography variant="h6" align="center" style={{ color: '#000000', marginBottom: '40px' }}>
          Designing ad creative in-house: You must supply the text for all standard text banner ads (including foldable format).
        </Typography>
      </Grid>

      {services.map((service, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            style={{
              textAlign: 'flex-start',
              padding: '20px',
              backgroundColor: selectedPack === service.planName ? '#ff8a73' : '#fff',
              borderRadius: '10px',
              borderTopLeftRadius: '0',
              borderTopRightRadius: '30px',
              borderBottomLeftRadius: '0',
              borderBottomRightRadius: '30px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
            }}
            onClick={() => handleSelectPack(service)}
          >
            <IconButton
              style={{
                backgroundColor: '#55a4a3',
                color: '#ffffff',
                marginBottom: '20px',
                padding: '20px',
                fontSize: '24px',
                borderRadius: '50%',
              }}
              disabled
            >
              <CardGiftcardIcon />
            </IconButton>
            <CardContent>
              <Typography variant="h6" gutterBottom style={{ color: '#13017c', fontWeight: 'bold', textAlign: 'center' }}>
                {service.title}
                <Box
                  style={{
                    backgroundColor: '#55a4a3',
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

              <Typography variant="h4" gutterBottom style={{ color: '#000000', fontWeight: 'bold', textAlign: 'center' }}>
                {service.price}
              </Typography>

              <Box
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: '10px',
                }}
              >
                <CardGiftcardIcon style={{ color: '#55a4a3', marginRight: '5px' }} />
                <Typography variant="body2" style={{ color: '#13017c', fontWeight: 'bold' }}>
                  {service.gain}
                </Typography>
              </Box>

              <Typography variant="body2" color="textSecondary" style={{ color: '#555', textAlign: 'left' }}>
                {service.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {selectedPack && (
        <Grid item xs={12} md={6} sx={{ mt: 3 }}>
          <Typography variant="h6" align="center">
            Vous avez sélectionné : {selectedPack}
          </Typography>
          <Typography variant="body1" align="center">
            {displayedPrice} par {period}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default MarketingSection;
