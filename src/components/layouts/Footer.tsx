import React from 'react';
import { SITE_CONFIG } from '../../config/site';
import { AppViewMode } from './Navbar';

interface FooterProps {
  onNavigate?: (view: AppViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (view: AppViewMode) => {
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 mt-auto text-slate-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200/60 dark:border-zinc-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-sm">
                M
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              Mervason connecte les commerçants locaux de Yaoundé et Douala avec leurs clients en ligne. Découvrez les produits de proximité et commandez directement sur WhatsApp.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="text-xs text-slate-600 dark:text-zinc-400 space-y-2">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('marketplace')}
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                >
                  Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                >
                  Contact & Assistance
                </button>
              </li>
            </ul>
          </div>

          {/* Cameroon Coverage */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Couverture & Monnaie
            </h4>
            <div className="text-xs text-slate-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
              <p>
                Villes : <span className="font-medium text-slate-800 dark:text-zinc-200">Yaoundé & Douala</span>
              </p>
              <p>
                Devise : <span className="font-semibold text-orange-600 dark:text-orange-400">Franc CFA (XAF)</span>
              </p>
              <p>
                Commandes : <span className="font-medium text-emerald-600 dark:text-emerald-400">WhatsApp direct</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} Mervason. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span>Cameroun</span>
            <span>•</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:underline text-slate-500 dark:text-zinc-400"
            >
              Support client
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
