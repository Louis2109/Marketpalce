import React, { useState } from 'react';
import {
  ShoppingBag,
  Sun,
  Moon,
  User,
  LogOut,
  Home as HomeIcon,
  PhoneCall,
  Menu,
  X,
  Store,
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';

export type AppViewMode =
  | 'home'
  | 'marketplace'
  | 'categories'
  | 'pricing'
  | 'dashboard'
  | 'admin'
  | 'shop'
  | 'contact';

interface NavbarProps {
  currentView: AppViewMode;
  setCurrentView: (view: AppViewMode) => void;
  openAuthModal?: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  openAuthModal,
}) => {
  const { userProfile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    if (openAuthModal) {
      openAuthModal(mode);
    } else {
      setAuthMode(mode);
      setIsAuthOpen(true);
    }
  };

  const navLinks: { id: AppViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Accueil', icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'marketplace', label: 'Catalogue', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <PhoneCall className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: AppViewMode) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-500 text-white font-black flex items-center justify-center text-lg shadow-xs group-hover:bg-orange-600 transition-colors">
              M
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-lg">
                {SITE_CONFIG.name}
              </span>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 hidden sm:block font-medium">
                Yaoundé & Douala
              </p>
            </div>
          </button>

          {/* Desktop Navigation: Exactly 3 links (Accueil, Catalogue, Contact) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50/80 dark:bg-orange-950/30 font-semibold'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Changer de thème"
              aria-label="Basculer thème clair/sombre"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Authenticated user button OR Login / Create Shop */}
            {userProfile ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavClick(userProfile.role === 'admin' ? 'admin' : 'dashboard')}
                  className="text-xs font-medium"
                >
                  {userProfile.role === 'admin' ? (
                    <>
                      <User className="w-3.5 h-3.5 text-purple-600 mr-1.5" />
                      <span>Console Admin</span>
                    </>
                  ) : (
                    <>
                      <Store className="w-3.5 h-3.5 text-orange-500 mr-1.5" />
                      <span className="truncate max-w-[120px]">{userProfile.displayName || 'Mon espace'}</span>
                    </>
                  )}
                </Button>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Déconnexion"
                  aria-label="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenAuth('login')}
                  className="text-xs hidden sm:inline-flex"
                >
                  Connexion
                </Button>
                <Button
                  variant="orange"
                  size="sm"
                  onClick={() => handleOpenAuth('signup')}
                  className="text-xs font-semibold"
                >
                  Créer ma boutique
                </Button>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50/80 dark:bg-orange-950/30 font-semibold'
                      : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
            {!userProfile && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenAuth('login');
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900"
              >
                <User className="w-4 h-4" />
                <span>Connexion</span>
              </button>
            )}
          </div>
        )}
      </header>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
};
