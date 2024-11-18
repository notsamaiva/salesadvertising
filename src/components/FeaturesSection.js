import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import image1 from '../images/Image1.png';
import image2 from '../images/Image2.png';
import image3 from '../images/Image3.png';
import image4 from '../images/Image4.png';

const FeaturesSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'white', 
        marginTop: '-20px', 
        padding: { xs: '50px 20px', md: '100px 50px' },
        color: 'black',
        animation: 'fadeIn 1.5s ease-in-out', // Animation d'apparition
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }}
    >
      {/* Grand Titre */}
      <Typography 
        variant="h2" 
        align="center" 
        sx={{ 
          fontFamily: 'Poppins, sans-serif', 
          marginBottom: '50px', 
          color: '#13017c ', 

          animation: 'slideDown 1.2s ease-out', // Animation pour le titre
          '@keyframes slideDown': {
            '0%': { transform: 'translateY(-50px)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
        }}
      >
        Working with <strong> <span style={{ color: '#66bebf' }}>FlyPool</span></strong>
      </Typography>

      <Grid container justifyContent="center" spacing={5}>
        
        {/* Premier Bloc */}
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box
            sx={{
              transition: 'transform 0.4s ease, box-shadow 0.4s ease', 
              '&:hover': {
                transform: 'scale(1.1) rotate(5deg)', // Agrandir et incliner au survol
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', // Ajouter une ombre
              },
              animation: 'fadeInUp 1.2s ease-in-out', // Animation pour apparaître en douceur
              '@keyframes fadeInUp': {
                '0%': { opacity: 0, transform: 'translateY(50px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <img src={image1} alt="Making Idea" style={{ width: '120px', height: '120px' }} />
            <Typography variant="h6" mt={2} sx={{ fontFamily: 'Poppins, sans-serif', color: '#13017c', fontWeight: 'bold' }}>
              Quick Turnaround Time
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Your ad will be live within 5 working days
            </Typography>
          </Box>
        </Grid>

        {/* Deuxième Bloc */}
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box
            sx={{
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              '&:hover': {
                transform: 'scale(1.1) rotate(5deg)', 
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              },
              animation: 'fadeInUp 1.4s ease-in-out',
            }}
          >
            <img src={image2} alt="Working Plan" style={{ width: '120px', height: '120px' }} />
            <Typography variant="h6" mt={2} sx={{ fontFamily: 'Poppins, sans-serif', color: '#13017c ', fontWeight: 'bold' }}>
              Detailed Reporting
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              You will get detailed reports on the ads performance
            </Typography>
          </Box>
        </Grid>

        {/* Troisième Bloc */}
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box
            sx={{
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              '&:hover': {
                transform: 'scale(1.1) rotate(5deg)', 
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              },
              animation: 'fadeInUp 1.6s ease-in-out',
            }}
          >
            <img src={image3} alt="SEO Research" style={{ width: '120px', height: '120px' }} />
            <Typography variant="h6" mt={2} sx={{ fontFamily: 'Poppins, sans-serif', color: '#13017c ', fontWeight: 'bold' }}>
              Targeted Advertising
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Your ad will be targeted to people near your business
            </Typography>
          </Box>
        </Grid>

        {/* Quatrième Bloc */}
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box
            sx={{
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              '&:hover': {
                transform: 'scale(1.1) rotate(5deg)', 
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              },
              animation: 'fadeInUp 1.8s ease-in-out',
            }}
          >
            <img src={image4} alt="New Feature" style={{ width: '120px', height: '120px' }} />
            <Typography variant="h6" mt={2} sx={{ fontFamily: 'Poppins, sans-serif', color: '#13017c', fontWeight: 'bold' }}>
              Flexibility
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              We accept various ad formats, including text, image, video, and HTML5 ads
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
