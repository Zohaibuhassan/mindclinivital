import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import Problems from './components/Problems';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MentalAssessment from './components/MentalAssessment';
import SleepAssessment from './components/SleepAssessment';
import StrokeAssessment from './components/StrokeAssessment';
import Auth from './components/Auth';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper to handle navigation
  const navigateToMentalAI = () => {
    setCurrentView('mental');
    window.scrollTo(0, 0);
  };

  const navigateToSleepAI = () => {
    setCurrentView('sleep');
    window.scrollTo(0, 0);
  };

  const navigateToStrokeAI = () => {
    setCurrentView('stroke');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-bg-primary text-white font-sans overflow-x-hidden selection:bg-[rgba(0,212,200,0.3)] selection:text-white">
      {currentView === 'home' && <Navbar />}
      {currentView === 'home' ? (
        <>
          <Hero onTryDemo={navigateToMentalAI} />
          <Capabilities onTryMentalAI={navigateToMentalAI} onTrySleepAI={navigateToSleepAI} onTryStrokeAI={navigateToStrokeAI} />
          <Problems />
          <Contact />
        </>
      ) : currentView === 'mental' ? (
        <MentalAssessment onBack={navigateToHome} />
      ) : currentView === 'sleep' ? (
        <SleepAssessment onBack={navigateToHome} />
      ) : (
        <StrokeAssessment onBack={navigateToHome} />
      )}
      {currentView === 'home' && <Footer />}
    </div>
  );
}

export default App;