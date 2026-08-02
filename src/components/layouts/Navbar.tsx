import React, { useState } from 'react';
import {
  Store,
  ShoppingBag,
  ShieldCheck,
  Tag,
  CreditCard,
  Sun,
  Moon,
  User,
  LogOut,
  Home as HomeIcon,
  Search,
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AuthModal } from '../auth/AuthModal';

export type AppViewMode = 'home' | 'marketplace' | 'categories' | 'pricing' | 'dashboard' | 'admin' | 'shop';

interface NavbarProps {
  currentView: AppViewMode;
  setCurrentView: (view: AppViewMode) => void;
  openAuthModal?: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, openAuthModal }) => {
  const { userProfile, logout, switchDemoUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    if (openAuthModal) {
      openAuthModal(mode);
    } else {
      setAuthMode(mode);
      setIsAuthOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-slate-200/70 dark:border-zinc-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Brand Identity */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-500 text-white font-black flex items-center justify-center text-lg shadow-sm shadow-orange-500/30 group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-lg">
                  {SITE_CONFIG.name}
                </span>
                <Badge variant="orange" size="sm" className="hidden sm:inline-flex text-[10px]">
                  Marketplace
                </Badge>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 hidden sm:block font-medium">
                Cameroun • Yaoundé & Douala
              </p>
            </div>
          </button>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-zinc-800/60 p-1 rounded-2xl border border-slate-200/50 dark:border-zinc-700/50">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'home'
                  ? 'bg-white dark:bg-zinc-900 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </button>

            <button
              onClick={() => setCurrentView('marketplace')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'marketplace'
                  ? 'bg-white dark:bg-zinc-900 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Catalogue</span>
            </button>

            <button
              onClick={() => setCurrentView('categories')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'categories'
                  ? 'bg-white dark:bg-zinc-900 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Catégories</span>
            </button>

            <button
              onClick={() => setCurrentView('pricing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'pricing'
                  ? 'bg-white dark:bg-zinc-900 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Tarifs</span>
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-white dark:bg-zinc-900 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Espace Commerçant</span>
            </button>

            {userProfile?.role === 'admin' && (
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  currentView === 'admin'
                    ? 'bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* User Controls & Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Mobile catalogue button */}
            <button
              onClick={() => setCurrentView('marketplace')}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
              title="Ouvrir le catalogue"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              title="Basculer Mode Clair / Sombre"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Quick Role Switcher for Evaluation */}
            <div className="hidden xl:flex items-center gap-1 text-[11px] text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded-xl">
              <span className="font-semibold text-slate-400">Rôle :</span>
              <button
                onClick={() => {
                  switchDemoUser('merchant');
                  setCurrentView('dashboard');
                }}
                className={`px-2 py-0.5 rounded-lg ${
                  userProfile?.role === 'merchant'
                    ? 'bg-orange-500 text-white font-bold'
                    : 'hover:bg-slate-200 dark:hover:bg-zinc-700'
                }`}
              >
                Commerçant
              </button>
              <button
                onClick={() => {
                  switchDemoUser('admin');
                  setCurrentView('admin');
                }}
                className={`px-2 py-0.5 rounded-lg ${
                  userProfile?.role === 'admin'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'hover:bg-slate-200 dark:hover:bg-zinc-700'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Account / Login actions */}
            {userProfile ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('dashboard')}
                  className="hidden sm:inline-flex"
                >
                  <User className="w-3.5 h-3.5 text-orange-500" />
                  <span className="truncate max-w-[120px]">{userProfile.displayName || 'Mon compte'}</span>
                </Button>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenAuth('login')}
                  className="text-xs"
                >
                  Connexion
                </Button>
                <Button
                  variant="orange"
                  size="sm"
                  onClick={() => handleOpenAuth('signup')}
                  className="text-xs font-bold"
                >
                  S'inscrire
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
};
