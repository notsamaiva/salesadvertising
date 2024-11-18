import React, { useState } from 'react';
import { TextField, Button, MarginTop, Alert, Typography, Box, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import femImage from '../../images/femm.jpg'; // Adjust the path as necessary

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost/pricing_app/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username_or_email: email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    login({ email: data.email, username: data.username });

                    // Role-based navigation
                    const role = data.role.trim().toLowerCase();
                    navigate(role === 'admin' ? '/dashboard-admin' : '/dashboard-ambassadors');
                } else {
                    setError(data.non_field_errors[0] || 'Login failed.');
                }
            } else {
                setError(data.non_field_errors[0] || 'Login failed.');
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid 
            container 
            component="main" 
            sx={{ 
                height: '100vh', 
                marginTop: '10px',
                backgroundImage: `url(${femImage})`, // Set the background image
                backgroundSize: 'cover', // Cover the entire container
                backgroundPosition: 'center', // Center the image
            }}
        >
            <Box
                sx={{
                    my: 4,
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '100px',
                    width: '400px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
                    borderRadius: '8px',
                    boxShadow: 3,
                    height: '350px', // Reduced height
                }}
            >
                <Typography component="h1" variant="h5" sx={{ color: '#13017c', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>
                    Sign in
                </Typography>
                {error && <Alert severity="error" sx={{ marginBottom: 2, marginTop: 2 }}>{error}</Alert>}

                <Box component="form" sx={{marginTop: '40px' }} noValidate onSubmit={handleSubmit}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        placeholder="Enter your Username or Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                        sx={{
                            mb: 2,
                            '& .MuiInputBase-root': { borderColor: '#66bebf' },
                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#66bebf' },
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        type="password"
                        id="password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        sx={{
                            mb: 2,
                            '& .MuiInputBase-root': { borderColor: '#66bebf' },
                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#66bebf' },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                            backgroundColor: '#13017c',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#66bebf', // Color on hover
                            },
                            mb: 2, // Margin bottom for spacing
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '1.1rem', marginTop: '10px' }}>
    Having trouble accessing your account? 
    <Link 
        href="/contact-us" 
        sx={{ 
            color: '#13017c', 
            textDecoration: 'underline', // Underline to make it look like a link
            fontWeight: 'bold',
            '&:hover': {
                textDecoration: 'underline', // Ensure it stays underlined on hover
                color: '#66bebf', // Change color on hover
            },
        }}
    >
        Contact us.
    </Link>
</Typography>

            </Box>
        </Grid>
    );
};

export default Login;
