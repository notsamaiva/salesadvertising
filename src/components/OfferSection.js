import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion'; // Import framer-motion for animation
import section4Img from '../images/marketing-home.webp'; // Adjust the image path if necessary
import { Eye, Star, Settings, Headphones } from 'react-feather'; // Feather Icons

const useStyles = {
  root: {
    backgroundColor: '#e9f2ff',
    padding: '40px',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '30px',
    color: '#13017c',
    marginBottom: '20px',
  },
  serviceItemLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // Text on the left, icon on the right
    margin: '30px 0',
  },
  serviceItemRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // Text on the right, icon on the left
    margin: '30px 0',
  },
  serviceIcon: {
    color: '#13017c',
    width: '130px',
    height: '90px',
    marginLeft: '10px', // Space between icon and text (for left-side blocks)
    marginRight: '10px', // Space between icon and text (for right-side blocks)
  },
  serviceTextWrapper: {
    textAlign: 'right', // Right-aligned text for left-side elements
  },
  serviceTextWrapperLeft: {
    textAlign: 'left', // Left-aligned text for right-side elements
  },
  serviceText: {
    color: '#13017c',
    marginBottom: '5px', // Reduce space between title and text
  },
  serviceDescription: {
    marginBottom: '10px', // Reduce space under descriptive text
    fontSize: '16px',
  },
  image: {
    width: '100%',
    maxWidth: '2000px',
    height: 'auto',
    margin: '0 auto',
    marginTop: '50px',
  },
};

const OfferSection = () => {
  return (
    <Box sx={useStyles.root}>
      {/* Title */}
      <Typography variant="h1" sx={useStyles.title}>
        How Our Advertising Offers Advantages You
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Left Services (Text Aligned Right, Icon on the Right) */}
        <Grid item xs={12} md={3}>
          <Box sx={useStyles.serviceItemLeft}>
            <Box sx={useStyles.serviceTextWrapper}>
              <Typography variant="h6" sx={useStyles.serviceText}>
                Increased Visibility
              </Typography>
              <Typography variant="body2" sx={useStyles.serviceDescription}>
                Increased visibility among a highly qualified audience of travelers, explorers, and adventure enthusiasts.
              </Typography>
            </Box>
            <Eye style={useStyles.serviceIcon} strokeWidth="1" />
          </Box>

          <Box sx={useStyles.serviceItemLeft}>
            <Box sx={useStyles.serviceTextWrapper}>
              <Typography variant="h6" sx={useStyles.serviceText}>
                Stand Out from Competitors
              </Typography>
              <Typography variant="body2" sx={useStyles.serviceDescription}>
                Opportunity to strengthen your market position and stand out from your competitors thanks to a presence on an internationally renowned platform.
              </Typography>
            </Box>
            <Star style={useStyles.serviceIcon} strokeWidth="1" />
          </Box>
        </Grid>

        {/* Center Image with Animation */}
        <Grid item xs={12} md={3}>
          <motion.img
            src={section4Img}
            alt="Center Illustration"
            style={useStyles.image}
            whileHover={{ scale: 1.1 }} // Image will scale up on hover
            transition={{ duration: 0.5 }} // Animation duration
          />
        </Grid>

        {/* Right Services (Text Aligned Left, Icon on the Left) */}
        <Grid item xs={12} md={3}>
          <Box sx={useStyles.serviceItemRight}>
            <Settings style={useStyles.serviceIcon} strokeWidth="1" />
            <Box sx={useStyles.serviceTextWrapperLeft}>
              <Typography variant="h6" sx={useStyles.serviceText}>
                Flexible Campaign
              </Typography>
              <Typography variant="body2" sx={useStyles.serviceDescription}>
                Flexibility in managing your advertising campaign, with the ability to adjust your ads in real-time to optimize results.
              </Typography>
            </Box>
          </Box>

          <Box sx={useStyles.serviceItemRight}>
            <Headphones style={useStyles.serviceIcon} strokeWidth="1" />
            <Box sx={useStyles.serviceTextWrapperLeft}>
              <Typography variant="h6" sx={useStyles.serviceText}>
                Marketing Support
              </Typography>
              <Typography variant="body2" sx={useStyles.serviceDescription}>
                Dedicated support from our marketing team to advise and accompany you throughout your campaign.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Button */}
      <Grid container justifyContent="center">
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#13017c',
            color: '#ffffff',
            marginTop: '40px',
            border: '2px solid #13017c',
            borderRadius: '33px',
            textAlign: 'center',
            fontSize: '18px',
            padding: '15px 40px',
            '&:hover': {
              backgroundColor: '#66bebf',
              color: '#ffffff',
              border: '2px solid #66bebf',
            },
          }}
        >
          Enjoy the Benefits Now
        </Button>
      </Grid>
    </Box>
  );
};

export default OfferSection;
