import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChooseCountry from './components/ChooseCountry';
import PriceList from './components/PriceList';
import PriceDetail from './components/PriceDetail';
import Payment from './components/Payment';
import ConfirmationPage from './components/ConfirmationPage';

import ContactForm from './components/ContactForm';
import Dashboard from './pages/admin/Dashboard';
import ADashboard from './pages/ambassadors/ADashboard';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext'; // Import useAuth
import { Elements } from '@stripe/react-stripe-js'; // Import Elements
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe
import CheckoutForm from "./components/CheckoutForm";
import Confirmation from "./components/Confirmation";
import MultiseriesChart from './pages/ambassadors/affiliations/MultiseriesChart';
// Remplacez par votre clé publique Stripe
const stripePromise = loadStripe('pk_live_51MBcFECTKeEgqMF1YjC9qUVPKZAuE1GeaKMiYMt0uPhAOT4ppnJPeiSpaSegIfmH4SyWWEL6AwCftp4UeFUkHkoe00sYIYKyha');

const AppRoutes = () => {
  const { isAuthenticated } = useAuth(); // Get authentication status from context
  const location = useLocation();

  return (
    <>
      {/* Afficher la Navbar sauf pour /dashboard-admin et /dashboard-ambassadors */}
      {!location.pathname.startsWith('/dashboard-admin') &&
        !location.pathname.startsWith('/dashboard-ambassadors') && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/country" element={<ChooseCountry />} />
        <Route path="/contact-us" element={<ContactForm />} />
        <Route path="/:country/price-list" element={<PriceList />} />
        <Route path="/details/:country/:plan/:period" element={<PriceDetail />} />
        <Route path="/:country/:plan/:period/payment/confirmation" element={<ConfirmationPage />} />
        {/* Wrap Payment in Elements */}
        <Route
          path="/details/:country/:plan/:period/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
          <Route
          path="/:country/price-list?ref=:username"
          element={
        
              <PriceList />
        
          }
        />
        <Route
          path="/dashboard-admin/*"
          element={
            <ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/dashboard-ambassadors/*"
          element={
            <ProtectedRoute element={<ADashboard />} isAuthenticated={isAuthenticated} />
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<CheckoutForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/multiseries-chart" element={<MultiseriesChart/>}/>
      </Routes>
    </>
  );
};

export default AppRoutes;
