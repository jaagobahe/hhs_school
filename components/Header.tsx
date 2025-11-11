import React, { useState } from 'react';
import type { Page, User, LoginRole } from '../types';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  loggedInUser: User | null;
  onLogout: () => void;
  logoUrl: string;
}

interface NavLink {
  page: Page;
  label: string;
}

interface NavMenu {
  label: string;
  children: NavLink[];
}

type NavItem = NavLink | NavMenu;

function isNavMenu(item: NavItem): item is NavMenu {
  return 'children' in item;
}

const navItems: NavItem[] = [
  { page: 'home', label: 'হোম' },
  { page: 'about', label: 'আমাদের সম্পর্কে' },
  {
    label: 'একাডেমিক তথ্য',
    children: [
      { page: 'student-statistics', label: 'শিক্ষার্থী পরিসংখ্যান' },
      { page: 'teachers', label: 'শিক্ষকবৃন্দ' },
      { page: 'staff', label: 'কর্মচারীবৃন্দ' },
      { page: 'committee', label: 'কমিটি' },
    ],
  },
  { page: 'notices', label: 'নোটিশ' },
  { page: 'admission', label: 'ভর্তি' },
  { page: 'results', label: 'ফলাফল' },
  { page: 'gallery', label: 'গ্যালারি' },
  { page: 'contact', label: 'যোগাযোগ' },
];

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, loggedInUser, onLogout, logoUrl }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };
  
  const handleMobileLogoutClick = () => {
    onLogout();
    setMobileMenuOpen(false);
  }

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top section with Logo and School Name */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-3">
            <img src={logoUrl} alt="লোগো" className="h-12 w-12 rounded-full" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-brand-primary">হরিপুর উচ্চ বিদ্যালয়</h1>
              <p className="text-xs text-gray-600"> স্থাপিত: <span className="font-tiro-bangla">১৮৮২</span> খ্রি.</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 focus:outline-none"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-brand-primary">
        <div className="container mx-auto px-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {navItems.map((item) =>
                isNavMenu(item) ? (
                  <div key={item.label} className="relative group">
                    <button className="py-3 text-white flex items-center hover:text-brand-accent transition-colors">
                      {item.label}
                      <ChevronDownIcon className="w-4 h-4 ml-1" />
                    </button>
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="py-2">
                        {item.children.map((child) => (
                          <a
                            key={child.page}
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleNavClick(child.page); }}
                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-primary ${currentPage === child.page ? 'font-semibold text-brand-primary' : ''}`}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={item.page}
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.page); }}
                    className={`py-3 text-white hover:text-brand-accent transition-colors ${ currentPage === item.page ? 'font-semibold border-b-2 border-brand-accent' : ''}`}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {loggedInUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm">স্বাগতম, {loggedInUser.name}</span>
                  <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-brand-primary bg-brand-accent rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-yellow-500 transition-all duration-300 ease-in-out">লগআউট</button>
                </div>
              ) : (
                <button 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('login-selection'); }} 
                  className="px-4 py-2 text-sm font-medium text-white bg-brand-secondary rounded-md hover:bg-brand-accent hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-brand-accent transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                    লগইন
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2 pt-2">
                {navItems.map((item) =>
                  isNavMenu(item) ? (
                    <div key={item.label}>
                      <button
                        onClick={() => toggleMobileDropdown(item.label)}
                        className="w-full text-center py-2 rounded-md transition-colors flex justify-center items-center text-white hover:bg-brand-secondary"
                      >
                        {item.label}
                        <ChevronDownIcon className={`w-4 h-4 ml-2 transition-transform ${openMobileDropdown === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      {openMobileDropdown === item.label && (
                        <div className="pl-4 mt-1 space-y-1 bg-brand-primary/50 rounded-md py-2">
                          {item.children.map((child) => (
                            <a
                              key={child.page}
                              href="#"
                              onClick={(e) => { e.preventDefault(); handleNavClick(child.page); }}
                              className={`block text-center py-2 rounded-md transition-colors text-sm ${currentPage === child.page ? 'bg-brand-accent text-brand-primary font-semibold' : 'text-gray-200 hover:bg-brand-secondary hover:text-white'}`}
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      key={item.page}
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.page); }}
                      className={`text-center py-2 rounded-md transition-colors ${ currentPage === item.page ? 'bg-brand-accent text-brand-primary font-semibold' : 'text-white hover:bg-brand-secondary'}`}
                    >
                      {item.label}
                    </a>
                  )
                )}
                <div className="border-t border-brand-secondary my-3 mx-4"></div>
                {loggedInUser ? (
                  <div className="px-4 text-center">
                     <span className="text-white block mb-3">স্বাগতম, {loggedInUser.name}</span>
                     <button onClick={handleMobileLogoutClick} className="w-full text-center py-2 px-4 bg-brand-accent text-brand-primary rounded-md hover:bg-yellow-400 transition-colors duration-300 font-semibold">লগআউট</button>
                  </div>
                ) : (
                  <div className="px-4">
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleNavClick('login-selection'); }}
                      className="w-full text-center block py-2 px-4 bg-brand-secondary text-white rounded-md hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300 font-semibold"
                    >
                      লগইন
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;