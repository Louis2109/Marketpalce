import React from 'react';
import { SITE_CONFIG } from '../../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-950/60 py-10 mt-auto text-slate-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-200/60 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                M
              </div>
              <span className="font-bold text-slate-900 dark:text-white">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              {SITE_CONFIG.tagline}. Mervason aide les commerçants au Cameroun à créer leur
              vitrine et recevoir des clients via WhatsApp sans gestion complexe de livraison.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Périmètre Phase 1 — Core Platform
            </h4>
            <ul className="text-xs text-slate-600 dark:text-zinc-400 space-y-2">
              <li>• Auth & Rôles (Commerçant, Client, Admin)</li>
              <li>• Création de Boutiques (1 offerte)</li>
              <li>• Gestion Produits CRUD & Images</li>
              <li>• Dashboard Commerçant & Console Admin</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Monnaie & Villes Cibles
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Monnaie officielle : <strong className="text-orange-500">FCFA (XAF)</strong>.
              Couverture prioritaire : <strong className="text-slate-800 dark:text-zinc-200">Yaoundé & Douala</strong>.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Mervason. Phase 1 Core Platform Opérationnelle.</p>
          <div className="flex items-center gap-4">
            <span>Spécification Mervason v1.0</span>
            <span>•</span>
            <span>Cameroun</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
