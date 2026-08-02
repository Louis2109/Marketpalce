import React, { useState } from 'react';
import {
  Store as StoreIcon,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Package,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Store, Product } from '../../types';

interface HomeShowcaseProps {
  onGoToDashboard: () => void;
}

export const HomeShowcase: React.FC<HomeShowcaseProps> = ({ onGoToDashboard }) => {
  const [selectedDemoCity, setSelectedDemoCity] = useState<'Tous' | 'Yaoundé' | 'Douala'>('Tous');

  // Interactive WhatsApp contact simulator
  const [simulatedStore, setSimulatedStore] = useState<string>('Boutique Elegance Bastos');
  const [simulatedProduct, setSimulatedProduct] = useState<string>('Sac Artisanal en Cuir de Luxe');
  const [simulatedPrice, setSimulatedPrice] = useState<number>(18500);

  const sampleStores = [
    {
      id: 'demo-store-1',
      name: 'Boutique Élégance Bastos',
      city: 'Yaoundé',
      whatsappNumber: '237699001122',
      logoUrl: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=200&auto=format&fit=crop&q=80',
      description: 'Maroquinerie de luxe et accessoires de mode au cœur du quartier Bastos.',
      isVerified: true,
      productsCount: 8,
      sampleProduct: 'Sac Artisanal Cuir Bastos',
      samplePrice: 18500,
    },
    {
      id: 'demo-store-2',
      name: 'Akwa HighTech Mobile',
      city: 'Douala',
      whatsappNumber: '237677112233',
      logoUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&auto=format&fit=crop&q=80',
      description: 'Smartphones originaux et accessoires certifiés à Akwa Boulevard.',
      isVerified: true,
      productsCount: 12,
      sampleProduct: 'Écouteurs Sans Fil Pro',
      samplePrice: 12000,
    },
    {
      id: 'demo-store-3',
      name: 'Maison du Tissu Omnisports',
      city: 'Yaoundé',
      whatsappNumber: '237690554433',
      logoUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&auto=format&fit=crop&q=80',
      description: 'Pagne traditionnel, tissus de gala et couture sur mesure.',
      isVerified: false,
      productsCount: 5,
      sampleProduct: 'Pagne Super Wax (6 Yards)',
      samplePrice: 15000,
    },
  ];

  const filteredSampleStores = sampleStores.filter(
    (s) => selectedDemoCity === 'Tous' || s.city === selectedDemoCity
  );

  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 via-amber-600 to-orange-700 text-white p-8 md:p-12 shadow-xl shadow-orange-500/10">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Mervason — Solution Commerce Cameroun</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            La vitrine en ligne ultime pour les commerçants du Cameroun.
          </h1>

          <p className="text-sm md:text-base text-orange-100 leading-relaxed font-medium">
            Créez votre boutique en quelques clics à <strong className="text-white">Yaoundé</strong> ou <strong className="text-white">Douala</strong>,
            présentez vos produits en <strong className="text-white">FCFA (XAF)</strong> et convertissez vos visiteurs directement sur WhatsApp sans contrainte de livraison.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="secondary"
              size="lg"
              onClick={onGoToDashboard}
              className="bg-white text-orange-900 hover:bg-orange-50 border-none font-bold shadow-md"
            >
              <span>Accéder à l'Espace Commerçant</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="bordered" className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
            <StoreIcon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Boutique Offerte & Autonome
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Chaque commerçant bénéficie d'une boutique gratuite avec un lien unique (ex: <code className="text-orange-600">/store/boutique-bastos</code>) et jusqu'à 10 produits.
          </p>
        </Card>

        <Card variant="bordered" className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Conversion WhatsApp Directe
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Pas de panier complexe ni d'intermédiaire. L'acheteur clique et ouvre directement un message pré-rempli sur le WhatsApp du vendeur.
          </p>
        </Card>

        <Card variant="bordered" className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Ancrage Légal & Villes Cibles
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Concentration sur Yaoundé et Douala. Prix exclusivement en Francs CFA (XAF) et badges commerçants certifiés.
          </p>
        </Card>
      </div>

      {/* Live Showcase of Stores */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Boutiques Populaires sur Mervason
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Découvrez les commerces actifs et leurs produits en rayon.
            </p>
          </div>

          {/* City Filter pills */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl">
            {(['Tous', 'Yaoundé', 'Douala'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedDemoCity(city)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedDemoCity === city
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredSampleStores.map((store) => (
            <GlassCard key={store.id} hoverEffect className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={store.logoUrl}
                      alt={store.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-zinc-700"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">{store.name}</h3>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-zinc-400">
                        <MapPin className="w-3 h-3 text-orange-500" />
                        <span>{store.city}</span>
                      </div>
                    </div>
                  </div>
                  {store.isVerified && <Badge variant="emerald" size="sm">Vérifiée</Badge>}
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-300 line-clamp-2">
                  {store.description}
                </p>

                {/* Sample featured item */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-slate-400 font-medium">Article phare</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{store.sampleProduct}</div>
                  </div>
                  <div className="text-xs font-extrabold text-orange-600 dark:text-orange-400">
                    {store.samplePrice.toLocaleString('fr-FR')} FCFA
                  </div>
                </div>
              </div>

              {/* WhatsApp Action */}
              <a
                href={`https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(
                  `Bonjour ${store.name}, je suis intéressé par votre produit "${store.sampleProduct}" vu sur Mervason.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contacter sur WhatsApp</span>
              </a>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* WhatsApp Conversion Demonstrator */}
      <Card variant="flat" className="p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="emerald" size="sm">Simulateur WhatsApp Live</Badge>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Testez la fluidité de commande sur WhatsApp
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Sur Mervason, aucun compte n'est requis pour les acheteurs. Le contact est direct.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-2 max-w-sm w-full font-sans text-xs shadow-lg">
            <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-emerald-950/60 pb-1.5 text-[11px]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Message pré-généré sur WhatsApp</span>
            </div>
            <p className="text-emerald-100 italic leading-snug">
              "Bonjour {simulatedStore}, je souhaite commander : **{simulatedProduct}** ({simulatedPrice.toLocaleString('fr-FR')} FCFA). Est-il disponible à Yaoundé ?"
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
