import React from 'react';
import {
  CheckCircle2,
  Database,
  Layers,
  ShieldAlert,
  CreditCard,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Code2,
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SUBSCRIPTION_PLANS, INITIAL_CATEGORIES } from '../../config/site';

export const FoundationStatus: React.FC = () => {
  return (
    <div className="space-y-10 py-6">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="emerald" size="md" className="mx-auto">
          Phase 0 : Fondations Techniques Initialisées
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Socle Technique & Architecture Mervason
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Application préparée conformément aux spécifications fonctionnelles (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">Project-Specifications.md</code>) et aux standards de développement (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">AI-Instructions.md</code>).
        </p>
      </div>

      {/* Grid of Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card variant="default" className="space-y-3 border-emerald-100 bg-emerald-50/30">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <Badge variant="emerald">Structure Prête</Badge>
          </div>
          <h3 className="font-semibold text-slate-900 text-lg">Firebase & Firestore</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Schéma intermédiaire <code className="text-[11px] bg-slate-100 px-1 rounded">firebase-blueprint.json</code> configuré avec 8 collections (users, stores, products, categories, plans, subscriptions, payments, notifications).
          </p>
        </Card>

        <Card variant="default" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <Badge variant="slate">Design System Apple</Badge>
          </div>
          <h3 className="font-semibold text-slate-900 text-lg">Système Visuel Épuré</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tailwind CSS, typographie soignée, composants modulaires (Button, Card, GlassCard, Badge) et effets de verre liquides mesurés sans surcharge visuelle.
          </p>
        </Card>

        <Card variant="default" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <Badge variant="blue">Cibles : Yaoundé & Douala</Badge>
          </div>
          <h3 className="font-semibold text-slate-900 text-lg">Tunnel WhatsApp</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Modèle de conversion directe acheteur-commerçant configuré pour générer un message pré-rempli sans passer par un panier ni une gestion complexe de livraison.
          </p>
        </Card>
      </div>

      {/* Subscription Plans Structure Preview */}
      <GlassCard className="space-y-6 border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900">Spécification des Forfaits d'Abonnement</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Modèle d'abonnements commerçants prêt pour l'intégration des paiements
            </p>
          </div>
          <Badge variant="emerald">Modèle Économique MVP</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-5 rounded-2xl border transition-all ${
                plan.isPopular
                  ? 'border-emerald-500/80 bg-emerald-50/20 shadow-xs'
                  : 'border-slate-200 bg-white/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-lg">{plan.name}</span>
                {plan.isPopular && <Badge variant="emerald">Populaire</Badge>}
              </div>
              <p className="text-xs text-slate-500 min-h-[32px]">{plan.tagline}</p>
              <div className="my-4">
                <span className="text-2xl font-bold text-slate-900">
                  {plan.priceMonthlyXAF === 0
                    ? 'Gratuit'
                    : `${plan.priceMonthlyXAF.toLocaleString('fr-FR')} FCFA`}
                </span>
                {plan.priceMonthlyXAF > 0 && (
                  <span className="text-xs text-slate-500"> / mois</span>
                )}
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Initial Product Categories Foundation */}
      <Card variant="bordered" className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-semibold text-slate-900 text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Catégories Initiales Répertoire
          </h3>
          <span className="text-xs text-slate-500">{INITIAL_CATEGORIES.length} catégories initiales</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {INITIAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-1 hover:border-slate-200 transition-all"
            >
              <div className="text-xs font-medium text-slate-800">{cat.name}</div>
              <div className="text-[10px] text-slate-400">/{cat.slug}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Explicitly NOT Implemented Yet Checklist */}
      <GlassCard intensity="heavy" className="border-amber-200/60 bg-amber-50/20 space-y-4">
        <div className="flex items-center gap-2 text-amber-900 font-semibold text-base">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <span>Liaisons Fonctionnelles Intentionnellement Non Implémentées à ce Stade</span>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          Conformément aux consignes de la Phase 0 de cadrage et d’initialisation, la fondation technique est posée. Les modules fonctionnels suivants seront activés étape par étape dans les prochaines phases :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-900/80">
          <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-amber-200/40">
            <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Auth & Inscription Commerçant (Phase 1.3)</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-amber-200/40">
            <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Gestion des Boutiques & Logos (Phase 1.4)</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-amber-200/40">
            <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Catalogue Produits & Images (Phase 1.5)</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-amber-200/40">
            <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Génération du Clic WhatsApp Pré-rempli (Phase 1.6)</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-amber-200/40">
            <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Paiement Mobile Money (MTN / Orange) (Phase 1.8)</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-amber-200/40">
            <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Dashboard d'Administration Platforme (Phase 1.7)</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
