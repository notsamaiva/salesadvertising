// src/components/Dashboard.js
import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/ambassadors/Navbar';
import Sidebar from '../../components/ambassadors/Sidebar';
import Content from '../../components/ambassadors/Content';
import AffiliateLinkGenerator from '../../pages/ambassadors/affiliations/AffiliateLinkGenerator';
import AffiliateLinkList from '../../pages/ambassadors/affiliations/AffiliateLinkList'; 
import AffiliateDetails from '../../pages/ambassadors/affiliations/AffiliateDetails';// Import du composant
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Navbar />
        <Box sx={{ flexGrow: 1, padding: 3, marginTop: '64px', overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<Content />} />  {/* Route pour le contenu par défaut */}
            <Route path="/Generate-AffiliateLink" element={<AffiliateLinkGenerator />} /> 
            <Route path="/AffiliateLinkList" element={<AffiliateLinkList />} /> 
            <Route path="/affiliations/:country/:username/details" element={<AffiliateDetails />} />{/* Route vers AffiliateLinkList */}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
