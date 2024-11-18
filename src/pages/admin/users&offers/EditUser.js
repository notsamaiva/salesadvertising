import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';

const EditUser = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const [formData, setFormData] = useState({
    role: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User ID:', userId); // Log the user ID
    
    const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost/pricing_app/get_user.php?id=${userId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const user = await response.json();
          if (user.error) {
            setError(user.error);
          } else {
            setFormData(user);
          }
        } catch (err) {
          setError(`Error fetching user: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };

    fetchUser();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare data to send
    const dataToSend = {
      id: userId,
      role: formData.role.trim(),
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
    };

    // Send data to the server
    try {
      const response = await fetch('http://localhost/pricing_app/update_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success') {
          navigate('/dashboard-admin/users'); // Redirect after successful update
        } else {
          alert(result.message);
        }
      } else {
        alert('Server connection error.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Server connection error.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

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
      <Grid item xs={11} sm={8} md={5} component={Paper} elevation={6} square sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
            Modifier l'utilisateur
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="role"
              placeholder="Rôle"
              name="role"
              value={formData.role}
              autoComplete="off"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              placeholder="Nom"
              name="first_name"
              value={formData.first_name}
              autoComplete="family-name"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              placeholder="Prénom"
              name="last_name"
              value={formData.last_name}
              autoComplete="given-name"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              placeholder="Nom d'utilisateur"
              name="username"
              value={formData.username}
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
              value={formData.email}
              autoComplete="email"
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
             bgcolor: '#66bebf',
                borderRadius: '32px',
                '&:hover': { bgcolor: '#66bebf' },
              }}
            >
              Enregistrer les modifications
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditUser;
