import React, { useState } from 'react'; 
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import axios from 'axios';

const AddPriceList = () => {
    const [country, setCountry] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [period, setPeriod] = useState('1month');
    const [starterPrice, setStarterPrice] = useState('');
    const [promoPrice, setPromoPrice] = useState('');
    const [premiumPrice, setPremiumPrice] = useState('');
    const [standard, setStandard] = useState(''); // Nouveau champ
    const [interstitial, setInterstitial] = useState(''); // Nouveau champ
    const [videoads, setVideoads] = useState(''); // Nouveau champ
    const [loading, setLoading] = useState(false);

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
            standard, // Nouveau champ
            interstitial, // Nouveau champ
            videoads, // Nouveau champ
        };

        try {
            setLoading(true);
            const response = await axios.post('http://localhost/pricing_app/add_price.php', priceData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert(response.data.success || response.data.error);
        } catch (error) {
            alert('An error occurred while adding the price list: ' + (error.response ? error.response.data : error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2, marginTop: 100 }}>
            <FormControl fullWidth margin="normal">
                <InputLabel>Country</InputLabel>
                <TextField value={country} onChange={(e) => setCountry(e.target.value)} />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Currency</InputLabel>
                <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Period</InputLabel>
                <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
                    <MenuItem value="1month">1 Month</MenuItem>
                    <MenuItem value="3months">3 Months</MenuItem>
                </Select>
            </FormControl>
            <TextField
                fullWidth
                margin="normal"
                label="Starter Price"
                value={starterPrice}
                onChange={(e) => setStarterPrice(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Promo Price"
                value={promoPrice}
                onChange={(e) => setPromoPrice(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Premium Price"
                value={premiumPrice}
                onChange={(e) => setPremiumPrice(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Standard"
                value={standard}
                onChange={(e) => setStandard(e.target.value)} // Nouveau champ
            />
            <TextField
                fullWidth
                margin="normal"
                label="Interstitial"
                value={interstitial}
                onChange={(e) => setInterstitial(e.target.value)} // Nouveau champ
            />
            <TextField
                fullWidth
                margin="normal"
                label="Videoads"
                value={videoads}
                onChange={(e) => setVideoads(e.target.value)} // Nouveau champ
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Price List'}
            </Button>
        </Box>
    );
};

export default AddPriceList;
