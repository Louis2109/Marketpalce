import React, { useState, useEffect, useMemo } from 'react';
import {
  Store as StoreIcon,
  ShieldCheck,
  MapPin,
  MessageSquare,
  ArrowLeft,
  Search,
  Package,
  Share2,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { ProductCard } from '../marketplace/ProductCard';
import { ProductDetailModal } from '../marketplace/ProductDetailModal';
import { WhatsAppOrderModal } from '../marketplace/WhatsAppOrderModal';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Store, Product, Category } from '../../types';
import { getStoresByOwner, getAllStores, getProductsByStore, getCategories } from '../../lib/firebase/services';
import { updatePageMetadata } from '../../lib/seo';

interface PublicShopViewProps {
  storeId: string;
  onBack: () => void;
}

export const PublicShopView: React.FC<PublicShopViewProps> = ({ storeId, onBack }) => {
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    async function loadShopData() {
      setIsLoading(true);
      try {
        const [allStores, cData] = await Promise.all([getAllStores(), getCategories()]);
        const foundStore = allStores.find((s) => s.id === storeId || s.slug === storeId) || null;
        setStore(foundStore);
        setCategories(cData);

        if (foundStore) {
          updatePageMetadata({
            title: `${foundStore.name} (${foundStore.city}) | Vitrine Mervason`,
            description: foundStore.description,
            image: foundStore.logoUrl,
          });

          const pData = await getProductsByStore(foundStore.id);
          setProducts(pData.filter((p) => p.isPublished));
        }
      } catch (err) {
        console.error('Error loading shop view:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadShopData();
  }, [storeId]);

  const categoryMap = useMemo(() => {
    const map = new Map<string, Category>();
    categories.forEach((c) => map.set(c.id, c));
    return map;
  }, [categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      return (
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [products, searchQuery]);

  const handleShareShop = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (isLoading) {
    return (
      <div className="py-12 space-y-6 max-w-4xl mx-auto">
        <div className="h-48 rounded-3xl bg-slate-200/60 dark:bg-zinc-800/60 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-200/60 dark:bg-zinc-800/60 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="py-12 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Boutique introuvable</h2>
        <p className="text-xs text-slate-500">Cette boutique n'existe plus ou a été désactivée.</p>
        <Button variant="orange" size="sm" onClick={onBack}>
          Retour au catalogue
        </Button>
      </div>
    );
  }

  const cleanPhone = store.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="space-y-8 py-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour au catalogue général</span>
      </button>

      {/* Store Header Card */}
      <Card variant="flat" className="p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4 sm:gap-6">
            {store.logoUrl ? (
              <img
                src={store.logoUrl}
                alt={store.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-slate-200 dark:border-zinc-700 shadow-md shrink-0"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-orange-500 text-white font-black flex items-center justify-center text-3xl shadow-md shrink-0">
                {store.name.charAt(0)}
              </div>
            )}

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {store.name}
                </h1>
                {store.isVerified && (
                  <Badge variant="emerald" size="sm" className="gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Boutique Vérifiée</span>
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-zinc-400 font-medium">
                <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{store.city}</span>
                </span>
                {store.address && <span>• {store.address}</span>}
                <span className="flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" />
                  <span>{products.length} produit(s) en rayon</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                {store.description || 'Bienvenue dans notre boutique officielle sur Mervason.'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap md:flex-col items-center gap-2 shrink-0">
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                `Bonjour ${store.name}, je visite votre boutique sur Mervason.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contacter sur WhatsApp</span>
            </a>

            <button
              onClick={handleShareShop}
              className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600">Lien copié !</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Partager la boutique</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Card>

      {/* Products in Store Header & Search */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Catalogue de la boutique ({filteredProducts.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Cliquez sur un article pour voir la fiche ou commander directement via WhatsApp.
            </p>
          </div>

          {/* Search inside shop */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Chercher dans cette boutique..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                store={store}
                category={categoryMap.get(product.categoryId)}
                onSelectProduct={(p) => {
                  setSelectedProduct(p);
                  setIsDetailOpen(true);
                }}
                onOpenWhatsAppOrder={(p) => {
                  setOrderProduct(p);
                  setIsOrderModalOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800 text-slate-500 text-xs">
            Aucun produit disponible pour cette recherche dans cette boutique.
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
        store={store}
        category={selectedProduct ? categoryMap.get(selectedProduct.categoryId) : undefined}
        onOpenWhatsAppOrder={(p) => {
          setIsDetailOpen(false);
          setOrderProduct(p);
          setIsOrderModalOpen(true);
        }}
      />

      {/* WhatsApp Order Modal */}
      <WhatsAppOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={orderProduct}
        store={store}
      />
    </div>
  );
};
