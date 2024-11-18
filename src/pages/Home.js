// src/pages/Home.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AudienceSection from '../components/AudienceSection';
import Section4 from '../components/Section4';
import OfferSection from '../components/OfferSection';
import NextStepsSection from '../components/NextStepsSection';
import MobileInterfaceSection from '../components/MobileInterfaceSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection /> 
      <AudienceSection />
      <Section4 />
      <OfferSection />
      <NextStepsSection />
      <MobileInterfaceSection />
    </>
  );
};

export default Home;
