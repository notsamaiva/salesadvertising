import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const CompleteProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state || {};

  const [profileData, setProfileData] = useState({
    username: userData?.username || '',
    email: userData?.email || '',
    role: userData?.role || '',
    adresse: '',
    phoneNumber: '',
    birthDate: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };
  const handleSaveProfile = async () => {
    try {
      const response = await fetch("http://localhost/pricing_app/update-profile.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userData.id,  // ID de l'utilisateur connecté
          adresse: profileData.adresse,
          phoneNumber: profileData.phoneNumber,
          birthDate: profileData.birthDate,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log("Profile updated:", result.message);
        navigate("/dashboard-admin/profil", { state: { userData: profileData } });
      } else {
        console.error("Error updating profile:", result.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Compléter Profil
      </Typography>
      <TextField
        label="Nom d'utilisateur"
        name="username"
        value={profileData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={profileData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Rôle"
        name="role"
        value={profileData.role}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Adresse"
        name="adresse"
        value={profileData.adresse}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Numéro de téléphone"
        name="phoneNumber"
        value={profileData.phoneNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date de naissance"
        name="birthDate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={profileData.birthDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSaveProfile} sx={{ mt: 2 }}>
        Sauvegarder
      </Button>
    </Box>
  );
};

export default CompleteProfile;
