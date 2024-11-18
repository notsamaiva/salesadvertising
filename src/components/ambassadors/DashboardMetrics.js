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
import { useAuth } from '../../contexts/AuthContext';

function DashboardMetrics({ username }) {
  const { user } = useAuth();
  const [affiliateLinks, setAffiliateLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [adhesionDate, setAdhesionDate] = useState(null);

  // Calculer la commission en fonction de la date d'adhésion
  const calculateCommission = (totalAmount, adhesionDate) => {
    const today = new Date();
    const adhesion = new Date(adhesionDate);
    const monthsDifference = (today.getFullYear() - adhesion.getFullYear()) * 12 + (today.getMonth() - adhesion.getMonth());

    // Si la différence est inférieure ou égale à 3 mois, commission = 75%, sinon commission = 30%
    const commissionRate = monthsDifference <= 3 ? 0.75 : 0.30;
    return totalAmount * commissionRate;
  };

  // Récupération des liens d'affiliation
  useEffect(() => {
    const fetchAffiliateLinks = async () => {
      setLoading(true);  // Démarrer le chargement
      if (user?.username) {
        try {
          const response = await fetch(
            `http://localhost/pricing_app/sales_link.php?username=${user.username}`
          );
          const data = await response.json();
          console.log('Données récupérées:', data);

          if (data.message) {
            setAffiliateLinks([]);
            setSnackbarMessage(data.message);
          } else {
            setAffiliateLinks(data);  // Mise à jour des données
          }
        } catch (error) {
          setError(error.message);
          setSnackbarMessage('Failed to fetch affiliate links. Please try again later.');
          setOpenSnackbar(true);
        } finally {
          setLoading(false);  // Fin du chargement
        }
      } else {
        setSnackbarMessage('User not connected or missing username!');
        setOpenSnackbar(true);
        setLoading(false);  // Fin du chargement
      }
    };

    fetchAffiliateLinks();
  }, [user?.username]);

  const fetchAdhesionDate = async () => {
    try {
      const usernameFromContext = user?.username;
      if (!usernameFromContext) {
        console.error("Utilisateur non authentifié ou username manquant");
        setSnackbarMessage('Utilisateur non authentifié ou username manquant');
        setOpenSnackbar(true);
        return;
      }
  
      const response = await fetch('http://localhost/pricing_app/adhesion_users.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameFromContext }),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la date d'adhésion.");
      }
  
      const data = await response.json();
      console.log('Réponse de l\'API:', data);  // Ajout d'un log pour voir la réponse
  
      if (data.date_adhesion) {
        setAdhesionDate(data.date_adhesion);
      } else {
        throw new Error('Aucune date d\'adhésion trouvée.');
      }
    } catch (error) {
      console.error("Erreur API:", error);
      setSnackbarMessage("Échec de la récupération de la date d'adhésion.");
      setOpenSnackbar(true);
    }
  };
  
  useEffect(() => {
    if (user?.username) {
      fetchAdhesionDate();
    } else {
      setSnackbarMessage('Username manquant. Impossible de récupérer la date d\'adhésion.');
      setOpenSnackbar(true);
    }
  }, [user?.username]);  // Ajout de user?.username comme dépendance pour recharger la donnée quand il change
  
  useEffect(() => {
    fetchAdhesionDate();
  }, []); // Vous pouvez aussi ajouter user?.username ici si nécessaire pour déclencher le fetch lorsque l'utilisateur se connecte ou se déconnecte
 

  // Calcul des totaux pour sales_count et total_amount
  const totalSalesCount = affiliateLinks.reduce((acc, link) => acc + link.sales_count, 0);
  const totalAmount = affiliateLinks.reduce((acc, link) => acc + (parseFloat(link.total_amount) || 0), 0);

  // Calcul des commissions totales
  const totalCommissions = affiliateLinks.reduce((acc, link) => {
    return acc + calculateCommission(parseFloat(link.total_amount), adhesionDate);
  }, 0);

  // Définition des métriques avec les nouvelles sommes
  const metrics = [
    { title: 'Affiliations', value: affiliateLinks.length || 0 },
    { title: 'Clicks', value: 2605 }, // Nombre de clics
    { title: 'Sales', value: totalSalesCount || 0 }, // Total des ventes
    { title: 'Sale Amount', value: `${totalAmount.toLocaleString()}` }, // Total des montants des ventes
    { title: 'Commission', value: `${totalCommissions.toLocaleString()}` }, // Total des commissions
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <div>
        <Typography variant="h5" sx={{ color: '#13017c', marginBottom: 2 }}>
          Metrics for {username}
        </Typography>
        <Grid container spacing={2}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <MetricsCard title={metric.title} value={metric.value} />
            </Grid>
          ))}
        </Grid>
      </div>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" sx={{ color: '#13017c', fontWeight: 'bold' }}>
          Number of Links: {affiliateLinks.length}
        </Typography>
      </Box>

      {/* Afficher la date d'adhésion */}
      {loading ? (
        <CircularProgress sx={{ color: '#13017c', marginTop: 2 }} />
      ) : adhesionDate ? (
        <Typography variant="subtitle1" gutterBottom sx={{ color: '#13017c' }}>
          Date d'adhésion: {new Date(adhesionDate).toLocaleDateString()}
        </Typography>
      ) : (
        <Typography variant="subtitle1" gutterBottom sx={{ color: '#13017c' }}>
          Date d'adhésion non disponible.
        </Typography>
      )}

      <Typography variant="h4" gutterBottom sx={{ color: '#13017c' }}>
        Affiliate Links for {user?.username}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Generated Link</TableCell>
                <TableCell>Sales Count</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Commission</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {affiliateLinks.length > 0 ? (
                affiliateLinks.map((link, index) => {
                  const commission = calculateCommission(parseFloat(link.total_amount), adhesionDate);
                  return (
                    <TableRow key={index}>
                      <TableCell>{link.generated_link}</TableCell>
                      <TableCell>{link.sales_count}</TableCell>
                      <TableCell>{link.total_amount}</TableCell>
                      <TableCell>{commission.toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })
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
