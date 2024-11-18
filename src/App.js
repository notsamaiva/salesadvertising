import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './AppRoutes'; // Import des routes de l'application
import { AuthProvider } from './contexts/AuthContext'; // Import du contexte d'authentification

// Création d'un thème avec MUI
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', // Définition de la police de caractères
  },
});

// Composant principal de l'application
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <AppRoutes /> {/* Intégration des routes de l'application */}
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; // Exportation du composant App
