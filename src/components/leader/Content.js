import { Box, Typography, Grid } from '@mui/material';
import DashboardMetrics from './DashboardMetrics';
import SalesChart from './SalesChart';
import CommissionChart from './CommissionChart';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Content() {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = {
      first_name: localStorage.getItem('userFirstName'),
      last_name: localStorage.getItem('userLastName'),
      email: localStorage.getItem('userEmail'),
      role: localStorage.getItem('userRole'),
    };
    console.log('Retrieved userData from storage:', storedUserData);

    if (storedUserData.email && storedUserData.role) {
      setUserData(storedUserData);
    } else {
      console.warn('User data missing from localStorage.');
    }
  }, []);

  return (
    <Box 
      sx={{ 
        backgroundColor: '#f5f5f5', 
        minHeight: '100vh', 
        padding: 4 
      }}
    >
      
      <div>
        {userData ? (
          <div>
            <h2>Bienvenue, {userData.first_name || userData.email || 'Utilisateur'}!</h2>
            <p>Rôle: {userData.role}</p>
          </div>
        ) : (
          <p>Aucune donnée utilisateur trouvée. Veuillez vous connecter.</p>
        )}
      </div>

      {/* Metrics cards and charts */}
      <Grid container spacing={2} mb={4}>
        <DashboardMetrics />
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}>
            <Typography variant="h5">Sessions, Clicks & Sales</Typography>
            <SalesChart />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}>
            <Typography variant="h5">Commission by Status</Typography>
            <CommissionChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Content;
