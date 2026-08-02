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
          Phase 1 : Plateforme Cœur & Gestion Commerçants Implémentée
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Socle Technique & Systèmes Opérationnels Mervason
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed">
          Application développée conformément aux spécifications fonctionnelles (<code className="text-xs bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-slate-800 dark:text-zinc-200">Mervason Project Specifications.md</code>) et aux standards de développement (<code className="text-xs bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-slate-800 dark:text-zinc-200">Google AI Studio Instructions.md</code>).
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

      {/* Phase 1 Features Activated Checklist */}
      <GlassCard intensity="heavy" className="border-emerald-200/60 dark:border-emerald-950 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-4">
        <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-semibold text-base">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Modules Fonctionnels Phase 1 : Core Platform Actifs</span>
        </div>
        <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
          Toutes les exigences de la Phase 1 sont opérationnelles et intégrées avec la base de données Firebase / Firestore :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800 dark:text-zinc-200">
          <div className="flex items-center gap-2 bg-white/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-emerald-200/50 dark:border-emerald-900/50">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Auth & Inscription Commerçant / Client / Admin</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-emerald-200/50 dark:border-emerald-900/50">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Gestion des Boutiques, Logos, Numéros WhatsApp & Villes</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-emerald-200/50 dark:border-emerald-900/50">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Catalogue Produit CRUD, Filtres, Publication & Statuts</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-emerald-200/50 dark:border-emerald-900/50">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Génération du Clic WhatsApp Pré-rempli (0 FCFA)</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-emerald-200/50 dark:border-emerald-900/50">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Console Admin & Modération (Boutiques, Produits, Badge)</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-emerald-200/50 dark:border-emerald-900/50">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Contraintes de Forfait (Plan Gratuit: 1 Boutique / 10 Produits)</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
