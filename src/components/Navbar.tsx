import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { PageTab } from '../types';
import { BRAND } from '../data/constants';
import { SafeGardenLogo } from './SafeGardenLogo';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: PageTab; label: string }[] = [
    { tab: 'home', label: 'HOME' },
    { tab: 'land-asset', label: '토지와 식물자산' },
    { tab: 'vacant-house', label: '빈집 서비스' },
    { tab: 'consultation', label: '상담' },
    { tab: 'about', label: '회사소개' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F4F1E8]/95 backdrop-blur-md border-b border-[#23382A]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & CI */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group focus:outline-none py-1"
          >
            <SafeGardenLogo
              variant="horizontal"
              size="md"
              theme="light"
              className="group-hover:opacity-90 transition-opacity"
            />
          </button>

          {/* Desktop Navigation - Strictly 5 Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  id={`nav-item-${item.tab}`}
                  onClick={() => handleNavClick(item.tab)}
                  className={`px-3.5 py-2 rounded-md text-[15px] font-medium transition-all relative ${
                    isActive
                      ? 'text-[#23382A] font-bold bg-[#23382A]/5'
                      : 'text-[#23382A]/80 hover:text-[#23382A] hover:bg-[#23382A]/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#23382A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Highlighted CTA Button: "현장평가 상담" */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              id="header-cta-btn"
              onClick={() => handleNavClick('consultation')}
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#23382A] hover:bg-[#2e4634] text-[#F4F1E8] text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all border border-[#23382A] active:scale-[0.98]"
            >
              <span>현장평가 상담</span>
              <ArrowRight className="w-4 h-4 text-[#C9B98B]" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              id="mobile-header-cta"
              onClick={() => handleNavClick('consultation')}
              className="px-3.5 py-1.5 bg-[#23382A] text-[#F4F1E8] text-xs font-semibold rounded-md shadow-xs"
            >
              상담
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#23382A] hover:bg-[#23382A]/10 focus:outline-none"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#23382A]/10 bg-[#F4F1E8] px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <div className="py-2 border-b border-[#23382A]/10 text-xs text-[#23382A]/60 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6F8068]" />
            <span>토지를 보고, 식물을 이해하고, 자산을 관리합니다.</span>
          </div>

          <div className="flex flex-col space-y-1 pt-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  id={`mobile-nav-${item.tab}`}
                  onClick={() => handleNavClick(item.tab)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#23382A] text-[#F4F1E8] font-semibold'
                      : 'text-[#23382A] hover:bg-[#23382A]/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3">
            <button
              id="mobile-drawer-cta-btn"
              onClick={() => handleNavClick('consultation')}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-[#23382A] text-[#F4F1E8] font-semibold rounded-lg text-sm shadow"
            >
              <span>현장평가 상담 신청</span>
              <ArrowRight className="w-4 h-4 text-[#C9B98B]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
