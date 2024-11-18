import { Box, Typography, Grid } from '@mui/material';
import DashboardMetrics from './DashboardMetrics';
import SalesChart from './SalesChart';
import CommissionChart from './CommissionChart';
import { useAuth } from '../../contexts/AuthContext';
import React from 'react';

function Content() {
  const { user } = useAuth(); // Utiliser le contexte d'authentification

  return (
    <Box 
      sx={{ 
        backgroundColor: '#f5f5f5', 
        minHeight: '100vh', 
        padding: 4 
      }}
    >
      {/* En-tête de bienvenue */}
      <Box sx={{ marginBottom: 4 }}>
        {user ? (
          <Typography variant="h4" sx={{ color: '#13017c', fontWeight: 'bold' }}>
            Welcome, Ambassador {user.username || 'Utilisateur'}!
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ color: '#ff0500' }}>
            No user data found. Please log in.
          </Typography>
        )}
      </Box>

      {/* Transmettre le username à DashboardMetrics */}
      <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <DashboardMetrics username={user?.username || 'Utilisateur'} />
      </Grid>
      </Grid>
      {/* Graphiques de ventes et commissions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Box 
            sx={{ 
              backgroundColor: 'white', 
              padding: 3, 
              borderRadius: 2, 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: 2, color: '#13017c' }}>
              Sessions, Clicks & Sales
            </Typography>
            <SalesChart />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          
        </Grid>
      </Grid>
    </Box>
  );
}

export default Content;
