import React, { useState, useEffect } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Collapse, Box
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useAuth } from '../../contexts/AuthContext'; // Assurez-vous que le chemin est correct

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Utilise `useAuth` pour obtenir l'utilisateur connecté
  const [openAffiliations, setOpenAffiliations] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [countries, setCountries] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchCountry = async () => {
      if (user?.username) {
        try {
          const response = await fetch(`http://localhost/pricing_app/country_affiliate.php?username=${user.username}`);
          if (!response.ok) {
            throw new Error('Error fetching affiliate countries');
          }
          const data = await response.json();
          console.log('Données reçues:', data);

          if (data.message) {
            setCountries([]);
            setSnackbarMessage(data.message);
          } else {
            const uniqueCountries = [...new Set(data.map(item => item.country))];
            setCountries(uniqueCountries.map(country => ({ country })));
          }
        } catch (error) {
          setError(error.message);
          setSnackbarMessage('Failed to fetch countries. Please try again later.');
          setOpenSnackbar(true);
        } finally {
          setLoading(false);
        }
      } else {
        setSnackbarMessage("User not connected or missing username!");
        setOpenSnackbar(true);
      }
    };

    fetchCountry();
  }, [user?.username]);

  const handleAffiliationsClick = () => setOpenAffiliations(!openAffiliations);
  const handleCountryClick = () => setOpenCountry(!openCountry);
  const handleItemClick = (country) => {
    // Rediriger vers l'URL avec le format requis, incluant le username
    navigate(`/dashboard-ambassadors/affiliations/${country}/${user.username}/details`);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#f7f9fc' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
        <img src={logo} alt="Logo" style={{ width: '120px', marginBottom: '16px' }} />
      </Box>
      <List>
        <ListItem button onClick={() => navigate('/dashboard-ambassadors')}>
          <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{ color: 'primary', fontWeight: 'medium' }}
          />
        </ListItem>

        <Typography variant="caption" color="textSecondary" sx={{ marginLeft: '16px', marginTop: '8px' }}>
          System
        </Typography>

        <ListItem button onClick={handleAffiliationsClick}>
          <ListItemIcon><PeopleIcon sx={{ color: 'text.secondary' }} /></ListItemIcon>
          <ListItemText primary="Affiliations" primaryTypographyProps={{ fontWeight: 'light' }} />
          {openAffiliations ? <ExpandLessIcon sx={{ color: 'text.secondary' }} /> : <ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
        </ListItem>
        <Collapse in={openAffiliations} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button onClick={() => navigate('/dashboard-ambassadors/Generate-AffiliateLink')}>
              <ListItemText primary="Add New Affiliation" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/dashboard-ambassadors/AffiliateLinkList')}>
              <ListItemText primary="All Affiliations" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
            <ListItem button onClick={handleCountryClick} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
              <ListItemText primary="Affiliated Countries" primaryTypographyProps={{ fontSize: '0.875rem' }} />
              {openCountry ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={openCountry} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 8 }}>
                {countries.length > 0 ? (
                  countries.map((country, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleItemClick(country.country)} // Passer le pays pour construire l'URL
                      sx={{ '&:hover': { backgroundColor: '#66bebf' } }}
                    >
                      <ListItemText primary={country.country} primaryTypographyProps={{ fontSize: '0.875rem' }} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No countries" primaryTypographyProps={{ fontSize: '0.875rem', color: 'text.secondary' }} />
                  </ListItem>
                )}
              </List>
            </Collapse>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
