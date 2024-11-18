import React from 'react';
import { Grid, Typography, Box, Card, CardMedia, CardContent } from '@mui/material';
import Image6 from '../images/Image6.png'; // Chemin à ajuster selon la structure
import Image7 from '../images/Image7.png';
import Image8 from '../images/Image8.png';

const useStyles = {
  root: {
    padding: '60px 20px', // Ajuste le padding pour différentes tailles d'écran
    textAlign: 'center',
    backgroundColor: '#f9fafc',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: '32px',
    color: '#58468c',
    marginBottom: '40px',
    fontFamily: 'Poppins, sans-serif',
  },
  card: {
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    overflow: 'hidden', // Coins arrondis fonctionnent mieux
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-10px)', // Effet de levée au survol
      boxShadow: '0px 16px 30px rgba(0, 0, 0, 0.15)',
    },
  },
  cardImage: {
    height: '180px', // Réduction de la hauteur
    width: '100%', // S'assure que l'image prend toute la largeur de la carte
    objectFit: 'contain', // Garde les proportions d'origine de l'image sans la couper
    transition: 'opacity 0.3s ease-in-out',
    '&:hover': {
      opacity: 0.9, // Légère réduction de l'opacité au survol
    },
  },
  
  cardContent: {
    textAlign: 'center',
    padding: '15px',
  },
  cardTitle: {
    fontSize: '18px',
    
    color: '#000000',
    marginTop: '10px',
    fontFamily: 'Poppins, sans-serif',
  },
};

const MobileInterfaceSection = () => {
  return (
    <Box sx={useStyles.root}>
      {/* Grand titre avant les images */}
      <Typography variant="h4" sx={useStyles.sectionTitle}>
      Available ad formats on FlyPool app (iOS; Android)
      </Typography>

      {/* Grille pour afficher les 3 images */}
      <Grid container spacing={4} justifyContent="center">
        {/* Image 6 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={useStyles.card}>
            <CardMedia
              component="img"
              image={Image6}
              alt="Mobile Interface 6"
              sx={useStyles.cardImage}
            />
            <CardContent sx={useStyles.cardContent}>
              <Typography variant="h6" sx={useStyles.cardTitle}>
              Collapsible adaptive banner

              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Image 7 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={useStyles.card}>
            <CardMedia
              component="img"
              image={Image7}
              alt="Mobile Interface 7"
              sx={useStyles.cardImage}
            />
            <CardContent sx={useStyles.cardContent}>
              <Typography variant="h6" sx={useStyles.cardTitle}>
              Anchor adaptive banner
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Image 8 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={useStyles.card}>
            <CardMedia
              component="img"
              image={Image8}
              alt="Mobile Interface 8"
              sx={useStyles.cardImage}
            />
            <CardContent sx={useStyles.cardContent}>
              <Typography variant="h6" sx={useStyles.cardTitle}>
              Interstitial (fullscreen) banner
              </Typography>
            </CardContent>
            
          </Card>
          
        </Grid>
        
      </Grid>
      <Typography variant="h6" sx={useStyles.cardTitle}>
      Also available: Native ad banners, designed to promote your mobile app and drive installs; App Open 
banners (75% of the initial app screen)


              </Typography>
    </Box>
  );
};

export default MobileInterfaceSection;
