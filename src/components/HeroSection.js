import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import heroImage from '../images/imfg.png';  // Image principale du hero
import back1 from '../images/back2.png'; // Image de fond
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Créer un thème pour utiliser la police Poppins
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const HeroSection = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${back1})`, // Add overlay
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: { xs: '70vh', sm: '80vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: '20px', md: '40px' },
          color: 'black',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Texte dans une grille */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              sx={{
                marginBottom: '20px',
                fontSize: { xs: '1.7rem', md: '2.5rem' },
                color: '#13017c', // Updated color for the main heading
                fontWeight: 'bold',
              }}
            >
              Reach your target consumers through our app
            </Typography>
            <Typography
              variant="h3"
              sx={{
                marginBottom: '20px',
                fontSize: { xs: '1.2rem', md: '2rem' },
                color: '#66bebf', // Highlight color
              }}
            >
              Launching Q1’2024
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#13017c',
                color: '#ffffff',
                marginTop: '40px',
                padding: '10px 30px',
                borderRadius: '30px',
                border: '2px solid #13017c',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#66bebf', // Hover color effect
                  color: '#ffffff',
                  border: '2px solid #66bebf',
                },
              }}
            >
              Explore Price
            </Button>
          </Grid>

          {/* Les deux images dans la même grille */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            {/* heroImage en bas avec animation */}
            <Box
              sx={{
                position: 'relative',
                width: { xs: '280px', sm: '400px', md: '550px' }, // Adjust width based on screen size
                height: 'auto',
                zIndex: 1,
                margin: '0 auto',
                borderRadius: '20px',
                overflow: 'hidden',
                animation: 'zoomIn 2s ease-out', // Apply zoom-in animation
                '@keyframes zoomIn': {
                  '0%': {
                    transform: 'scale(0.8)',  // Start smaller
                    opacity: 0,               // Start invisible
                  },
                  '100%': {
                    transform: 'scale(1)',    // End at normal size
                    opacity: 1,               // End fully visible
                  },
                },
              }}
            >
              <img src={heroImage} alt="hero" style={{ width: '100%', height: 'auto' }} />
            </Box>

            {/* miniHero superposé et légèrement dépassé */}
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: '-30px', sm: '-40px', md: '-50px' },
                left: '50%',
                transform: 'translateX(-50%)',
                width: { xs: '230px', sm: '430px', md: '430px' },
                height: 'auto',
                zIndex: 2,
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow effect for depth
                borderRadius: '20px',
                animation: 'slideUp 2s ease-out', // Apply slide-up animation
                '@keyframes slideUp': {
                  '0%': {
                    transform: 'translateY(50px)', // Start below
                    opacity: 0,                    // Start invisible
                  },
                  '100%': {
                    transform: 'translateY(0)',    // End in place
                    opacity: 1,                    // End fully visible
                  },
                },
              }}
            >
              {/* miniHero content */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default HeroSection;
