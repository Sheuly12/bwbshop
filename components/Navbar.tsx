
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, isDarkMode, toggleTheme, onLogin, onLogout }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b dark:border-slate-800 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-sky-600/20">B</div>
            <span className="text-xl font-bold tracking-tight dark:text-white text-slate-900">BWB<span className="text-sky-500"> Shop</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#products" 
              onClick={(e) => scrollToSection(e, 'products')}
              className="text-sm font-semibold dark:text-slate-300 text-slate-600 dark:hover:text-white hover:text-sky-600 transition-colors"
            >
              Products
            </a>
            <a 
              href="#api" 
              onClick={(e) => scrollToSection(e, 'api')}
              className="text-sm font-semibold dark:text-slate-300 text-slate-600 dark:hover:text-white hover:text-sky-600 transition-colors"
            >
              API Packs
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              className="text-sm font-semibold dark:text-slate-300 text-slate-600 dark:hover:text-white hover:text-sky-600 transition-colors"
            >
              About
            </a>
          </div>

          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl dark:bg-slate-800 bg-slate-100 dark:text-slate-300 text-slate-600 border dark:border-slate-700 border-slate-200 hover:scale-105 transition-all shadow-sm"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <div className="h-6 w-[1px] dark:bg-slate-800 bg-slate-200 mx-1"></div>

            {user?.isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full border border-sky-500" />
                  <span className="hidden sm:inline text-xs font-bold dark:text-slate-200 text-slate-700">{user.name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 text-xs font-black uppercase tracking-widest dark:text-slate-300 text-slate-600 border dark:border-slate-700 border-slate-200 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="flex items-center space-x-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl transition-all font-bold shadow-lg shadow-sky-600/20 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <span className="hidden xs:inline">Login with GitHub</span>
                <span className="xs:hidden">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
