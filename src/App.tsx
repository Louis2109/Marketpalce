import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar, AppViewMode } from './components/layouts/Navbar';
import { Footer } from './components/layouts/Footer';
import { HomeMarketplace } from './components/home/HomeMarketplace';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { CategoriesView } from './components/categories/CategoriesView';
import { PricingView } from './components/pricing/PricingView';
import { PublicShopView } from './components/shop/PublicShopView';
import { MerchantDashboard } from './components/dashboard/MerchantDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ContactView } from './components/contact/ContactView';
import { AuthModal } from './components/auth/AuthModal';

function AppContent() {
  const [currentView, setCurrentView] = useState<AppViewMode>('home');
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [initialCategory, setInitialCategory] = useState<string | null>(null);
  const [initialSearchQuery, setInitialSearchQuery] = useState<string>('');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const { userProfile } = useAuth();

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleGoToMarketplace = (query?: string, categoryId?: string) => {
    if (query) setInitialSearchQuery(query);
    if (categoryId) setInitialCategory(categoryId);
    setCurrentView('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectShop = (shopId: string) => {
    setSelectedShopId(shopId);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId: string) => {
    setInitialCategory(categoryId);
    setCurrentView('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased selection:bg-orange-100 selection:text-orange-900 transition-colors">
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openAuthModal={handleOpenAuth}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'home' && (
          <HomeMarketplace
            onGoToMarketplace={handleGoToMarketplace}
            onSelectShop={handleSelectShop}
            onGoToPricing={() => setCurrentView('pricing')}
            onGoToDashboard={() => setCurrentView('dashboard')}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentView === 'marketplace' && (
          <MarketplaceView
            initialCategory={initialCategory}
            initialQuery={initialSearchQuery}
            onSelectShop={handleSelectShop}
          />
        )}

        {currentView === 'contact' && <ContactView />}

        {currentView === 'categories' && (
          <CategoriesView onSelectCategory={handleSelectCategory} />
        )}

        {currentView === 'pricing' && (
          <PricingView
            onGoToDashboard={() => setCurrentView('dashboard')}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentView === 'shop' && selectedShopId && (
          <PublicShopView
            storeId={selectedShopId}
            onBack={() => setCurrentView('marketplace')}
          />
        )}

        {currentView === 'dashboard' && <MerchantDashboard />}

        {currentView === 'admin' && <AdminDashboard />}
      </main>

      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
