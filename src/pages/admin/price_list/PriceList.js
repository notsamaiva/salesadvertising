import React, { useEffect, useState } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Menu,
    MenuItem,
    IconButton,
    Fade,
    Box,
    Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import AddPriceList from './AddPriceList';
import { useNavigate } from 'react-router-dom';

const PriceList = () => {
    const [priceList, setPriceList] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentPriceId, setCurrentPriceId] = useState(null);
    const [showAddPriceListForm, setShowAddPriceListForm] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPriceList = async () => {
            try {
                const response = await axios.get('http://localhost/pricing_app/get_price_list.php');
                setPriceList(response.data);
            } catch (error) {
                console.error('Error fetching price list:', error);
                setError('Erreur de récupération des prix.');
            } finally {
                setLoading(false);
            }
        };

        fetchPriceList();
    }, []);

    const handleMenuClick = (event, priceId) => {
        setAnchorEl(event.currentTarget);
        setCurrentPriceId(priceId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentPriceId(null);
    };

    const handleAction = (action) => {
        switch (action) {
            case 'edit':
                navigate(`/dashboard-admin/edit-pricelist/${currentPriceId}`);
                break;
            case 'delete':
                console.log(`Supprimer le prix avec ID: ${currentPriceId}`);
                break;
            case 'details':
                console.log(`Détails du prix avec ID: ${currentPriceId}`);
                break;
            case 'reports':
                console.log(`Rapports pour le prix avec ID: ${currentPriceId}`);
                break;
            default:
                break;
        }
        handleClose();
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', color: 'black' }}>
            <Typography variant="h5" mb={2} sx={{ color: '#13017c' }}>
                Liste des prix
            </Typography>
            <Button
                variant="contained"
                onClick={() => setShowAddPriceListForm(true)}
                sx={{
                    backgroundColor: '#66bebf',
                    color: 'white',
                    '&:hover': { backgroundColor: '#57a5a7' },
                    marginBottom: 2,
                }}
            >
                Ajouter une liste de prix
            </Button>
            
            <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#13017c' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', width: '10%' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Pays</TableCell>
                            <TableCell sx={{ color: 'white' }}>Devise</TableCell>
                            <TableCell sx={{ color: 'white' }}>Période</TableCell>
                            <TableCell sx={{ color: 'white' }}>Prix de départ</TableCell>
                            <TableCell sx={{ color: 'white' }}>Prix promo</TableCell>
                            <TableCell sx={{ color: 'white' }}>Prix premium</TableCell>
                            <TableCell sx={{ color: 'white' }}>Standard</TableCell>
                            <TableCell sx={{ color: 'white' }}>Interstitial</TableCell>
                            <TableCell sx={{ color: 'white' }}>Vidéo</TableCell>
                            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={11} align="center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={11} align="center" sx={{ color: 'red' }}>
                                    {error}
                                </TableCell>
                            </TableRow>
                        ) : (
                            priceList.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.country}</TableCell>
                                    <TableCell>{item.currency}</TableCell>
                                    <TableCell>{item.period}</TableCell>
                                    <TableCell>{item.starter_price}</TableCell>
                                    <TableCell>{item.promo_price}</TableCell>
                                    <TableCell>{item.premium_price}</TableCell>
                                    <TableCell>{item.standard}</TableCell>
                                    <TableCell>{item.interstitial}</TableCell>
                                    <TableCell>{item.videoads}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={(event) => handleMenuClick(event, item.id)}>
                                            <MoreVertIcon sx={{ color: '#13017c' }} />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={() => handleAction('edit')}>Modifier</MenuItem>
                                            <MenuItem onClick={() => handleAction('delete')}>Supprimer</MenuItem>
                                            <MenuItem onClick={() => handleAction('details')}>Détails</MenuItem>
                                            <MenuItem onClick={() => handleAction('reports')}>Rapports</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {showAddPriceListForm && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1,
                    }}
                />
            )}

            <Fade in={showAddPriceListForm}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        padding: 3,
                        borderRadius: '8px',
                        zIndex: 2,
                        width: '90%',
                        maxWidth: '600px',
                        boxShadow: 3,
                    }}
                >
                    <AddPriceList onClose={() => setShowAddPriceListForm(false)} />
                </Box>
            </Fade>
        </Box>
    );
};

export default PriceList;
