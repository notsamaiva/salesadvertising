import React, { useEffect, useState } from 'react';
import { Box, Typography, Alert, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ProfileDetails = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');
    const location = useLocation();

    useEffect(() => {
        // Si des données de profil sont passées via l'état de navigation
        if (location.state && location.state.profileData) {
            setProfileData(location.state.profileData);
        } else {
            // Sinon, récupérer les données depuis le backend
            const fetchProfileData = async () => {
                try {
                    const response = await fetch('http://localhost/pricing_app/getProfile.php', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setProfileData(data);
                    } else {
                        setError('Failed to load profile data.');
                    }
                } catch (err) {
                    setError('An error occurred while fetching profile data.');
                }
            };

            fetchProfileData();
        }
    }, [location.state]);

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!profileData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom>Profile Details</Typography>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Profile Picture:</Typography>
                {profileData.profilePicture && (
                    <img src={profileData.profilePicture} alt="Profile" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                )}
            </Box>
            <Typography variant="h6">Country: {profileData.country}</Typography>
            <Typography variant="h6">City: {profileData.city}</Typography>
            <Typography variant="h6">Airport: {profileData.airport}</Typography>
            <Typography variant="h6">Leader: {profileData.leader}</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.history.back()}>
                Back
            </Button>
        </Box>
    );
};

export default ProfileDetails;
