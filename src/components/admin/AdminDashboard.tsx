import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  Store as StoreIcon,
  Package,
  CreditCard,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Trash2,
  Lock,
  Search,
} from 'lucide-react';
import { Store, Product, Category, UserProfile } from '../../types';
import {
  getAllStores,
  getAllProducts,
  updateStore,
  updateProduct,
  deleteProduct,
} from '../../lib/firebase/services';
import { Card } from '../ui/Card';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shops' | 'products' | 'users'>('shops');
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      const strList = await getAllStores();
      setStores(strList);
      const prdList = await getAllProducts();
      setProducts(prdList);
      setLoading(false);
    }
    loadAdminData();
  }, []);

  const handleToggleStoreStatus = async (store: Store) => {
    const newStatus = store.status === 'active' ? 'suspended' : 'active';
    await updateStore(store.id, { status: newStatus });
    setStores((prev) =>
      prev.map((s) => (s.id === store.id ? { ...s, status: newStatus } : s))
    );
  };

  const handleToggleStoreVerified = async (store: Store) => {
    const newVerified = !store.isVerified;
    await updateStore(store.id, { isVerified: newVerified });
    setStores((prev) =>
      prev.map((s) => (s.id === store.id ? { ...s, isVerified: newVerified } : s))
    );
  };

  const handleModerateProduct = async (product: Product) => {
    const updatedStatus = !product.isPublished;
    await updateProduct(product.id, { isPublished: updatedStatus });
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, isPublished: updatedStatus } : p))
    );
  };

  const handleDeleteProductAdmin = async (productId: string) => {
    if (window.confirm("Modération : Supprimer définitivement ce produit de la plateforme ?")) {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const filteredStores = stores.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-slate-500 dark:text-zinc-400">Chargement de la Console d'Administration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Console Administrateur Mervason
            </h1>
            <Badge variant="purple">Accès Privilégié</Badge>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            Modération du contenu, gestion des boutiques et surveillance globale de la plateforme.
          </p>
        </div>

        {/* Global Admin Metrics */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-200 border border-slate-200/60 dark:border-zinc-700/60">
            Total Boutiques : <span className="text-orange-500 font-bold">{stores.length}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-200 border border-slate-200/60 dark:border-zinc-700/60">
            Total Produits : <span className="text-orange-500 font-bold">{products.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-zinc-800 space-x-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('shops')}
          className={`pb-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'shops'
              ? 'border-orange-500 text-orange-600 dark:text-orange-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <StoreIcon className="w-4 h-4" />
          <span>Boutiques & Commerçants ({stores.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'products'
              ? 'border-orange-500 text-orange-600 dark:text-orange-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Modération Produits ({products.length})</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher boutique, ville ou produit..."
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        />
      </div>

      {/* TAB 1: SHOPS MODERATION */}
      {activeTab === 'shops' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStores.map((s) => (
              <Card key={s.id} variant="bordered" className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 overflow-hidden shrink-0">
                      <img
                        src={s.logoUrl}
                        alt={s.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=200&auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{s.name}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                        Ville : <span className="font-semibold">{s.city}</span> • WhatsApp : +{s.whatsappNumber}
                      </p>
                    </div>
                  </div>

                  <Badge variant={s.status === 'active' ? 'emerald' : 'red'} size="sm">
                    {s.status === 'active' ? 'Active' : 'Suspendue'}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2">
                  {s.description || 'Pas de description renseignée.'}
                </p>

                {/* Moderation Controls */}
                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleStoreVerified(s)}
                    className="text-xs font-semibold flex items-center gap-1.5 text-slate-600 dark:text-zinc-400 hover:text-orange-600"
                  >
                    <ShieldCheck className={`w-4 h-4 ${s.isVerified ? 'text-emerald-500' : 'text-slate-300'}`} />
                    <span>{s.isVerified ? 'Badge Vérifié (Actif)' : 'Attribuer le badge'}</span>
                  </button>

                  <Button
                    variant={s.status === 'active' ? 'outline' : 'orange'}
                    size="sm"
                    onClick={() => handleToggleStoreStatus(s)}
                  >
                    {s.status === 'active' ? (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-red-500" />
                        <span>Suspendre Boutique</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Réactiver</span>
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MODERATION */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((p) => (
              <Card key={p.id} variant="bordered" className="p-4 space-y-3">
                <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-950 relative">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={p.isPublished ? 'emerald' : 'slate'} size="sm">
                      {p.isPublished ? 'Public' : 'Masqué'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs line-clamp-1">{p.name}</h4>
                  <div className="text-sm font-extrabold text-orange-600 dark:text-orange-400">
                    {p.price.toLocaleString('fr-FR')} FCFA
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                  <button
                    onClick={() => handleModerateProduct(p)}
                    className="text-xs text-slate-600 dark:text-zinc-400 hover:text-slate-900 flex items-center gap-1"
                  >
                    {p.isPublished ? <EyeOff className="w-3.5 h-3.5 text-slate-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-500" />}
                    <span>{p.isPublished ? 'Masquer' : 'Rendre Visible'}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteProductAdmin(p.id)}
                    className="p-1 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                    title="Supprimer la fiche produit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
