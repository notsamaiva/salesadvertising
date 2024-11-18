import React from 'react';
import { Grid, Typography, Box, List, ListItem } from '@mui/material';
import advertisingImage from '../images/advertising.png'; // Assurez-vous que le chemin de l'image est correct

const NextStepsSection = () => {
  const steps = [
    'Pick a format and bid type and book the inventory with your sales manager. Share your ad creative with us (through your sales manager), please follow our guidelines for ad creatives.',
    'Share your ad creative with us (through your sales manager), please follow our guidelines for ad creatives.',
    'Your sales manager will give you instructions on how to pay for the advertisement.',
    'Expect your ad to be live within 5 working days.',
  ];

  return (
    <Box 
      sx={{ 
        padding: { xs: '20px', md: '40px' }, 
        marginTop: '40px', 
        position: 'relative', 
        overflow: 'hidden',
        background: '#f9f9f9', // Fond léger pour contraste
        borderRadius: '20px', // Coins légèrement arrondis
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Ombre douce
      }}
    >
      {/* Section de fond courbé */}
      <Box 
        sx={{
          position: 'absolute',
          top: -50,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(135deg, #ff8a73 40%, #58468c 100%)',
          borderRadius: '50%', // Créer une courbe en haut
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
          color: '#58468c', // Couleur sombre pour contraste
        }}
      >
        Next Steps
      </Typography>

      <Grid container spacing={4} sx={{ marginTop: '30px' }}>
        {/* Bloc 1 : Texte à gauche, Image à droite */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              marginBottom: '20px', 
              color: '#13017c', 
              fontFamily: 'Poppins, sans-serif', 
              lineHeight: '1.4',
            }}
          >
            Here are the next steps to follow:
          </Typography>
          
          <List sx={{ padding: 0, margin: 0 }}>
            <ListItem sx={{ padding: '10px 0', display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: '100px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: '#55a4a3', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  marginRight: '10px' 
                }}
              >
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 'bold' }}>
                  1
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.6', color: '#333' }}>
                {steps[0]}
              </Typography>
            </ListItem>
          </List>
        </Grid>

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
            src={advertisingImage} 
            alt="Advertising" 
            style={{ 
              width: '100%', 
              maxWidth: '600px', // Limite la taille de l'image
              borderRadius: '20px', 
              objectFit: 'cover', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Ombre douce
              transition: 'transform 0.3s ease',
            }} 
            className="image-hover"
          />
        </Grid>

        {/* Bloc 2 : Image à gauche, Texte à droite */}
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
            src={advertisingImage} 
            alt="Advertising" 
            style={{ 
              width: '100%', 
              maxWidth: '600px', 
              borderRadius: '20px', 
              objectFit: 'cover', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', 
              transition: 'transform 0.3s ease',
            }} 
            className="image-hover"
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              marginBottom: '20px', 
              color: '#13017c', 
              fontFamily: 'Poppins, sans-serif', 
              lineHeight: '1.4',
            }}
          >
            Next Steps:
          </Typography>
          
          <List sx={{ padding: 0, margin: 0 }}>
            <ListItem sx={{ padding: '10px 0', display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: '60px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: '#55a4a3', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  marginRight: '10px' 
                }}
              >
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 'bold' }}>
                  2
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.6', color: '#333' }}>
                {steps[1]}
              </Typography>
            </ListItem>
          </List>
        </Grid>

        {/* Bloc 3 : Texte à gauche, Image à droite */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              marginBottom: '20px', 
              color: '#13017c', 
              fontFamily: 'Poppins, sans-serif', 
              lineHeight: '1.4',
            }}
          >
            Next Steps:
          </Typography>
          
          <List sx={{ padding: 0, margin: 0 }}>
            <ListItem sx={{ padding: '10px 0', display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: '50px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: '#55a4a3', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  marginRight: '10px' 
                }}
              >
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 'bold' }}>
                  3
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.6', color: '#333' }}>
                {steps[2]}
              </Typography>
            </ListItem>
          </List>
        </Grid>

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
            src={advertisingImage} 
            alt="Advertising" 
            style={{ 
              width: '100%', 
              maxWidth: '600px', 
              borderRadius: '20px', 
              objectFit: 'cover', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', 
              transition: 'transform 0.3s ease',
            }} 
            className="image-hover"
          />
        </Grid>

        {/* Bloc 4 : Image à gauche, Texte à droite */}
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
            src={advertisingImage} 
            alt="Advertising" 
            style={{ 
              width: '100%', 
              maxWidth: '600px', 
              borderRadius: '20px', 
              objectFit: 'cover', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', 
              transition: 'transform 0.3s ease',
            }} 
            className="image-hover"
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              marginBottom: '20px', 
              color: '#13017c', 
              fontFamily: 'Poppins, sans-serif', 
              lineHeight: '1.4',
            }}
          >
            Next Steps:
          </Typography>
          
          <List sx={{ padding: 0, margin: 0 }}>
            <ListItem sx={{ padding: '10px 0', display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: '#55a4a3', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  marginRight: '10px' 
                }}
              >
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 'bold' }}>
                  4
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.6', color: '#333' }}>
                {steps[3]}
              </Typography>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NextStepsSection;
