import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Déclaration de la fonction de formatage de la date avant son utilisation
const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // format YYYY-MM-DD
};

const calculateDateDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Différence en jours
};

const AffiliateDetails = () => {
  const { country, username } = useParams();
  const [affiliateLinks, setAffiliateLinks] = useState([]);  // Liens d'affiliation
  const [salesCounts, setSalesCounts] = useState({ before: 0, during: 0, after: 0 });  // Ventes pour chaque période
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Mois en base 1
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [startDateFormatted, setStartDateFormatted] = useState(formatDate(new Date())); // Nouveau state
  const [endDateFormatted, setEndDateFormatted] = useState(formatDate(new Date())); // Nouveau state

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setStartDateFormatted(formatDate(date)); // Met à jour la date formatée
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setEndDateFormatted(formatDate(date)); // Met à jour la date formatée
  };

  // Fonction pour envoyer les dates et récupérer le nombre de ventes
  const fetchSalesForPeriod = async (link, startDate, endDate) => {
    try {
      const response = await fetch(
        `http://localhost/pricing_app/get_sales_for_week.php?link=${encodeURIComponent(link)}&start_date=${startDate}&end_date=${endDate}`
      );
      if (!response.ok) {
        throw new Error('Erreur de réponse de l\'API');
      }
      const data = await response.json();
      if (data && typeof data.sales_count === 'number') {
        return data.sales_count;
      } else {
        throw new Error('Le champ sales_count est manquant ou incorrect');
      }
    } catch (error) {
      console.error('Erreur API:', error);
      return 0;
    }
  };

  // Récupérer les ventes pour chaque période
  const fetchSalesData = async () => {
    try {
      if (affiliateLinks.length > 0) {
        const generatedLink = affiliateLinks[0].generated_link;
        if (!generatedLink) {
          throw new Error("Le generated_link est requis mais n'a pas été défini.");
        }

        const beforeStartDate = new Date(selectedStartDate);
        const afterEndDate = new Date(selectedEndDate);

        // Applique les intervalles de jours pour avant et après
        const dateDifference = calculateDateDifference(startDateFormatted, endDateFormatted);
        beforeStartDate.setDate(beforeStartDate.getDate() - dateDifference);
        afterEndDate.setDate(afterEndDate.getDate() + dateDifference);

        // Formater les nouvelles dates
        const beforeStartDateFormatted = formatDate(beforeStartDate);
        const afterEndDateFormatted = formatDate(afterEndDate);

        // Récupérer les ventes pour chaque période
        const beforeSales = await fetchSalesForPeriod(generatedLink, beforeStartDateFormatted, startDateFormatted);
        const duringSales = await fetchSalesForPeriod(generatedLink, startDateFormatted, endDateFormatted);
        const afterSales = await fetchSalesForPeriod(generatedLink, endDateFormatted, afterEndDateFormatted);

        setSalesCounts({
          before: beforeSales,
          during: duringSales,
          after: afterSales,
        });
      }
    } catch (error) {
      console.error('Erreur de récupération des ventes :', error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [affiliateLinks, startDateFormatted, endDateFormatted]);

  useEffect(() => {
    const fetchAffiliateLinks = async () => {
      try {
        const response = await fetch(`http://localhost/pricing_app/get_affiliate_details.php?country=${country}&username=${username}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des liens d\'affiliation');
        }
        const data = await response.json();
        setAffiliateLinks(data);
      } catch (error) {
        console.error('Error fetching affiliate links:', error);
        setError(error.message);
        setSnackbarMessage('Échec de la récupération des liens d\'affiliation. Essayez encore.');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliateLinks();
  }, [country, username]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Créer les périodes avant, pendant, et après
  const beforeStartDate = new Date(selectedStartDate);
  const afterEndDate = new Date(selectedEndDate);
  const dateDifference = calculateDateDifference(startDateFormatted, endDateFormatted);
  beforeStartDate.setDate(beforeStartDate.getDate() - dateDifference);
  afterEndDate.setDate(afterEndDate.getDate() + dateDifference);

  const beforeStartDateFormatted = formatDate(beforeStartDate);
  const afterEndDateFormatted = formatDate(afterEndDate);

  // Formater les données pour le graphique
  const salesData = [
    { name: `${beforeStartDateFormatted} to ${startDateFormatted}`, sales: salesCounts.before },
    { name: `${startDateFormatted} to ${endDateFormatted}`, sales: salesCounts.during },
    { name: `${endDateFormatted} to ${afterEndDateFormatted}`, sales: salesCounts.after },
  ];

  return (
    <Box sx={{ backgroundColor: '#F0F4F8', padding: 4, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#13017c', fontWeight: 'bold' }}>
        Affiliate Links for {country} ({username})
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        {/* Sélecteur d'année */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#13017c' }}>Year</InputLabel>
          <Select value={selectedYear} onChange={handleYearChange}>
            {[2023, 2024, 2025].map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sélecteur de mois */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#13017c' }}>Month</InputLabel>
          <Select value={selectedMonth} onChange={handleMonthChange}>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
              <MenuItem key={month} value={index + 1}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        {/* Calendrier pour la date de début */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" gutterBottom sx={{ color: '#13017c' }}>Start Date</Typography>
          <Calendar onChange={handleStartDateChange} value={selectedStartDate} />
        </Box>

        {/* Calendrier pour la date de fin */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" gutterBottom sx={{ color: '#13017c' }}>End Date</Typography>
          <Calendar onChange={handleEndDateChange} value={selectedEndDate} />
        </Box>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
        
          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#13017c', color: 'white' }}>
                <TableCell sx={{ color: '#66bfbe' }}>Id</TableCell>
                <TableCell sx={{ color: '#66bfbe' }}>Country</TableCell>
                  <TableCell sx={{ color: '#66bfbe' }}>Link</TableCell>
                  <TableCell sx={{ color: '#66bfbe' }}>Created At</TableCell>
               
                  <TableCell sx={{ color: '#66bfbe' }}>Start Date</TableCell>
                  <TableCell sx={{ color: '#66bfbe' }}>End Date</TableCell>
                
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {affiliateLinks.map((link, index) => (
                  <TableRow key={index}>
                    <TableCell>{link.id}</TableCell>
                    <TableCell>{link.country}</TableCell>
                    <TableCell>{link.generated_link}</TableCell>
                    <TableCell>{new Date(link.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{startDateFormatted}</TableCell>
                    <TableCell>{endDateFormatted}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Graphique des ventes */}
          <ResponsiveContainer width={1250} height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#66bfbe" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}

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
