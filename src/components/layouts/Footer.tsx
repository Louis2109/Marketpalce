import React from 'react';
import { SITE_CONFIG } from '../../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/60 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-200/60">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
                M
              </div>
              <span className="font-semibold text-slate-900">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              {SITE_CONFIG.tagline}. Mervason aide les commerçants au Cameroun à créer leur
              vitrine et recevoir des clients via WhatsApp sans gestion complexe de livraison.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Périmètre MVP (Phase 1)
            </h4>
            <ul className="text-xs text-slate-600 space-y-2">
              <li>• Focus prioritaire : Yaoundé & Douala</li>
              <li>• boutiques gratuites & abonnements</li>
              <li>• Conversion directe via WhatsApp</li>
              <li>• Monnaie : FCFA (XAF)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Règles d'Architecture
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mervason ne gère pas directement les livraisons ni les paiements de produits. La plateforme
              centralise les boutiques et redirige les acheteurs vers WhatsApp.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Mervason. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span>Spécification Version 1.0</span>
            <span>•</span>
            <span>Cameroun</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
