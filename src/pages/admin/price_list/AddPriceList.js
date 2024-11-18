import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPriceList = () => {
    const [country, setCountry] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [period, setPeriod] = useState('1month');
    const [starterPrice, setStarterPrice] = useState('');
    const [promoPrice, setPromoPrice] = useState('');
    const [premiumPrice, setPremiumPrice] = useState('');
    const [standard, setStandard] = useState('');
    const [interstitial, setInterstitial] = useState('');
    const [videoads, setVideoads] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Hook for navigation

    const validateForm = () => {
        return country && currency && period && starterPrice && promoPrice && premiumPrice && standard && interstitial && videoads;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert("Please fill in all fields");
            return;
        }

        const priceData = {
            country,
            currency,
            period,
            starter_price: starterPrice,
            promo_price: promoPrice,
            premium_price: premiumPrice,
            standard,
            interstitial,
            videoads,
        };

        try {
            setLoading(true);
            const response = await axios.post('http://localhost/pricing_app/add_price.php', priceData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert(response.data.success || response.data.error);
            navigate('/dashboard-admin/offers'); // Redirect after submission
        } catch (error) {
            alert('An error occurred while adding the price list: ' + (error.response ? error.response.data : error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 4, marginTop: 5, maxWidth: '800px', margin: 'auto' }}>
            <Paper elevation={5} sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={4}>
    <FormControl fullWidth>
        <InputLabel sx={{ color: '#13017c' }}>Period</InputLabel>
        <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            variant="outlined"
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#66bebf',
                    },
                    '&:hover fieldset': {
                        borderColor: '#13017c',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#13017c',
                    },
                },
            }}
        >
            <MenuItem value="1month">1 Month</MenuItem>
            <MenuItem value="3months">3 Months</MenuItem>
        </Select>
    </FormControl>
</Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: '#13017c' }}>Country</InputLabel>
                            <TextField
                            fullWidth
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                variant="outlined"
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#66bebf',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#13017c',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#13017c',
                                        },
                                    },
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: '#13017c' }}>Currency</InputLabel>
                            <Select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#66bebf',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#13017c',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#13017c',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Starter Price"
                            value={starterPrice}
                            onChange={(e) => setStarterPrice(e.target.value)}
                            variant="outlined"
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#66bebf',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#13017c',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#13017c',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Promo Price"
                            value={promoPrice}
                            onChange={(e) => setPromoPrice(e.target.value)}
                            variant="outlined"
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#66bebf',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#13017c',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#13017c',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Premium Price"
                            value={premiumPrice}
                            onChange={(e) => setPremiumPrice(e.target.value)}
                            variant="outlined"
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#66bebf',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#13017c',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#13017c',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Standard"
                            value={standard}
                            onChange={(e) => setStandard(e.target.value)}
                            variant="outlined"
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#66bebf',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#13017c',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#13017c',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Interstitial"
                            value={interstitial}
                            onChange={(e) => setInterstitial(e.target.value)}
                            variant="outlined"
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#66bebf',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#13017c',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#13017c',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Videoads"
                            value={videoads}
                            onChange={(e) => setVideoads(e.target.value)}
                            variant="outlined"
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#66bebf',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#13017c',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#13017c',
                                    },
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <Box mt={3} textAlign="center">
                    <Button type="submit" variant="contained" disabled={loading}
                        sx={{
                            backgroundColor: '#13017c',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#66bebf', // Couleur de survol
                            },
                            padding: '10px 20px',
                            borderRadius: '32px',
                        }}>
                        {loading ? 'Adding...' : 'Add Price List'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AddPriceList;
