import React from 'react';
import { Store, ShoppingBag, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 tracking-tight text-lg">
                {SITE_CONFIG.name}
              </span>
              <Badge variant="emerald" size="sm">
                MVP Foundation
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Boutiques en ligne & vitrines
            </p>
          </div>
        </div>

        {/* City & Market coverage badges */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 text-xs text-slate-600 border border-slate-200/50">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Yaoundé & Douala</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-medium text-slate-500">FR (XAF)</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <ShoppingBag className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Explorer le Marché</span>
          </Button>

          <Button variant="outline" size="sm">
            <Store className="w-4 h-4 text-emerald-600" />
            <span>Espace Commerçant</span>
          </Button>

          <Button variant="secondary" size="sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
