import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Collapse, Box
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import ExtensionIcon from '@mui/icons-material/Extension';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state?.userInfo;

  const [openReports, setOpenReports] = useState(false);
  const [openDataSources, setOpenDataSources] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openOffers, setOpenOffers] = useState(false);
  const [openCountry, setOpenCountry] = useState(false); // State for Country submenu
  
  // State to track active item
  const [activeItem, setActiveItem] = useState('');

  const handleReportsClick = () => setOpenReports(!openReports);
  const handleDataSourcesClick = () => setOpenDataSources(!openDataSources);
  const handleSettingsClick = () => setOpenSettings(!openSettings);
  const handleUsersClick = () => setOpenUsers(!openUsers);
  const handleOffersClick = () => setOpenOffers(!openOffers);
  const handleCountryClick = () => setOpenCountry(!openCountry); // Toggle Country submenu

  // Function to handle item click
  const handleItemClick = (item) => {
    setActiveItem(item);
    navigate(item); // Adjust this if you want to navigate to specific paths
  };

  const getItemColor = (item) => (activeItem === item ? 'white' : 'black');

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        backgroundColor: 'transparent',
        [`& .MuiDrawer-paper`]: { 
          width: 240, 
          boxSizing: 'border-box', 
          backgroundColor: 'transparent', 
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
        <img src={logo} alt="Logo" style={{ width: '120px', marginBottom: '16px' }} />
      </Box>
      <List>
        <ListItem 
          button 
          onClick={() => handleItemClick('/dashboard-admin')} 
          sx={{ '&:hover': { backgroundColor: '#66bebf' } }}
        >
          <ListItemIcon sx={{ color: getItemColor('/dashboard-admin'), '&:hover': { color: 'white' } }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{ color: getItemColor('/dashboard-admin'), fontWeight: 'medium' }}
          />
        </ListItem>

        <Typography variant="caption" color="black" sx={{ marginLeft: '16px', marginTop: '8px' }}>
          System
        </Typography>

        <ListItem button onClick={handleUsersClick} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
          <ListItemIcon sx={{ color: getItemColor('users'), '&:hover': { color: 'white' } }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" primaryTypographyProps={{ color: getItemColor('users'), fontWeight: 'light' }} />
          {openUsers ? <ExpandLessIcon sx={{ color: getItemColor('users'), '&:hover': { color: 'white' } }} /> : <ExpandMoreIcon sx={{ color: getItemColor('users'), '&:hover': { color: 'white' } }} />}
        </ListItem>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button onClick={() => handleItemClick('/dashboard-admin/users/add')} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
              <ListItemText primary="Add New User" primaryTypographyProps={{ fontSize: '0.875rem', color: getItemColor('users') }} />
            </ListItem>
            <ListItem button onClick={() => handleItemClick('/dashboard-admin/users')} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
              <ListItemText primary="All Users" primaryTypographyProps={{ fontSize: '0.875rem', color: getItemColor('users') }} />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleOffersClick} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
          <ListItemIcon sx={{ color: getItemColor('offers'), '&:hover': { color: 'white' } }}>
            <LocalOfferIcon />
          </ListItemIcon>
          <ListItemText primary="Advertising Offers" primaryTypographyProps={{ color: getItemColor('offers'), fontWeight: 'light' }} />
          {openOffers ? <ExpandLessIcon sx={{ color: getItemColor('offers'), '&:hover': { color: 'white' } }} /> : <ExpandMoreIcon sx={{ color: getItemColor('offers'), '&:hover': { color: 'white' } }} />}
        </ListItem>
        <Collapse in={openOffers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button onClick={() => handleItemClick('/dashboard-admin/offers/add')} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
              <ListItemText primary="Add New Offer" primaryTypographyProps={{ fontSize: '0.875rem', color: getItemColor('offers') }} />
            </ListItem>
            <ListItem button onClick={() => handleItemClick('/dashboard-admin/offers')} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
              <ListItemText primary="All Offers" primaryTypographyProps={{ fontSize: '0.875rem', color: getItemColor('offers') }} />
            </ListItem>
          </List>
        </Collapse>

        <Typography variant="caption" color="black" sx={{ marginLeft: '16px', marginTop: '8px' }}>
          Analysis
        </Typography>
        <ListItem button onClick={handleReportsClick} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
          <ListItemIcon sx={{ color: getItemColor('reports'), '&:hover': { color: 'white' } }}>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reports affiliation" primaryTypographyProps={{ color: getItemColor('reports'), fontWeight: 'light' }} />
          {openReports ? <ExpandLessIcon sx={{ color: getItemColor('reports'), '&:hover': { color: 'white' } }} /> : <ExpandMoreIcon sx={{ color: getItemColor('reports'), '&:hover': { color: 'white' } }} />}
        </ListItem>
        <Collapse in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button onClick={() => handleItemClick('/dashboard-admin/AffiliateLinkList')} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
              <ListItemText primary="All Affiliations" primaryTypographyProps={{ fontSize: '0.875rem', color: getItemColor('reports') }} />
            </ListItem>
            <ListItem button onClick={handleCountryClick} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
              <ListItemText primary="affiliated countries" primaryTypographyProps={{ fontSize: '0.875rem', color: getItemColor('reports') }} />
              {openCountry ? <ExpandLessIcon sx={{ color: getItemColor('reports'), '&:hover': { color: 'white' } }} /> : <ExpandMoreIcon sx={{ color: getItemColor('reports'), '&:hover': { color: 'white' } }} />}
            </ListItem>
            <Collapse in={openCountry} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 8 }}>
                <ListItem button onClick={() => handleItemClick('/dashboard-admin/countries')} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
                  <ListItemText primary=" Country" primaryTypographyProps={{ fontSize: '0.875rem', color: getItemColor('reports') }} />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Collapse>

        <Typography variant="caption" color="black" sx={{ marginLeft: '16px', marginTop: '8px' }}>
          Settings
        </Typography>
        <ListItem button onClick={handleSettingsClick} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
          <ListItemIcon sx={{ color: getItemColor('settings'), '&:hover': { color: 'white' } }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" primaryTypographyProps={{ color: getItemColor('settings'), fontWeight: 'light' }} />
          {openSettings ? <ExpandLessIcon sx={{ color: getItemColor('settings'), '&:hover': { color: 'white' } }} /> : <ExpandMoreIcon sx={{ color: getItemColor('settings'), '&:hover': { color: 'white' } }} />}
        </ListItem>
        <Collapse in={openSettings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button onClick={() => handleItemClick('/dashboard-admin/settings')} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
              <ListItemText primary="General Settings" primaryTypographyProps={{ fontSize: '0.875rem', color: getItemColor('settings') }} />
            </ListItem>
            <ListItem button onClick={() => handleItemClick('/dashboard-admin/settings/affiliations')} sx={{ '&:hover': { backgroundColor: '#66bebf' } }}>
              <ListItemText primary="Affiliations Settings" primaryTypographyProps={{ fontSize: '0.875rem', color: getItemColor('settings') }} />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
