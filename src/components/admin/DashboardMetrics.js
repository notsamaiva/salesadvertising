import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
} from '@mui/material';
import MetricsCard from './MetricsCard';

function DashboardMetrics() {
  const [affiliateLinks, setAffiliateLinks] = useState([]);
  const [ambassadorCount, setAmbassadorCount] = useState(0); // Stockage du nombre d'ambassadeurs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Récupération des données des utilisateurs ayant le rôle "Ambassador"
  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        const response = await fetch(`http://localhost/pricing_app/get_users.php`);
        const users = await response.json();
        const ambassadors = users.filter((user) => user.role === 'Ambassador');
        setAmbassadorCount(ambassadors.length);
      } catch (error) {
        console.error('Erreur lors de la récupération des ambassadeurs:', error);
      }
    };

    fetchAmbassadors();
  }, []);

  // Récupération des données des liens d'affiliation
  useEffect(() => {
    const fetchAffiliateLinks = async () => {
      setLoading(true); // Démarrer le chargement
      try {
        const response = await fetch(`http://localhost/pricing_app/allsales.php`);
        const data = await response.json();
        if (data.error) {
          setAffiliateLinks([]);
          setSnackbarMessage(data.error);
        } else {
          setAffiliateLinks(data); // Mettre à jour les données
        }
      } catch (error) {
        setError(error.message);
        setSnackbarMessage('Failed to fetch affiliate links. Please try again later.');
        setOpenSnackbar(true);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchAffiliateLinks();
  }, []);

  // Calcul des totaux pour sales_count et total_amount
  const totalSalesCount = affiliateLinks.reduce((acc, link) => acc + parseInt(link.sales_count || 0), 0);
  const totalAmount = affiliateLinks.reduce((acc, link) => acc + (parseFloat(link.total_amount) || 0), 0);

  // Définition des métriques globales
  const metrics = [
    { title: 'Affiliations', value: affiliateLinks.length || 0 },
    { title: 'Sales', value: totalSalesCount || 0 },
    { title: 'Sale Amount', value: `${totalAmount.toLocaleString()}` },
    { title: 'Ambassadors', value: ambassadorCount || 0 }, // Nombre d'ambassadeurs
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <div>
        <Typography variant="h5" sx={{ color: '#13017c', marginBottom: 2 }}>
          Metrics for All Users
        </Typography>
        <Grid container spacing={2}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <MetricsCard title={metric.title} value={metric.value} />
            </Grid>
          ))}
        </Grid>
      </div>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" sx={{ color: '#13017c', fontWeight: 'bold' }}>
          Total Links: {affiliateLinks.length}
        </Typography>
      </Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#13017c' }}>
        Affiliate Links Overview
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Generated Link</TableCell>
                <TableCell>Sales Count</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {affiliateLinks.length > 0 ? (
                affiliateLinks.map((link, index) => (
                  <TableRow key={index}>
                    <TableCell>{link.username}</TableCell>
                    <TableCell>{link.generated_link}</TableCell>
                    <TableCell>{link.sales_count}</TableCell>
                    <TableCell>{link.total_amount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No affiliate links found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={error ? 'error' : 'info'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DashboardMetrics;
