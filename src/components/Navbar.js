import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../images/logo.png'; // Ensure the path is correct

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('http://localhost/pricing_app/getUserInfo.php', { withCredentials: true });
        if (response.data.user_id) {
          setUser(response.data); // Set user data if found
          setError(null); // Clear any previous error
        } else {
          setUser(null); // No user found
          setError("User not found.");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        setError("An error occurred while fetching user data."); // Set error message
      }
    };

    getUserData();
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Explore our price list', path: '/price-list' },
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: { xs: '10px 0', md: '20px 40px' }}}
      >
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="logo" style={{ width: 'auto', height: '50px' }} />
          </Box>

          {/* Hamburger Menu for small screens */}
          <IconButton onClick={toggleDrawer(true)} sx={{ display: { xs: 'block', md: 'none' }, color: '#13017c' }}>
            <MenuIcon fontSize="large" />
          </IconButton>

          {/* Links for large screens */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              justifyContent: 'center', 
              flexGrow: 1, 
              gap: '45px', 
              alignItems: 'center' 
            }}
          >
            {menuItems.map((item) => (
              <Link 
                key={item.text} 
                to={item.path} 
                style={{ textDecoration: 'none', color: '#58468c' }}
              >
                <Typography 
                  variant="button" 
                  sx={{
                    fontSize: '18px', 
                    textTransform: 'none', 
                    color: '#13017c ',
                    '&:hover': {
                      color: '#66bebf',
                    }
                  }}
                >
                  {item.text}
                </Typography>
              </Link>
            ))}
          </Box>

          {/* Button Group */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '10px' }}>
            <Link to="/country" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#13017c ',
                  color: '#ffffff',
                  borderRadius: '33px',
                  fontSize: '18px',
                  padding: '12px 30px',
                  '&:hover': {
                    backgroundColor: '#66bebf',
                    borderColor: '#66bebf',
                  },
                }}
              >
                Get Started Now
              </Button>
            </Link>

            {/* Sign In Button */}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#13017c',
                  color: '#13017c ',
                  borderRadius: '33px',
                  fontSize: '18px',
                  padding: '12px 30px',
                  '&:hover': {
                    backgroundColor: '#13017c ',
                    color: '#ffffff',
                  },
                }}
              >
                Sign In
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Error Message Display */}
      {error && (
        <Box sx={{ color: 'red', textAlign: 'center', marginTop: '60px' }}>
          <Typography variant="body1">{error}</Typography>
        </Box>
      )}

      {/* Drawer for small screens */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, paddingTop: '10px' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Close Icon */}
          <IconButton onClick={toggleDrawer(false)} sx={{ color: 'black' }}>
            <CloseIcon />
          </IconButton>

          {/* Menu Items */}
          <List sx={{ marginTop: '10px' }}>
            {menuItems.map((item) => (
              <ListItem button key={item.text}>
                <Link to={item.path} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', width: '100%' }}>
                  <ListItemText primary={item.text} sx={{ textTransform: 'none' }} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
