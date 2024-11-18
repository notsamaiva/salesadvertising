import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  FormControl
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../../contexts/AuthContext';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const formatDate = (date) => date.toISOString().split('T')[0];

const calculateCommission = (adhesionDate, totalAmount) => {
  if (!adhesionDate || !totalAmount) return 0;

  const adhesionDateObj = new Date(adhesionDate);
  const currentDate = new Date();
  const monthsDifference = (currentDate.getFullYear() - adhesionDateObj.getFullYear()) * 12 + currentDate.getMonth() - adhesionDateObj.getMonth();
  
  const commissionRate = monthsDifference <= 3 ? 0.75 : 0.30;
  return totalAmount * commissionRate;
};

const AffiliateDetails = () => {
  const { user } = useAuth();
  const { username } = useParams();
  const [linkCount, setLinkCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [adhesionDate, setAdhesionDate] = useState(null);
  const [salesData, setSalesData] = useState([]);

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [startDateFormatted, setStartDateFormatted] = useState(formatDate(new Date()));
  const [endDateFormatted, setEndDateFormatted] = useState(formatDate(new Date()));

  // Gestion des périodes avant, pendant et après
  const dateDifference = Math.ceil((new Date(endDateFormatted) - new Date(startDateFormatted)) / (1000 * 60 * 60 * 24));
  const beforeStartDate = new Date(selectedStartDate);
  beforeStartDate.setDate(beforeStartDate.getDate() - dateDifference);
  const afterEndDate = new Date(selectedEndDate);
  afterEndDate.setDate(afterEndDate.getDate() + dateDifference);

  const beforeStartDateFormatted = formatDate(beforeStartDate);
  const afterEndDateFormatted = formatDate(afterEndDate);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setStartDateFormatted(formatDate(date));
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setEndDateFormatted(formatDate(date));
  };

  const fetchValuesFromAPI = async () => {
    try {
      const usernameFromContext = user?.username;
      if (!usernameFromContext) {
        console.error("Utilisateur non authentifié ou username manquant");
        return;
      }

      const response = await fetch(
        `http://localhost/pricing_app/get_allsales_for_week.php?username=${encodeURIComponent(usernameFromContext)}&start_date=${startDateFormatted}&end_date=${endDateFormatted}`
      );

      if (!response.ok) throw new Error("Erreur de réponse de l'API");

      const data = await response.json();

      if (data && data.link_count !== undefined && data.sales_count !== undefined && data.total_amount !== undefined) {
        setLinkCount(data.link_count);
        setSalesCount(data.sales_count);
        setTotalAmount(data.total_amount);

        // Mettre à jour les données pour les graphiques
        setSalesData([
          { name: `${beforeStartDateFormatted} to ${startDateFormatted}`, links: data.link_count / 2, sales: data.sales_count / 2, amount: data.total_amount / 2, commission: calculateCommission(adhesionDate, data.total_amount / 2) },
          { name: `${startDateFormatted} to ${endDateFormatted}`, links: data.link_count, sales: data.sales_count, amount: data.total_amount, commission: calculateCommission(adhesionDate, data.total_amount) },
          { name: `${endDateFormatted} to ${afterEndDateFormatted}`, links: data.link_count / 2, sales: data.sales_count / 2, amount: data.total_amount / 2, commission: calculateCommission(adhesionDate, data.total_amount / 2) },
        ]);
      } else {
        console.error("Données manquantes ou mal formées dans la réponse de l'API");
      }
    } catch (error) {
      console.error('Erreur de récupération des valeurs de l\'API :', error);
      setSnackbarMessage("Erreur lors de la récupération des données. Essayez encore.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValuesFromAPI();
  }, [startDateFormatted, endDateFormatted, username]);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

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
  }, [user?.username]);

  return (
    <Box sx={{ backgroundColor: '#F0F4F8', padding: 4, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#13017c' }}>
        Affiliate Details for {user?.username}
      </Typography>

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

      <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
        <FormControl>
          <Typography variant="body1">Date de début :</Typography>
          <Calendar onChange={handleStartDateChange} value={selectedStartDate} />
        </FormControl>
        <FormControl>
          <Typography variant="body1">Date de fin :</Typography>
          <Calendar onChange={handleEndDateChange} value={selectedEndDate} />
        </FormControl>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1">
          Date de début sélectionnée : {startDateFormatted}
        </Typography>
        <Typography variant="body1">
          Date de fin sélectionnée : {endDateFormatted}
        </Typography>
      </Box>

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#13017c' }}>
          Résumé des ventes et revenus
        </Typography>
        <Box sx={{ backgroundColor: '#66bfbe', padding: 2, borderRadius: 1, color: '#ffffff' }}>
          <Typography variant="body1">
            <strong>Nombre de liens :</strong> {linkCount}
          </Typography>
          <Typography variant="body1">
            <strong>Nombre de ventes :</strong> {salesCount}
          </Typography>
          <Typography variant="body1">
            <strong>Montant total :</strong> {totalAmount} €
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            <strong>Commission estimée :</strong> {calculateCommission(adhesionDate, totalAmount)} €
          </Typography>
        </Box>
      </Box>

      {/* Premier graphique pour liens et ventes */}
      <Box sx={{ marginTop: 3 }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="links" stroke="#65bfbd" />
            <Line type="monotone" dataKey="sales" stroke="#13017c" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Deuxième graphique pour Montant total et Commission */}
      <Box sx={{ marginTop: 3 }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#f41214" />
            <Line type="monotone" dataKey="commission" stroke="#004ba5" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Snackbar pour les messages d'erreur */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default AffiliateDetails;
