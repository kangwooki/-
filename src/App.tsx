import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { LandAssetView } from './components/LandAssetView';
import { VacantHouseView } from './components/VacantHouseView';
import { ConsultationView } from './components/ConsultationView';
import { AboutView } from './components/AboutView';
import { AdminView } from './components/AdminView';
import { PageTab } from './types';
import { ArrowUp, PhoneCall } from 'lucide-react';
import { SafeGardenLogo } from './components/SafeGardenLogo';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync tab with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageTab;
      if (['home', 'land-asset', 'vacant-house', 'consultation', 'about', 'admin'].includes(hash)) {
        setCurrentTab(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectTab = (tab: PageTab) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1E8] text-[#23382A]">
      {/* Top Navigation */}
      <Navbar currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Main View Router */}
      <main className="flex-1 fade-in">
        {currentTab === 'home' && <HomeView onSelectTab={handleSelectTab} />}
        {currentTab === 'land-asset' && <LandAssetView onSelectTab={handleSelectTab} />}
        {currentTab === 'vacant-house' && <VacantHouseView onSelectTab={handleSelectTab} />}
        {currentTab === 'consultation' && <ConsultationView />}
        {currentTab === 'about' && <AboutView onSelectTab={handleSelectTab} />}
        {currentTab === 'admin' && <AdminView />}
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleSelectTab} />

      {/* Floating Bottom Quick Actions */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col space-y-2">
        {showScrollTop && (
          <button
            id="scroll-to-top-btn"
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-white/90 text-[#23382A] border border-[#23382A]/15 shadow-md flex items-center justify-center hover:bg-white transition-all active:scale-95"
            aria-label="맨 위로 이동"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {currentTab !== 'consultation' && (
          <button
            id="floating-consult-btn"
            onClick={() => handleSelectTab('consultation')}
            className="hidden sm:flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-[#23382A] text-[#F4F1E8] shadow-lg hover:bg-[#2E4634] transition-all border border-[#C9B98B]/40 active:scale-95 text-xs font-bold"
          >
            <SafeGardenLogo variant="symbol" size="sm" theme="gold" />
            <span>현장평가 상담</span>
          </button>
        )}
      </div>
    </div>
  );
}
