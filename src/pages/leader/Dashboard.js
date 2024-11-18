// src/components/Dashboard.js
import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import Content from '../../components/admin/Content';
import AddPriceList from './price_list/AddPriceList';
import PriceList from './price_list/PriceList';
import AddUser from './users&offers/AddUser';
import UserProfile from '../auth/UserProfile';
import UserList from './users&offers/UserList'; // Importez le composant UserList
import ProfileDetails from './users&offers/ProfileDetails'; 
import CompleteProfile from './users&offers/CompleteProfile'; 

const Dashboard = () => {
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
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/offers/add" element={<AddPriceList />} />
            <Route path="/offers" element={<PriceList />} />
            <Route path="/profil" element={<UserProfile />} />
            <Route path="/profil/details" element={<ProfileDetails />} />
            <Route path="/profil/complete" element={<CompleteProfile />} />
            
            
           
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
