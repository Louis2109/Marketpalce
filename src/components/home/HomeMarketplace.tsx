import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Store as StoreIcon,
  MapPin,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { ProductCard } from '../marketplace/ProductCard';
import { ProductDetailModal } from '../marketplace/ProductDetailModal';
import { WhatsAppOrderModal } from '../marketplace/WhatsAppOrderModal';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Product, Store, Category } from '../../types';
import { getAllProducts, getAllStores, getCategories } from '../../lib/firebase/services';
import { updatePageMetadata } from '../../lib/seo';
import { useAuth } from '../../context/AuthContext';

interface HomeMarketplaceProps {
  onGoToMarketplace: (query?: string, categoryId?: string) => void;
  onSelectShop: (storeId: string) => void;
  onGoToPricing?: () => void;
  onGoToDashboard: () => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const HomeMarketplace: React.FC<HomeMarketplaceProps> = ({
  onGoToMarketplace,
  onSelectShop,
  onGoToDashboard,
  onOpenAuth,
}) => {
  const { userProfile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState<'Tous' | 'Yaoundé' | 'Douala'>('Tous');

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [orderStore, setOrderStore] = useState<Store | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    updatePageMetadata({
      title: 'Mervason — Marketplace locale au Cameroun (Yaoundé & Douala)',
      description: 'Découvrez les boutiques et produits de proximité à Yaoundé et Douala. Commandez directement auprès des commerçants sur WhatsApp.',
    });

    async function loadData() {
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
        console.error('Erreur chargement données accueil:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
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
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const store = storeMap.get(p.storeId);
        if (cityFilter !== 'Tous' && store) {
          return store.city === cityFilter;
        }
        return true;
      })
      .slice(0, 8);
  }, [products, storeMap, cityFilter]);

  // Featured shops filtered by city
  const filteredStores = useMemo(() => {
    return stores
      .filter((s) => cityFilter === 'Tous' || s.city === cityFilter)
      .slice(0, 4);
  }, [stores, cityFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onGoToMarketplace(searchQuery.trim());
    } else {
      onGoToMarketplace();
    }
  };

  const handleMerchantCTA = () => {
    if (userProfile) {
      onGoToDashboard();
    } else if (onOpenAuth) {
      onOpenAuth('signup');
    } else {
      onGoToDashboard();
    }
  };

  const handleOpenDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleOpenOrder = (product: Product, store?: Store) => {
    const matchedStore = store || storeMap.get(product.storeId) || null;
    setOrderProduct(product);
    setOrderStore(matchedStore);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="space-y-16 py-4">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-8 sm:p-12 md:p-16 transition-colors">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>Marketplace Cameroun • Yaoundé & Douala</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Découvrez les boutiques et produits près de chez vous.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Explorez les boutiques de Yaoundé et Douala, découvrez leurs produits et contactez directement les commerçants sur WhatsApp.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-slate-400 dark:text-zinc-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher un produit, une marque, une boutique..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-28 py-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Rechercher
              </button>
            </div>
          </form>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="orange"
              size="md"
              onClick={() => onGoToMarketplace()}
              className="font-semibold text-xs sm:text-sm px-5 py-2.5"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Explorer le catalogue
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={handleMerchantCTA}
              className="font-medium text-xs sm:text-sm px-5 py-2.5"
            >
              <StoreIcon className="w-4 h-4 mr-2 text-orange-500" />
              Créer ma boutique
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRODUCT DISCOVERY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sélection de produits
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Produits disponibles immédiatement auprès de commerçants locaux
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* City Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-900 p-1 rounded-xl border border-slate-200/80 dark:border-zinc-800">
              {(['Tous', 'Yaoundé', 'Douala'] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => setCityFilter(city)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    cityFilter === city
                      ? 'bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-xs'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onGoToMarketplace()}
              className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700"
            >
              <span>Voir tout</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-72 rounded-2xl bg-slate-100 dark:bg-zinc-900 animate-pulse border border-slate-200/60 dark:border-zinc-800"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200/70 dark:border-zinc-800">
            <ShoppingBag className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
              Aucun produit disponible pour cette sélection
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              Explorez l'ensemble du catalogue ou revenez un peu plus tard.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCityFilter('Tous');
                onGoToMarketplace();
              }}
              className="mt-4 text-xs"
            >
              Voir tous les produits
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                store={storeMap.get(product.storeId)}
                category={categoryMap.get(product.categoryId)}
                onSelectProduct={handleOpenDetail}
                onSelectShop={onSelectShop}
                onOpenWhatsAppOrder={handleOpenOrder}
              />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 3: CATEGORIES */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Catégories de produits
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Parcourez le catalogue selon vos besoins
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onGoToMarketplace()}
            className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
          >
            <span>Toutes les catégories</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onGoToMarketplace(undefined, cat.id)}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:bg-orange-50/20 dark:hover:bg-orange-950/20 text-left transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5 truncate">
                {cat.description || 'Découvrir'}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 4: FEATURED SHOPS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Boutiques locales
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Des commerçants vérifiés prêts à vous servir à Yaoundé et Douala
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-44 rounded-2xl bg-slate-100 dark:bg-zinc-900 animate-pulse border border-slate-200/60 dark:border-zinc-800"
              />
            ))}
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200/70 dark:border-zinc-800">
            <StoreIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Aucune boutique répertoriée dans cette zone pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                onClick={() => onSelectShop(store.id)}
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-zinc-800 border border-orange-200/50 dark:border-zinc-700 flex items-center justify-center font-bold text-orange-600 dark:text-orange-400 text-sm overflow-hidden shrink-0">
                      {store.logoUrl ? (
                        <img
                          src={store.logoUrl}
                          alt={store.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        store.name.substring(0, 2).toUpperCase()
                      )}
                    </div>
                    {store.isVerified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" />
                        Vérifiée
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate">
                      {store.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{store.city}</span>
                    </p>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                      {store.description || 'Boutique en ligne sur Mervason.'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 mt-4 flex items-center justify-between text-xs font-semibold text-orange-600 dark:text-orange-400">
                  <span>Visiter la boutique</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 5: MERCHANT CTA */}
      <section className="rounded-3xl bg-slate-900 text-white dark:bg-zinc-900 dark:border dark:border-zinc-800 p-8 sm:p-12 md:p-14 relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-orange-400">
            <StoreIcon className="w-3.5 h-3.5" />
            <span>Espace Commerçants</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Donnez plus de visibilité à votre boutique.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 dark:text-zinc-400 leading-relaxed">
            Créez votre boutique en ligne, présentez vos produits et recevez directement les demandes de vos clients sur WhatsApp.
          </p>

          <div className="pt-2">
            <Button
              variant="orange"
              size="md"
              onClick={handleMerchantCTA}
              className="font-bold text-xs sm:text-sm px-6 py-3 cursor-pointer"
            >
              Créer ma boutique
            </Button>
          </div>
        </div>
      </section>

      {/* Modals for Product Detail and WhatsApp ordering */}
      <ProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
        store={selectedProduct ? storeMap.get(selectedProduct.storeId) || null : null}
        category={selectedProduct ? categoryMap.get(selectedProduct.categoryId) : undefined}
        onSelectShop={onSelectShop}
        onOpenWhatsAppOrder={(p, s) => {
          setIsDetailOpen(false);
          handleOpenOrder(p, s);
        }}
      />

      <WhatsAppOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={orderProduct}
        store={orderStore}
      />
    </div>
  );
};
