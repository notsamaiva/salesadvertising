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
import { LineChart, Line, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
  const [revenues, setRevenues] = useState({ before: 0, during: 0, after: 0 });  // Revenus pour chaque période
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
  const [adhesionDate, setAdhesionDate] = useState(null); // Nouvelle variable pour la date d'adhésion

 
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
      if (data) {
        return {
          sales_count: data.sales_count,
          total_revenue: data.total_revenue

        };
      } else {
        throw new Error('Les données de vente sont manquantes ou incorrectes');
      }
    } catch (error) {
      console.error('Erreur API:', error);
      return { sales_count: 0, total_revenue: 0 };
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
  
        // Récupérer les ventes et revenus pour chaque période
        const beforeData = await fetchSalesForPeriod(generatedLink, beforeStartDateFormatted, startDateFormatted);
        const duringData = await fetchSalesForPeriod(generatedLink, startDateFormatted, endDateFormatted);
        const afterData = await fetchSalesForPeriod(generatedLink, endDateFormatted, afterEndDateFormatted);
  
        // Calculer les revenus avec un taux de commission (si nécessaire)
        const commissionRate = 0.10; // Exemple de taux de commission
  
        setSalesCounts({
          before: beforeData.sales_count,
          during: duringData.sales_count,
          after: afterData.sales_count,
        });
  
        setRevenues({
          before: beforeData.total_revenue * commissionRate,
          during: duringData.total_revenue * commissionRate,
          after: afterData.total_revenue * commissionRate,
        });
      }
    } catch (error) {
      console.error('Erreur de récupération des ventes et revenus :', error);
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
  const fetchAdhesionDate = async () => {
    try {
      const response = await fetch('http://localhost/pricing_app/adhesion_users.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }), // Envoi des données dans le corps de la requête
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
    fetchAdhesionDate();
  }, []);  // L'effet est appelé une seule fois au montage du composant
  
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
    { name: `${beforeStartDateFormatted} to ${startDateFormatted}`, sales: salesCounts.before, revenue: revenues.before },
    { name: `${startDateFormatted} to ${endDateFormatted}`, sales: salesCounts.during, revenue: revenues.during },
    { name: `${endDateFormatted} to ${afterEndDateFormatted}`, sales: salesCounts.after, revenue: revenues.after },
  ];

const calculateCommission = (revenue, adhesionDate) => {
  const currentDate = new Date();
  const adhesionDateObj = new Date(adhesionDate);
  const diffTime = Math.abs(currentDate - adhesionDateObj);
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30)); // Différence en mois

  // Si la période est inférieure ou égale à 3 mois, commission = 75%, sinon 30%
  const commissionRate = diffMonths <= 3 ? 0.75 : 0.30;

  return revenue * commissionRate;
};

  return (
    <Box sx={{ backgroundColor: '#F0F4F8', padding: 4, borderRadius: 2 }}>
  <Typography variant="h4" gutterBottom sx={{ color: '#13017c', fontWeight: 'bold' }}>
    Affiliate Links for {country} ({username})
  </Typography>

  {/* Affichage du nombre de ventes et des revenus avant le tableau */}
  <Box sx={{ marginTop: 3 }}>
    <Typography variant="h6" gutterBottom sx={{ color: '#13017c' }}>
      Sales and Revenue Overview
    </Typography>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        marginTop: 2,
      }}
    >
      {/* Bloc pour chaque période */}
      <Box
        sx={{
          backgroundColor: '#66bfbe',
          padding: 2,
          borderRadius: 1,
          flex: 1,
          color: '#ffffff',
        }}
      >
        <Typography variant="body1">
          <strong>Before Period:</strong> {salesCounts.before} Sales, ${revenues.before.toFixed(2)} Revenue, 
          ${calculateCommission(revenues.before, adhesionDate).toFixed(2)} Commission
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: '#13017c',
          padding: 2,
          borderRadius: 1,
          flex: 1,
          color: '#ffffff',
        }}
      >
        <Typography variant="body1">
          <strong>During Period:</strong> {salesCounts.during} Sales, ${revenues.during.toFixed(2)} Revenue, 
          ${calculateCommission(revenues.during, adhesionDate).toFixed(2)} Commission
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: '#66bfbe',
          padding: 2,
          borderRadius: 1,
          flex: 1,
          color: '#ffffff',
        }}
      >
        <Typography variant="body1">
          <strong>After Period:</strong> {salesCounts.after} Sales, ${revenues.after.toFixed(2)} Revenue, 
          ${calculateCommission(revenues.after, adhesionDate).toFixed(2)} Commission
        </Typography>
      </Box>
    </Box>
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

  {/* Calendriers pour sélectionner les dates */}
  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
    <Box sx={{ width: '45%' }}>
      <Typography variant="subtitle1" gutterBottom>
        Start Date
      </Typography>
      <Calendar value={selectedStartDate} onChange={handleStartDateChange} />
    </Box>
    <Box sx={{ width: '45%' }}>
      <Typography variant="subtitle1" gutterBottom>
        End Date
      </Typography>
      <Calendar value={selectedEndDate} onChange={handleEndDateChange} />
    </Box>
  </Box>
  {/* Affichage du nombre de ventes et des revenus avant le tableau */}
  {/* Affichage des liens d'affiliation */}
  {loading ? (
    <CircularProgress />
  ) : error ? (
    <Typography color="error">{error}</Typography>
  ) : (
    <>
       {/*tarbleau */}
    {/*tarbleau */}

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
      {/* Graphique des ventes et des revenus */}
      <ResponsiveContainer width="100%" height={400}>
  <LineChart data={salesData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    
    {/* Axe principal pour le revenu avec un label */}
    <YAxis yAxisId="left" marginTop="30">
      <Label value="Revenue"  angle={-90} position="left" style={{ textAnchor: 'middle', fill: '#82ca9d', fontSize: '20px' }} />
    </YAxis>
    
    {/* Axe secondaire pour les ventes avec un label */}
    <YAxis yAxisId="right" orientation="right">
      <Label value="Sales" angle={90} position="right" style={{ textAnchor: 'middle', fill: '#8884d8', fontSize: '16px' }} />
    </YAxis>
    
    <Tooltip />
    <Legend />
    
    {/* Courbe du revenu */}
    <Line 
      type="monotone" 
      dataKey="revenue" 
      stroke="#82ca9d" 
      yAxisId="left" 
      strokeWidth={2} 
      dot={false} 
    />
    
    {/* Courbe des ventes */}
    <Line 
      type="monotone" 
      dataKey="sales" 
      stroke="#8884d8" 
      yAxisId="right" 
      strokeWidth={2} 
      dot={false} 
    />
  </LineChart>
</ResponsiveContainer>



    </>
  )}

  {/* Snackbar pour afficher les erreurs */}
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
