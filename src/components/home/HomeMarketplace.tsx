import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Store as StoreIcon,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Package,
  ShoppingBag,
  Zap,
  CheckCircle2,
  ChevronRight,
  Shirt,
  Smartphone,
  Home as HomeIcon,
  Apple,
} from 'lucide-react';
import { ProductCard } from '../marketplace/ProductCard';
import { ProductDetailModal } from '../marketplace/ProductDetailModal';
import { WhatsAppOrderModal } from '../marketplace/WhatsAppOrderModal';
import { Card } from '../ui/Card';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Product, Store, Category } from '../../types';
import { getAllProducts, getAllStores, getCategories } from '../../lib/firebase/services';
import { updatePageMetadata } from '../../lib/seo';

interface HomeMarketplaceProps {
  onGoToMarketplace: (query?: string, categoryId?: string) => void;
  onSelectShop: (storeId: string) => void;
  onGoToPricing: () => void;
  onGoToDashboard: () => void;
}

export const HomeMarketplace: React.FC<HomeMarketplaceProps> = ({
  onGoToMarketplace,
  onSelectShop,
  onGoToPricing,
  onGoToDashboard,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroSearch, setHeroSearch] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState<'Tous' | 'Yaoundé' | 'Douala'>('Tous');

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [orderStore, setOrderStore] = useState<Store | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    updatePageMetadata({
      title: 'Mervason - Plateforme Vitrines & Boutiques en Ligne au Cameroun',
      description: 'Découvrez des produits locaux à Yaoundé et Douala. Achetez directement sur WhatsApp auprès de commerçants certifiés.',
    });

    async function loadHomeData() {
      setIsLoading(true);
      try {
        const [pData, sData, cData] = await Promise.all([
          getAllProducts(),
          getAllStores(),
          getCategories(),
        ]);
        setProducts(pData.filter((p) => p.isPublished));
        setStores(sData.filter((s) => s.status === 'active'));
        setCategories(cData);
      } catch (err) {
        console.error('Error loading home marketplace data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadHomeData();
  }, []);

  const storeMap = useMemo(() => {
    const map = new Map<string, Store>();
    stores.forEach((s) => map.set(s.id, s));
    return map;
  }, [stores]);

  const categoryMap = useMemo(() => {
    const map = new Map<string, Category>();
    categories.forEach((c) => map.set(c.id, c));
    return map;
  }, [categories]);

  // Featured products filtered by city
  const featuredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const store = storeMap.get(p.storeId);
        if (selectedCityFilter !== 'Tous' && store) {
          return store.city === selectedCityFilter;
        }
        return true;
      })
      .slice(0, 8);
  }, [products, storeMap, selectedCityFilter]);

  const featuredStores = useMemo(() => {
    return stores
      .filter((s) => selectedCityFilter === 'Tous' || s.city === selectedCityFilter)
      .slice(0, 3);
  }, [stores, selectedCityFilter]);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onGoToMarketplace(heroSearch.trim());
    }
  };

  const handleOpenOrder = (product: Product, store?: Store) => {
    const matchedStore = store || storeMap.get(product.storeId) || null;
    setOrderProduct(product);
    setOrderStore(matchedStore);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="space-y-12 py-4">
      {/* Hero Banner with Search */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 via-amber-600 to-orange-700 text-white p-6 sm:p-10 md:p-12 shadow-xl shadow-orange-500/10 space-y-6">
        <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Marketplace & Vitrines du Cameroun</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Trouvez les meilleurs produits vendus à Yaoundé et Douala.
          </h1>

          <p className="text-xs sm:text-base text-orange-100 leading-relaxed font-medium max-w-2xl">
            Découvrez les offres des commerçants locaux, consultez leurs boutiques virtuelles et achetez directement sur WhatsApp en toute simplicité.
          </p>

          {/* Search bar inside hero */}
          <form onSubmit={handleHeroSearchSubmit} className="pt-2 max-w-2xl">
            <div className="p-2 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl flex flex-col sm:flex-row items-center gap-2 border border-orange-200/40">
              <div className="relative flex-1 w-full flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Ex: Robe en pagne, iPhone, Chaussures, Sac en cuir..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white bg-transparent focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                variant="orange"
                size="md"
                className="w-full sm:w-auto font-bold shadow-md shrink-0 py-3"
              >
                <span>Rechercher</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </form>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="bordered" className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Produits Locaux en FCFA
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Trouvez les articles disponibles en stock à Yaoundé et Douala au prix direct fixé par le commerçant.
          </p>
        </Card>

        <Card variant="bordered" className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Commande WhatsApp Directe
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Achetez sans création de compte acheteur. Cliquez, générez votre message pré-rempli et discutez directement avec le vendeur.
          </p>
        </Card>

        <Card variant="bordered" className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Boutiques Certifiées
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Consultez les vitrines en ligne des commerçants vérifiés, leurs coordonnées précises et leur catalogue complet.
          </p>
        </Card>
      </div>

      {/* Top Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Catégories Principales
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Explorez nos catégories phares pour affiner votre recherche.
            </p>
          </div>

          <button
            onClick={() => onGoToMarketplace()}
            className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
          >
            <span>Tout le catalogue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onGoToMarketplace(undefined, cat.id)}
              className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 hover:border-orange-500/50 hover:shadow-md transition-all text-left space-y-2 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 dark:text-white text-xs truncate group-hover:text-orange-600 dark:group-hover:text-orange-400">
                {cat.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Derniers articles mis en rayon
              </h2>
              <Badge variant="orange" size="sm">Récents</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Achetez en direct auprès des commerçants de Yaoundé et Douala.
            </p>
          </div>

          {/* City filter tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl">
            {(['Tous', 'Yaoundé', 'Douala'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCityFilter(city)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCityFilter === city
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 rounded-2xl bg-slate-200/60 dark:bg-zinc-800/60 animate-pulse" />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                store={storeMap.get(product.storeId)}
                category={categoryMap.get(product.categoryId)}
                onSelectProduct={(p) => {
                  setSelectedProduct(p);
                  setIsDetailOpen(true);
                }}
                onSelectShop={onSelectShop}
                onOpenWhatsAppOrder={handleOpenOrder}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-zinc-900 text-slate-500 text-xs">
            Aucun produit disponible pour cette ville actuellement.
          </div>
        )}

        <div className="text-center pt-2">
          <Button variant="outline" size="md" onClick={() => onGoToMarketplace()} className="font-bold">
            <span>Voir tous les articles ({products.length})</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Featured Stores Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Boutiques Recommandées
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Vitrines en ligne créées par des commerçants certifiés.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStores.map((s) => (
            <GlassCard key={s.id} hoverEffect className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {s.logoUrl ? (
                      <img
                        src={s.logoUrl}
                        alt={s.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-zinc-700"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-orange-500 text-white font-bold flex items-center justify-center text-lg">
                        {s.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">{s.name}</h3>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-zinc-400">
                        <MapPin className="w-3 h-3 text-orange-500" />
                        <span>{s.city}</span>
                      </div>
                    </div>
                  </div>
                  {s.isVerified && <Badge variant="emerald" size="sm">Vérifiée</Badge>}
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-300 line-clamp-2">
                  {s.description || 'Boutique en ligne officielle sur Mervason.'}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectShop(s.id)}
                className="w-full text-xs font-bold"
              >
                <span>Visiter la vitrine</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Merchant CTA Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white space-y-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <Badge variant="orange" size="sm">
            Espace Commerçant
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Vous êtes commerçant à Yaoundé ou Douala ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ouvrez votre boutique en ligne Mervason en 2 minutes. Publiez vos produits, définissez vos prix en FCFA et recevez vos clients directement sur WhatsApp.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button variant="orange" size="md" onClick={onGoToDashboard} className="font-bold shadow-md">
              <StoreIcon className="w-4 h-4 mr-1" />
              <span>Créer ma boutique gratuite</span>
            </Button>
            <Button variant="ghost" size="md" onClick={onGoToPricing} className="text-white hover:bg-white/10 text-xs">
              <span>Voir les forfaits & limites</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
        store={selectedProduct ? storeMap.get(selectedProduct.storeId) || null : null}
        category={selectedProduct ? categoryMap.get(selectedProduct.categoryId) : undefined}
        onSelectShop={onSelectShop}
        onOpenWhatsAppOrder={(p, s) => {
          setIsDetailOpen(false);
          setOrderProduct(p);
          setOrderStore(s);
          setIsOrderModalOpen(true);
        }}
      />

      {/* WhatsApp Order Modal */}
      <WhatsAppOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={orderProduct}
        store={orderStore}
      />
    </div>
  );
};
