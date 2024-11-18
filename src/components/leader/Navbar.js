import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Avatar, Box, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Récupérer les données utilisateur lors du montage du composant
  useEffect(() => {
    const storedUserData = {
  
      email: localStorage.getItem('userEmail'),
      role: localStorage.getItem('userRole'),
    };
    console.log('Données utilisateur récupérées:', storedUserData); // Log des données récupérées
    if (storedUserData.email && storedUserData.role) {
      setUserData(storedUserData);
    } else {
      console.warn('User data missing from localStorage.');
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (redirectTo = null) => {
    setAnchorEl(null);
    if (redirectTo) {
      navigate(redirectTo, { state: { userData } }); // Envoie les données de l'utilisateur vers la page de profil
    }
  };

  return (
    <AppBar position="fixed" sx={{ width: 'calc(100% - 240px)', backgroundColor: '#ffffff', color: '#13017c' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#13017c' }}>
          Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" sx={{ marginRight: 2 }}>
            <Badge badgeContent={3} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: '#f1f3f5',
              padding: '4px 12px',
              borderRadius: '20px',
              '&:hover': { backgroundColor: '#e0e3e7' },
            }}
            onClick={handleMenuOpen}
          >
            <Avatar alt="User Avatar" src={userData?.avatar} sx={{ width: 32, height: 32, marginRight: 1 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
             
              <Typography variant="body2" sx={{ color: '#13017c' }}>
                {userData?.role || 'Rôle inconnu'}
              </Typography>
            </Box>
            <ArrowDropDownIcon />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => handleMenuClose('/dashboard-admin/profil')}>Profil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Thème</MenuItem>
            <MenuItem onClick={handleMenuClose}>Déconnexion</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
