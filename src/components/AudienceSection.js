import React from 'react';
import { Grid, Typography, Box, List, ListItem, ListItemIcon } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import marketingImage from '../images/marketing.webp'; // Nouvelle image

const AudienceSection = () => {
  return (
    <Box 
      sx={{ 
        padding: { xs: '20px', md: '40px' }, 
        marginTop: '40px', 
        position: 'relative', 
        overflow: 'hidden',
        background: '#f9f9f9', // Light background for contrast
        borderRadius: '20px', // Slightly rounded corners for the whole section
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
      }}
    >
      {/* Curved background section */}
      <Box 
        sx={{
          position: 'absolute',
          top: -50,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(135deg, #ff8a73 40%, #58468c 100%)',
          borderRadius: '50%', // Create a curve at the top
          zIndex: -1,
        }}
      />

      <Typography 
        variant="h2" 
        align="center" 
        sx={{ 
          marginBottom: '30px', 
          fontFamily: 'Poppins, sans-serif', 
          lineHeight: '1.2', 
          color: '#13017c ', // Darker color for contrast
      
        }}
      >
        FlyPool Audience
      </Typography>

      <Grid container spacing={4} sx={{ marginTop: '30px' }}>
        {/* Colonne pour le texte */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              marginBottom: '20px', 
              color: '#66bebf', 
              fontFamily: 'Poppins, sans-serif', 
              lineHeight: '1.4', 
              
            }}
          >
            FlyPool is used by people who travel to and from airports, including but not limited to:
          </Typography>
          
          <List sx={{ padding: 0, margin: 0 }}>
            <ListItem sx={{ padding: '10px 0' }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#66bebf' }} />
              </ListItemIcon>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.6', color: '#333' }}>
                Business and leisure travelers
              </Typography>
            </ListItem>
            <ListItem sx={{ padding: '10px 0' }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#66bebf' }} />
              </ListItemIcon>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.6', color: '#333' }}>
                People picking up/dropping off their relatives & friends
              </Typography>
            </ListItem>
            <ListItem sx={{ padding: '10px 0' }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#66bebf' }} />
              </ListItemIcon>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.6', color: '#333' }}>
                Airlines staff
              </Typography>
            </ListItem>
            <ListItem sx={{ padding: '10px 0' }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#66bebf' }} />
              </ListItemIcon>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.6', color: '#333' }}>
                Airport staff
              </Typography>
            </ListItem>
          </List>
        </Grid>

        {/* Colonne pour l'image unique */}
        <Grid 
          item xs={12} md={6} 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <img 
            src={marketingImage} 
            alt="Marketing" 
            style={{ 
              width: '100%', 
              maxWidth: '800px', 
              borderRadius: '20px', 
              objectFit: 'cover', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Soft shadow
              transition: 'transform 0.3s ease',
            }} 
            className="image-hover"
          />
        </Grid>
      </Grid>

      {/* CSS for hover effect */}
      <style jsx>{`
        .image-hover:hover {
          transform: scale(1.05); // Slightly enlarge image on hover
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); // Increase shadow on hover
        }
      `}</style>
    </Box>
  );
};

export default AudienceSection;
