import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import emailjs from 'emailjs-com'; // Import EmailJS
import contactImage from '../images/contacter.PNG'; // Importer l'image

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    firstName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoyer l'email avec EmailJS
    emailjs.send('service_xvz9ice', 'template_i4i96ew', {
      from_name: formData.fullName,
      to_name: 'Notsa Maiva', // Remplacez par votre nom ou votre entreprise
      message: formData.message,
      reply_to: formData.email,
    }, 't0BrhLpCQlOSzn1eL')
    .then((response) => {
      console.log('Email envoyé avec succès:', response.status, response.text);
      // Réinitialiser le formulaire après l'envoi
      setFormData({
        fullName: '',
        firstName: '',
        email: '',
        message: ''
      });
    }, (err) => {
      console.error('Échec de l\'envoi de l\'email:', err);
    });
  };

  return (
    <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', marginTop: '20px' }}>
      {/* Section Image */}
      <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Box 
          component="img"
          sx={{
            width: '100%', // Ajustez la largeur de l'image si nécessaire
            maxWidth: '750px', // Limiter la largeur maximale de l'image
            height: 'auto',
            marginTop : '40px',
            marginRight: '20px', // Espacement à droite de l'image
          }}
          alt="Contact"
          src={contactImage}
        />
      </Grid>

      {/* Section Formulaire */}
      <Grid item xs={12} md={6}>
        <Box
          component="form"
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', // Aligner le contenu du formulaire à gauche
            backgroundColor: '#f9f9ff',
            borderRadius: '10px',
            width: '700px',
            marginTop : '70px',
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
            Contact Us
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="E-mail"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Message"
                variant="outlined"
                fullWidth
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              backgroundColor: '#66bebf',
              borderRadius: '30px',
              px: 4,
            }}
          >
            Send
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
