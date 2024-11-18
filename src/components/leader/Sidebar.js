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
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  
  const [openReports, setOpenReports] = useState(false);
  const [openDataSources, setOpenDataSources] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openOffers, setOpenOffers] = useState(false);

  const handleReportsClick = () => setOpenReports(!openReports);
  const handleDataSourcesClick = () => setOpenDataSources(!openDataSources);
  const handleSettingsClick = () => setOpenSettings(!openSettings);
  const handleUsersClick = () => setOpenUsers(!openUsers);
  const handleOffersClick = () => setOpenOffers(!openOffers);

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
        <ListItem button onClick={() => navigate('/dashboard-admin')}>
          <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{ color: 'primary', fontWeight: 'medium' }}
          />
        </ListItem>
        
        <Typography variant="caption" color="textSecondary" sx={{ marginLeft: '16px', marginTop: '8px' }}>
          System
        </Typography>
        
        <ListItem button onClick={handleUsersClick}>
          <ListItemIcon><PeopleIcon sx={{ color: 'text.secondary' }} /></ListItemIcon>
          <ListItemText primary="Users" primaryTypographyProps={{ fontWeight: 'light' }} />
          {openUsers ? <ExpandLessIcon sx={{ color: 'text.secondary' }} /> : <ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
        </ListItem>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button onClick={() => navigate('/dashboard-admin/users/add')}>
              <ListItemText primary="Add New User" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/dashboard-admin/users')}>
              <ListItemText primary="All Users" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleOffersClick}>
          <ListItemIcon><LocalOfferIcon sx={{ color: 'text.secondary' }} /></ListItemIcon>
          <ListItemText primary="Advertising Offers" primaryTypographyProps={{ fontWeight: 'light' }} />
          {openOffers ? <ExpandLessIcon sx={{ color: 'text.secondary' }} /> : <ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
        </ListItem>
        <Collapse in={openOffers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button onClick={() => navigate('/dashboard-admin/offers/add')}>
              <ListItemText primary="Add New Offer" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/dashboard-admin/offers')}>
              <ListItemText primary="All Offers" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
          </List>
        </Collapse>

        <Typography variant="caption" color="textSecondary" sx={{ marginLeft: '16px', marginTop: '8px' }}>
          Analysis
        </Typography>
        <ListItem button onClick={handleReportsClick}>
          <ListItemIcon><AssessmentIcon sx={{ color: 'text.secondary' }} /></ListItemIcon>
          <ListItemText primary="Reports" primaryTypographyProps={{ fontWeight: 'light' }} />
          {openReports ? <ExpandLessIcon sx={{ color: 'text.secondary' }} /> : <ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
        </ListItem>
        <Collapse in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button onClick={() => navigate('/reports/report1')}>
              <ListItemText primary="Report 1" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/reports/report2')}>
              <ListItemText primary="Report 2" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
          </List>
        </Collapse>

        <Typography variant="caption" color="textSecondary" sx={{ marginLeft: '16px', marginTop: '8px' }}>
          Setup
        </Typography>
        <ListItem button onClick={handleDataSourcesClick}>
          <ListItemIcon><ExtensionIcon sx={{ color: 'text.secondary' }} /></ListItemIcon>
          <ListItemText primary="Data Sources" primaryTypographyProps={{ fontWeight: 'light' }} />
          {openDataSources ? <ExpandLessIcon sx={{ color: 'text.secondary' }} /> : <ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
        </ListItem>
        <Collapse in={openDataSources} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button onClick={() => navigate('/data-sources/source1')}>
              <ListItemText primary="Source 1" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/data-sources/source2')}>
              <ListItemText primary="Source 2" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleSettingsClick}>
          <ListItemIcon><SettingsIcon sx={{ color: 'text.secondary' }} /></ListItemIcon>
          <ListItemText primary="Settings" primaryTypographyProps={{ fontWeight: 'light' }} />
          {openSettings ? <ExpandLessIcon sx={{ color: 'text.secondary' }} /> : <ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
        </ListItem>
        <Collapse in={openSettings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button onClick={() => navigate('/settings/setting1')}>
              <ListItemText primary="Setting 1" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/settings/setting2')}>
              <ListItemText primary="Setting 2" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItem>
          </List>
        </Collapse>

      </List>
    </Drawer>
  );
};

export default Sidebar;
