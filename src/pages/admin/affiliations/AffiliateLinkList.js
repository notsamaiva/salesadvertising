import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';

const AffiliateLinkList = () => {
  const [affiliateLinks, setAffiliateLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchAffiliateLinks = async () => {
      try {
        const response = await fetch('http://localhost/pricing_app/get_all_affiliate_links.php');
        if (!response.ok) {
          throw new Error('Error fetching affiliate links');
        }
        const data = await response.json();
        console.log('Données reçues:', data);

        if (data.message) {
          setAffiliateLinks([]);
          setSnackbarMessage(data.message);
        } else {
          const uniqueLinks = [...new Set(data.map(link => link.generated_link))];
          setAffiliateLinks(uniqueLinks.map(link => ({ generated_link: link, clicks: 0 })));
        }
      } catch (error) {
        setError(error.message);
        setSnackbarMessage('Failed to fetch affiliate links. Please try again later.');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliateLinks();
  }, []);

  const copyToClipboard = (link) => {
    const fullLink = `http://localhost:3000${link}`;
    navigator.clipboard.writeText(fullLink);
    setSnackbarMessage('Link copied to clipboard!');
    setOpenSnackbar(true);
  };

  const recordClick = async (link) => {
    try {
      const response = await fetch(`http://localhost/pricing_app/record_click.php?link=${encodeURIComponent(link)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        window.open(link, '_blank');
        setAffiliateLinks(prevLinks => prevLinks.map(item => {
          if (item.generated_link === link) {
            return { ...item, clicks: item.clicks + 1 };
          }
          return item;
        }));
      } else {
        setSnackbarMessage(data.message);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du clic:", error);
      setSnackbarMessage('Échec de l\'enregistrement du clic. Veuillez réessayer plus tard.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Bloc affichant le nombre de liens */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" sx={{ color: '#13017c', fontWeight: 'bold' }}>
          Number of Links: {affiliateLinks.length}
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ color: '#13017c' }}>
        All Affiliate Links
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)', borderRadius: '8px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#66bebf', fontWeight: 'bold' }}>Generated Link</TableCell>
                <TableCell sx={{ color: '#66bebf', fontWeight: 'bold' }}>Clicks</TableCell>
                <TableCell align="right" sx={{ color: '#66bebf', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {affiliateLinks.length > 0 ? (
                affiliateLinks.map((link, index) => (
                  <TableRow key={index}>
                    <TableCell>{link.generated_link}</TableCell>
                    <TableCell>{link.clicks}</TableCell>
                    <TableCell align="right">
                      <Button 
                        onClick={() => copyToClipboard(link.generated_link)} 
                        sx={{ 
                          marginRight: 1, 
                          color: 'white', 
                          backgroundColor: '#13017c', 
                          '&:hover': { backgroundColor: '#66bebf', color: 'black' } 
                        }}
                      >
                        Copy
                      </Button>
                      <Button 
                        onClick={() => recordClick(link.generated_link)} 
                        sx={{ 
                          color: 'white', 
                          backgroundColor: '#66bebf', 
                          '&:hover': { backgroundColor: '#13017c', color: 'white' } 
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ color: 'black' }}>No affiliate links found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'info'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AffiliateLinkList;
