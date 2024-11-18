import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import section4Img from '../images/section4.png'; // Adjust this path as needed
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Section4 = () => {
  return (
    <Box sx={{ padding: '50px 0', textAlign: 'center' }}> {/* TextAlign added for centering */}
      <Grid container spacing={4} justifyContent="center"> {/* Center the content */}
        
        {/* Button at the top and centered */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#13017c',
              color: '#ffffff',
              margin: '0 auto 30px', // Centering and adding space below the button
              border: '2px solid #13017c', 
              borderRadius: '26px', 
              marginTop: '-50px',
              padding: '10px 25px',
              display: 'block', // Ensures button is treated as a block element
              '&:hover': {
                backgroundColor: '#66bebf',
                color: '#ffffff',
                border: '2px solid #66bebf', 
              },
            }}
          >
            explore our advertising offers
          </Button>
        </Grid>

        {/* Section Content */}
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <img src={section4Img} alt="Project Z Development" style={{ maxWidth: '100%', borderRadius: '15px' }} />
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: '10%', 
                  left: '10%', 
                  backgroundColor: '#66bebf', 
                  padding: '20px', 
                  borderRadius: '25px' 
                }}
              >
                <Typography variant="h6" sx={{ fontSize: '1.5rem', color: 'white' }}>
                  What's included
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: '600px', width: '100%', paddingLeft: { md: '20px' } }}> 
              <Typography variant="h3" sx={{ color: '#13017c', marginBottom: '15px' }}>
                Details and benefits of our offers
              </Typography>
              <Typography variant="body1" sx={{ color: '#0f172a', lineHeight: 1.8, marginBottom: '16px', textAlign: 'justify' }}>
                {/* Benefit List */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <CheckCircleIcon sx={{ color: '#66bebf', fontSize: '40px', marginRight: '12px' }} />
                  <span>
                    <strong>Strategic placement </strong> of your ads on the <strong>FlyStore</strong>, with maximum <strong>visibility</strong> to captivate our <strong>audience</strong>.
                  </span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <CheckCircleIcon sx={{ color: '#66bebf', fontSize: '40px', marginRight: '12px' }} />
                  <span>
                    Ability to showcase <strong>video advertisements</strong> alongside <strong>banner ads, sponsored ads, pop-ups,</strong> and other <strong>customized</strong> formats to match your marketing objectives.
                  </span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <CheckCircleIcon sx={{ color: '#66bebf', fontSize: '40px', marginRight: '12px' }} />
                  <span>
                    Utilization of <strong>advanced targeting tools</strong>, enabling precise reach to your desired audience based on demographic, geographic, and behavioral parameters.
                  </span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <CheckCircleIcon sx={{ color: '#66bebf', fontSize: '40px', marginRight: '12px' }} />
                  <span>
                    <strong>Personalization</strong> of your advertising message within video content, allowing you to highlight special offers, promotions, upcoming events, and other pertinent information, fostering deeper engagement with your audience.
                  </span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <CheckCircleIcon sx={{ color: '#66bebf', fontSize: '40px', marginRight: '12px' }} />
                  <span>
                    <strong>Comprehensive reporting </strong>on campaign performance, providing detailed insights into impressions, clicks, conversions, ROI, and video engagement metrics, empowering you to optimize your advertising strategies effectively.
                  </span>
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Section4;
