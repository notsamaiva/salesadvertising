// src/components/AddUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';

const AddUser = ({ onUserAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    date_adhesion: '', // Ajout du champ date_adhesion
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Invalid email format.');
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    // Validate required fields
    if (!formData.role || !formData.first_name || !formData.last_name || !formData.username || !formData.email || !formData.password || !formData.date_adhesion) {
      alert('Please fill all fields.');
      return;
    }

    // Prepare data to send
    const dataToSend = {
      role: formData.role.trim(),
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
      date_adhesion: formData.date_adhesion, // Inclure la date d'adhésion
    };

    console.log('Data to send:', dataToSend);

    // Send data to the server
    try {
      const response = await fetch('http://localhost/pricing_app/add_users.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          onUserAdded();
          navigate('/dashboard-admin/users');
        } else {
          alert(result.error);
        }
      } else {
        alert('Failed to add user.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Server connection error.');
    }
  };

  return (
    <Grid 
      container 
      component="main" 
      sx={{ 
        height: '100vh', 
        fontFamily: 'Poppins, sans-serif', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}
    >
      <Grid item xs={11} sm={8} md={5} component={Paper} elevation={6} square sx={{ padding: 3, backgroundColor: '#ffffff' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" component="h1" sx={{ mb: 3, color: '#13017c' }}>
            Ajouter un utilisateur
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Button
                onClick={() => setFormData({ ...formData, role: 'Admin' })}
                variant="contained"
                sx={{
                  bgcolor: formData.role === 'Admin' ? '#13017c' : '#e0e0e0',
                  color: formData.role === 'Admin' ? '#ffffff' : '#000000',
                  borderRadius: '32px',
                  width: '150px',
                  mx: 1,
                  height: '48px',
                  '&:hover': { bgcolor: '#333333' },
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Admin
              </Button>
              <Button
                onClick={() => setFormData({ ...formData, role: 'Ambassador' })}
                variant="contained"
                sx={{
                  bgcolor: formData.role === 'Ambassador' ? '#13017c' : '#e0e0e0',
                  color: formData.role === 'Ambassador' ? '#ffffff' : '#000000',
                  borderRadius: '32px',
                  width: '150px',
                  mx: 1,
                  height: '48px',
                  '&:hover': { bgcolor: '#333333' },
                }}
              >
                Ambassador
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ width: '48%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="first_name"
                  placeholder="Nom"
                  name="first_name"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Box>
              <Box sx={{ width: '48%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="last_name"
                  placeholder="Prénom"
                  name="last_name"
                  autoComplete="given-name"
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              placeholder="Nom d'utilisateur"
              name="username"
              autoComplete="username"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Mot de passe"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handleChange}
            />
            {/* Nouveau champ pour la date d'adhésion */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="date_adhesion"
              type="date"
              label="Date d'adhésion"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                mt: 3,
                mb: 2,
                bgcolor: '#13017c',
                color: '#ffffff',
                borderRadius: '32px',
                '&:hover': { bgcolor: '#66bebf' },
              }}
            >
              Ajouter l'utilisateur
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddUser;
