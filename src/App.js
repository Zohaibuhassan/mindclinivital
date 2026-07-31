import React, { useState, useEffect } from 'react';
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
import SplashScreen from './components/SplashScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[rgba(0,212,200,0.2)] border-t-[#00d4c8] rounded-full animate-spin"></div>
      </div>
    );
  }

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