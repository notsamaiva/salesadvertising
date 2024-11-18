import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Avatar, Box, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Assurez-vous que le chemin d'importation est correct

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth(); // Récupérer les données utilisateur depuis le contexte
  const [activeItem, setActiveItem] = useState(null);

  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    if (user?.id) {
      console.log("Navigating to profile:", user.id);
      navigate(`/dashboard-admin/profil/${user.id}`);
    } else {
      console.warn('User ID is missing.');
    }
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear(); // Déconnexion : vider le local storage
    navigate('/login'); // Rediriger vers la page de connexion
  };
  const getItemColor = (item) => (activeItem === item ? 'white' : 'black');
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
            <Avatar alt="User Avatar" src={user?.avatar} sx={{ width: 32, height: 32, marginRight: 1 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              
            <Typography variant="body2" sx={{ color: '#13017c' }}>
            <strong>   {user?.role || 'Ambassador'}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#13017c' }}>
                {user?.username || 'Nom d\'utilisateur inconnu'}
              </Typography>
             
            </Box>
            <ArrowDropDownIcon />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleProfileClick}>
              <Typography variant="body2" sx={{ color: '#13017c' }}>Profil</Typography>
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Typography variant="body2" sx={{ color: '#13017c' }}>Thème</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography variant="body2" sx={{ color: '#13017c' }}>Déconnexion</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
