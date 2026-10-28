import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Tag,
  SlidersHorizontal,
  X,
  Store as StoreIcon,
  Sparkles,
  RefreshCw,
  ShoppingBag,
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { WhatsAppOrderModal } from './WhatsAppOrderModal';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Product, Store, Category, OperatingCity } from '../../types';
import { getAllProducts, getAllStores, getCategories } from '../../lib/firebase/services';
import { updatePageMetadata } from '../../lib/seo';

interface MarketplaceViewProps {
  initialCategory?: string | null;
  initialQuery?: string;
  onSelectShop: (storeId: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  initialCategory,
  initialQuery = '',
  onSelectShop,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState<'Tous' | 'Yaoundé' | 'Douala'>('Tous');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [sortBy, setSortBy] = useState<'recent' | 'price_asc' | 'price_desc'>('recent');

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [orderStore, setOrderStore] = useState<Store | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    updatePageMetadata({
      title: 'Catalogue & Produits du Cameroun | Mervason',
      description: 'Trouvez des articles vendus par des commerçants vérifiés à Yaoundé et Douala.',
    });

    async function loadMarketplaceData() {
      setIsLoading(true);
      try {
        const [pData, sData, cData] = await Promise.all([
          getAllProducts(),
          getAllStores(),
          getCategories(),
        ]);
        // Only keep published products
        setProducts(pData.filter((p) => p.isPublished));
        setStores(sData);
        setCategories(cData);
      } catch (err) {
        console.error('Error loading marketplace data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadMarketplaceData();
  }, []);

  // Update query state if props change
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialQuery) setSearchQuery(initialQuery);
  }, [initialCategory, initialQuery]);

  // Create store lookup map for quick access
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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const store = storeMap.get(product.storeId);

        // Search match (name, description, store name)
        const matchesQuery =
          !searchQuery.trim() ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (store && store.name.toLowerCase().includes(searchQuery.toLowerCase()));

        // City match
        const matchesCity =
          selectedCity === 'Tous' || (store && store.city === selectedCity);

        // Category match
        const matchesCategory =
          selectedCategory === 'all' || product.categoryId === selectedCategory;

        return matchesQuery && matchesCity && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        // default recent
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, storeMap, searchQuery, selectedCity, selectedCategory, sortBy]);

  const handleOpenOrder = (product: Product, store?: Store) => {
    const matchedStore = store || storeMap.get(product.storeId) || null;
    setOrderProduct(product);
    setOrderStore(matchedStore);
    setIsOrderModalOpen(true);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCity('Tous');
    setSelectedCategory('all');
    setSortBy('recent');
  };

  return (
    <div className="space-y-8 py-4">
      {/* Search Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Catalogue des produits
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              {filteredProducts.length} article(s) répertorié(s) à Yaoundé et Douala.
            </p>
          </div>

          {/* Quick city tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-2xl border border-slate-200/60 dark:border-zinc-700/60 self-start md:self-auto">
            {(['Tous', 'Yaoundé', 'Douala'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCity === city
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit, un tissu, un téléphone, une boutique..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                <option value="all">Toutes les catégories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'price_asc' | 'price_desc')}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                <option value="recent">Plus récents d’abord</option>
                <option value="price_asc">Prix : du - cher au + cher</option>
                <option value="price_desc">Prix : du + cher au - cher</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {(searchQuery || selectedCity !== 'Tous' || selectedCategory !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800 text-xs">
              <span className="text-slate-400 font-medium">Filtres actifs :</span>
              {searchQuery && (
                <Badge variant="orange" size="sm" className="gap-1">
                  <span>Mot : "{searchQuery}"</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </Badge>
              )}
              {selectedCity !== 'Tous' && (
                <Badge variant="orange" size="sm" className="gap-1">
                  <span>Ville : {selectedCity}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCity('Tous')} />
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="orange" size="sm" className="gap-1">
                  <span>Catégorie : {categoryMap.get(selectedCategory)?.name || selectedCategory}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                </Badge>
              )}

              <button
                onClick={resetFilters}
                className="text-xs text-orange-600 dark:text-orange-400 hover:underline font-bold ml-auto flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Réinitialiser tout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid or Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-72 rounded-2xl bg-slate-200/60 dark:bg-zinc-800/60 animate-pulse p-4 space-y-4"
            >
              <div className="h-40 rounded-xl bg-slate-300/60 dark:bg-zinc-700/60" />
              <div className="h-4 w-3/4 bg-slate-300/60 dark:bg-zinc-700/60 rounded" />
              <div className="h-4 w-1/2 bg-slate-300/60 dark:bg-zinc-700/60 rounded" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const store = storeMap.get(product.storeId);
            const category = categoryMap.get(product.categoryId);

            return (
              <ProductCard
                key={product.id}
                product={product}
                store={store}
                category={category}
                onSelectProduct={(p) => {
                  setSelectedProduct(p);
                  setIsDetailOpen(true);
                }}
                onSelectShop={onSelectShop}
                onOpenWhatsAppOrder={handleOpenOrder}
              />
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <GlassCard intensity="light" className="p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto font-bold">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Aucun produit trouvé
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Aucun résultat ne correspond à vos critères de recherche actuels.
            </p>
          </div>
          <Button variant="orange" size="sm" onClick={resetFilters} className="mx-auto font-bold">
            Effacer tous les filtres
          </Button>
        </GlassCard>
      )}

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
