import React, { useState, useEffect, useCallback } from 'react';
import { View, UserData, MoralCode } from './types';
import { useAuth } from './hooks/useAuth';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Intervention from './components/Intervention';
import StudyBible from './components/StudyBible';
import HabitMaintenance from './components/HabitMaintenance';
import Pricing from './components/Pricing';
import Header from './components/Header';
import Footer from './components/Footer';
import AiMentor from './components/AiMentor';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<View | null>(null);
  const [userData, setUserData] = useState<UserData>({
    moralCode: null,
    psiTriggers: ['', '', ''],
    pact: '',
    hasOnboarded: false,
  });

  const getUserDataKey = useCallback(() => {
    if (!user) return null;
    return `mcp-userData-${user.email}`;
  }, [user]);

  useEffect(() => {
    if (loading) {
      setCurrentView(null); // Show loading spinner
      return;
    }

    if (!user) {
      setCurrentView(View.AUTH);
      return;
    }
    
    const dataKey = getUserDataKey();
    if (!dataKey) return;

    try {
      const savedUserData = localStorage.getItem(dataKey);
      if (savedUserData) {
        const parsedData: UserData = JSON.parse(savedUserData);
        setUserData(parsedData);
        if (parsedData.hasOnboarded) {
          setCurrentView(View.DASHBOARD);
        } else {
          setCurrentView(View.ONBOARDING);
        }
      } else {
        setCurrentView(View.ONBOARDING);
      }
    } catch (error) {
      console.error("Failed to load user data from localStorage", error);
      setCurrentView(View.ONBOARDING);
    }
  }, [user, loading, getUserDataKey]);

  const handleOnboardingComplete = useCallback((data: Omit<UserData, 'hasOnboarded'>) => {
    const completeUserData = { ...data, hasOnboarded: true };
    setUserData(completeUserData);
    const dataKey = getUserDataKey();
    if (!dataKey) return;
    
    try {
      localStorage.setItem(dataKey, JSON.stringify(completeUserData));
    } catch (error) {
      console.error("Failed to save user data to localStorage", error);
    }
    setCurrentView(View.DASHBOARD);
  }, [getUserDataKey]);

  const renderView = () => {
    if (loading || currentView === null) {
       return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      );
    }

    switch (currentView) {
      case View.AUTH:
        return <Auth />;
      case View.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case View.DASHBOARD:
        return <Dashboard setView={setCurrentView} />;
      case View.INTERVENTION:
        return <Intervention moralCode={userData.moralCode || MoralCode.PERSONAL_CODE} onComplete={() => setCurrentView(View.DASHBOARD)} />;
      case View.STUDY_BIBLE:
        return <StudyBible />;
      case View.HABIT_MAINTENANCE:
        return <HabitMaintenance setView={setCurrentView} />;
      case View.AI_MENTOR:
        return <AiMentor moralCode={userData.moralCode || MoralCode.PERSONAL_CODE} setView={setCurrentView} />;
      case View.PRICING:
        return <Pricing setView={setCurrentView} />;
      default:
        return (
          <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <p>An unexpected error has occurred.</p>
          </div>
        );
    }
  };
  
  const showNav = user && userData.hasOnboarded && currentView !== View.INTERVENTION;

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900">
      {showNav && <Header setView={setCurrentView} />}
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderView()}
      </main>
      {showNav && <Footer />}
    </div>
  );
};

export default App;