import React, { useState } from 'react';
import {
  Check,
  Zap,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Store,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SUBSCRIPTION_PLANS } from '../../config/site';
import { useAuth } from '../../context/AuthContext';
import { updatePageMetadata } from '../../lib/seo';

interface PricingViewProps {
  onGoToDashboard: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onGoToDashboard, onOpenAuth }) => {
  const { userProfile } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  React.useEffect(() => {
    updatePageMetadata({
      title: 'Tarifs & Forfaits Commerçants | Mervason Cameroun',
      description: 'Découvrez nos offres simples pour lancer et booster votre boutique en ligne à Yaoundé et Douala.',
    });
  }, []);

  const faqs = [
    {
      q: 'Y a-t-il des commissions prélevées sur mes ventes WhatsApp ?',
      a: 'Non, aucune commission ! Vous gardez 100% de la valeur de vos ventes. Le paiement et la livraison s’effectuent directement entre vous et votre client.',
    },
    {
      q: 'Puis-je commencer gratuitement sans carte bancaire ?',
      a: 'Oui ! Le plan Gratuit vous donne immédiatement accès à 1 boutique et jusqu’à 10 produits sans limite de durée.',
    },
    {
      q: 'Comment s’effectue le règlement des abonnements payants ?',
      a: 'Les abonnements Standard et Professionnel se règlent facilement via MTN Mobile Money, Orange Money ou carte bancaire.',
    },
    {
      q: 'Les clients ont-ils besoin d’un compte pour acheter ?',
      a: 'Non. Les acheteurs parcourent votre vitrine librement et vous contactent en un clic sur votre WhatsApp.',
    },
  ];

  return (
    <div className="space-y-12 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="orange" size="md" className="mx-auto">
          <Zap className="w-3.5 h-3.5" />
          <span>Abonnements Commerçants Mervason</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Une formule adaptée à chaque étape de votre commerce
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Commencez gratuitement, présentez vos produits à des milliers de clients à Yaoundé et Douala, et évoluez selon vos besoins.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isPopular = plan.isPopular;

          return (
            <Card
              key={plan.id}
              variant={isPopular ? 'flat' : 'bordered'}
              className={`relative p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 ${
                isPopular
                  ? 'border-2 border-orange-500 shadow-xl shadow-orange-500/10 ring-1 ring-orange-500/20'
                  : ''
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Recommandé</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 min-h-[32px]">
                    {plan.tagline}
                  </p>
                </div>

                <div className="pt-2 pb-4 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                      {plan.priceMonthlyXAF.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-sm font-bold text-slate-500 dark:text-zinc-400">
                      FCFA / mois
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Inclus dans ce forfait :
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-zinc-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-snug">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800">
                {userProfile ? (
                  <Button
                    variant={isPopular ? 'orange' : 'outline'}
                    size="md"
                    onClick={onGoToDashboard}
                    className="w-full font-bold shadow-xs"
                  >
                    <span>Gérer ma boutique</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant={isPopular ? 'orange' : 'outline'}
                    size="md"
                    onClick={() => onOpenAuth('signup')}
                    className="w-full font-bold shadow-xs"
                  >
                    <span>Choisir la formule {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <GlassCard intensity="medium" className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
          <HelpCircle className="w-5 h-5 text-orange-500" />
          <span>Foire aux questions (FAQ)</span>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-orange-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed border-t border-slate-100 dark:border-zinc-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};
