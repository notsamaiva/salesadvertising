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
import UserList from './users&offers/UserList';
import ProfileDetails from './users&offers/ProfileDetails'; 
import CompleteProfile from './users&offers/CompleteProfile'; 
import EditUser from './users&offers/EditUser'; // Import EditUser component
import EditPricelist from './price_list/EditPricelist';
import Profil from './users&offers/Profil'; 
import AffiliateLinkList from './affiliations/AffiliateLinkList'; 
import PDashboard from './users&offers/PDashboard'; 

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
            <Route path="/" element={<Content />} />  {/* Default content route */}
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/offers/add" element={<AddPriceList />} />
            <Route path="/offers" element={<PriceList />} />
            <Route path="/profil" element={<UserProfile />} />
            <Route path="/profil/details" element={<ProfileDetails />} />
            <Route path="/profil/complete" element={<CompleteProfile />} />
            <Route path="/edit-user/:userId" element={<EditUser />} />
            <Route path="/edit-pricelist/:pricelistId" element={<EditPricelist />} />
            <Route path="/profil/:userId" element={<Profil />} />
            <Route path="/AffiliateLinkList" element={<AffiliateLinkList />} />
            <Route path="/get-profil/:utilisateur_id" element={<PDashboard />} />
            

          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
