import { Category, SubscriptionPlan } from '../types';

export const SITE_CONFIG = {
  name: 'Mervason',
  tagline: 'Vitrine et boutiques en ligne pour commerçants au Cameroun',
  description:
    'Créez votre boutique en ligne simple, présentez vos produits et recevez des clients directement sur WhatsApp.',
  primaryCurrency: 'XAF',
  currencySymbol: 'FCFA',
  targetCities: ['Yaoundé', 'Douala'] as const,
  language: 'FR',
  contactSupport: 'contact@mervason.cm',
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-mode', name: 'Mode & Habillement', slug: 'mode-habillement', iconName: 'Shirt', order: 1 },
  { id: 'cat-beaute', name: 'Beauté & Cosmétique', slug: 'beaute-cosmetique', iconName: 'Sparkles', order: 2 },
  { id: 'cat-high-tech', name: 'Électronique & High-Tech', slug: 'electronique-high-tech', iconName: 'Smartphone', order: 3 },
  { id: 'cat-maison', name: 'Maison & Décoration', slug: 'maison-decoration', iconName: 'Home', order: 4 },
  { id: 'cat-agro', name: 'Alimentation & Produits Locaux', slug: 'alimentation-produits-locaux', iconName: 'Apple', order: 5 },
  { id: 'cat-artisanat', name: 'Artisanat & Culture', slug: 'artisanat-culture', iconName: 'Palette', order: 6 },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Gratuit',
    tagline: 'Pour démarrer sa présence en ligne gratuitement',
    priceMonthlyXAF: 0,
    maxStores: 1,
    maxProductsPerStore: 10,
    features: [
      '1 boutique en ligne offerte',
      'Jusqu’à 10 produits publiés',
      'Lien WhatsApp direct avec message pré-rempli',
      'URL publique dédiée',
      'Visibilité de base sur la plateforme',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'Idéal pour les commerçants en croissance',
    priceMonthlyXAF: 5000,
    maxStores: 1,
    maxProductsPerStore: 50,
    isPopular: true,
    features: [
      '1 boutique professionnelle',
      'Jusqu’à 50 produits publiés',
      'Badge de boutique vérifiée',
      'Statistiques de visites et d’interactions',
      'Mise en avant prioritaire dans les recherches',
      'Support client prioritaire',
    ],
  },
  {
    id: 'pro',
    name: 'Professionnel',
    tagline: 'Pour les réseaux de boutiques et gros catalogues',
    priceMonthlyXAF: 12000,
    maxStores: 3,
    maxProductsPerStore: 200,
    features: [
      'Jusqu’à 3 boutiques distinctes',
      'Jusqu’à 200 produits par boutique',
      'Badges certifiés et personnalisation visuelle',
      'Statistiques avancées des ventes WhatsApp',
      'Priorité maximale d’affichage sur Yaoundé & Douala',
      'Support téléphonique direct 7j/7',
    ],
  },
];
