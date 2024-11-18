import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formatDate = (date) => date.toISOString().split('T')[0];

const AffiliateDetails = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [startDateFormatted, setStartDateFormatted] = useState(formatDate(new Date()));
  const [endDateFormatted, setEndDateFormatted] = useState(formatDate(new Date()));

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setStartDateFormatted(formatDate(date));
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setEndDateFormatted(formatDate(date));
  };

  const fetchAllUsersData = async () => {
    try {
      const response = await fetch(
        `http://localhost/pricing_app/get_alluserssales_for_week.php?start_date=${startDateFormatted}&end_date=${endDateFormatted}`
      );

      if (!response.ok) throw new Error("Erreur de réponse de l'API");

      const data = await response.json();

      if (data && Array.isArray(data)) {
        setUsersData(data);
      } else {
        console.error("Données mal formées dans la réponse de l'API");
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
    fetchAllUsersData();
  }, [startDateFormatted, endDateFormatted]);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box sx={{ backgroundColor: '#F0F4F8', padding: 4, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#13017c' }}>
        Affiliate Details for All Users
      </Typography>

      <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
        <Box>
          <Typography variant="body1">Date de début :</Typography>
          <Calendar onChange={handleStartDateChange} value={selectedStartDate} />
        </Box>
        <Box>
          <Typography variant="body1">Date de fin :</Typography>
          <Calendar onChange={handleEndDateChange} value={selectedEndDate} />
        </Box>
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

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom d'utilisateur</TableCell>
                  <TableCell>Nombre de liens</TableCell>
                  <TableCell>Nombre de ventes</TableCell>
                  <TableCell>Montant total (€)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.user_name}</TableCell>
                    <TableCell>{user.link_count}</TableCell>
                    <TableCell>{user.sales_count}</TableCell>
                    <TableCell>{user.total_amount} €</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Graphique des liens, ventes et montant */}
      <Box sx={{ marginTop: 3 }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={usersData} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="user_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="link_count" stroke="#65bfbd" />
            <Line type="monotone" dataKey="sales_count" stroke="#13017c" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

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
