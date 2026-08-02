import React, { useState, useEffect } from 'react';
import {
  Store as StoreIcon,
  Package,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Smartphone,
  MapPin,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  CreditCard,
  Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Store, Product, Category, SubscriptionPlan } from '../../types';
import {
  getStoresByOwner,
  getProductsByStore,
  createStore,
  updateStore,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getSubscriptionPlans,
} from '../../lib/firebase/services';
import { Card } from '../ui/Card';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProductFormModal } from './ProductFormModal';
import { StoreFormModal } from './StoreFormModal';

export const MerchantDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'store' | 'products' | 'subscription'>('overview');

  // Merchant state
  const [stores, setStores] = useState<Store[]>([]);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Search & Filter
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!userProfile) return;
      setLoading(true);

      const ownerStores = await getStoresByOwner(userProfile.uid);
      setStores(ownerStores);
      const activeStr = ownerStores[0] || null;
      setCurrentStore(activeStr);

      if (activeStr) {
        const strProducts = await getProductsByStore(activeStr.id);
        setProducts(strProducts);
      } else {
        setProducts([]);
      }

      const cats = await getCategories();
      setCategories(cats);

      const plns = await getSubscriptionPlans();
      setPlans(plns);

      setLoading(false);
    }

    loadData();
  }, [userProfile]);

  // Active plan constraints
  const currentPlan = plans.find((p) => p.id === 'free') || plans[0];
  const maxProductsAllowed = currentPlan?.maxProductsPerStore || 10;
  const productsCount = products.length;
  const canAddProduct = productsCount < maxProductsAllowed;

  // Product Actions
  const handleSaveProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (!currentStore) return;

    if (productToEdit) {
      await updateProduct(productToEdit.id, productData);
      setProducts((prev) =>
        prev.map((p) => (p.id === productToEdit.id ? { ...p, ...productData } : p))
      );
    } else {
      const created = await createProduct(productData);
      setProducts((prev) => [created, ...prev]);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit de votre boutique ?')) {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleTogglePublish = async (product: Product) => {
    const updatedStatus = !product.isPublished;
    await updateProduct(product.id, { isPublished: updatedStatus });
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, isPublished: updatedStatus } : p))
    );
  };

  // Store Actions
  const handleCreateStore = async (storeData: Omit<Store, 'id' | 'createdAt'>) => {
    const newStr = await createStore(storeData);
    setStores([newStr]);
    setCurrentStore(newStr);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
    return matchesSearch && matchesCat;
  });

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-slate-500 dark:text-zinc-400">Chargement du Dashboard Commerçant...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Espace Commerçant
            </h1>
            <Badge variant="orange">Plan Gratuit</Badge>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            Bienvenue, <span className="font-semibold text-slate-900 dark:text-white">{userProfile?.displayName}</span> ({userProfile?.city})
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2">
          {currentStore ? (
            <Button
              variant="orange"
              size="sm"
              onClick={() => {
                setProductToEdit(null);
                setIsProductModalOpen(true);
              }}
              disabled={!canAddProduct}
            >
              <Plus className="w-4 h-4" />
              <span>Publier un Produit</span>
            </Button>
          ) : (
            <Button variant="orange" size="sm" onClick={() => setIsStoreModalOpen(true)}>
              <StoreIcon className="w-4 h-4" />
              <span>Activer Ma Boutique</span>
            </Button>
          )}
        </div>
      </div>

      {/* No Store Notice */}
      {!currentStore && (
        <GlassCard intensity="heavy" className="border-orange-200 dark:border-orange-950 bg-orange-50/30 dark:bg-orange-950/20 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold">
              <StoreIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Vous n'avez pas encore configuré votre boutique
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400">
                Créez votre première boutique gratuitement pour publier vos produits et recevoir des messages WhatsApp.
              </p>
            </div>
          </div>
          <Button variant="orange" onClick={() => setIsStoreModalOpen(true)}>
            Créer ma 1ère Boutique Offerte
          </Button>
        </GlassCard>
      )}

      {/* Navigation Tabs */}
      {currentStore && (
        <div className="flex border-b border-slate-200 dark:border-zinc-800 space-x-6 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Gestion Produits</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-[10px]">
              {products.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'store'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Ma Boutique & Infos
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'subscription'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Forfait & Limites
          </button>
        </div>
      )}

      {/* TAB 1: OVERVIEW */}
      {currentStore && activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="default" className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Boutique Active</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white truncate">
                {currentStore.name}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Statut : En Ligne ({currentStore.city})</span>
              </div>
            </Card>

            <Card variant="default" className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Produits Publiés</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {productsCount} <span className="text-xs font-normal text-slate-400">/ {maxProductsAllowed}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-orange-500 h-full transition-all"
                  style={{ width: `${Math.min(100, (productsCount / maxProductsAllowed) * 100)}%` }}
                />
              </div>
            </Card>

            <Card variant="default" className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Contact WhatsApp</span>
              <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                +{currentStore.whatsappNumber}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 pt-1 block">
                Messages pré-remplis activés
              </span>
            </Card>

            <Card variant="default" className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Formule Actuelle</span>
              <div className="text-base font-bold text-orange-600 dark:text-orange-400">
                Plan Gratuit (0 FCFA)
              </div>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 pt-1 block">
                1 Boutique • 10 Produits
              </span>
            </Card>
          </div>

          {/* Store Quick Preview */}
          <GlassCard className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 overflow-hidden shrink-0">
                  <img
                    src={currentStore.logoUrl}
                    alt={currentStore.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=200&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{currentStore.name}</h3>
                    {currentStore.isVerified && <Badge variant="emerald">Vérifiée</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Lien public : <code className="text-orange-600 dark:text-orange-400 font-mono">/store/{currentStore.slug}</code>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('store')}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Modifier la Boutique</span>
                </Button>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              {currentStore.description || 'Aucune description rédigée pour le moment.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-zinc-400 pt-2 border-t border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{currentStore.city} {currentStore.address ? `• ${currentStore.address}` : ''}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp: +{currentStore.whatsappNumber}</span>
              </div>
            </div>
          </GlassCard>

          {/* Product Limit Warning if near limit */}
          {!canAddProduct && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Limite atteinte sur votre Plan Gratuit ({maxProductsAllowed} / {maxProductsAllowed})</div>
                <div className="mt-0.5">
                  Passez au Plan Standard (5 000 FCFA / mois) pour publier jusqu'à 50 produits et obtenir le badge certifié.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {currentStore && activeTab === 'products' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800">
            <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="all">Toutes les catégories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="orange"
              size="sm"
              onClick={() => {
                setProductToEdit(null);
                setIsProductModalOpen(true);
              }}
              disabled={!canAddProduct}
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Produit</span>
            </Button>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <Card variant="flat" className="py-12 text-center space-y-3">
              <Package className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Aucun produit trouvé
              </h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-xs mx-auto">
                {productSearch || selectedCategory !== 'all'
                  ? 'Aucun résultat ne correspond à votre filtre de recherche.'
                  : 'Commencez dès maintenant en publiant votre premier article.'}
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((p) => {
                const cat = categories.find((c) => c.id === p.categoryId);
                return (
                  <Card key={p.id} variant="bordered" className="p-4 space-y-3 relative group">
                    <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-950 relative">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={p.isPublished ? 'emerald' : 'slate'} size="sm">
                          {p.isPublished ? 'Publié' : 'Masqué'}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400">
                        {cat?.name || 'Général'}
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                        {p.name}
                      </h4>
                      <div className="text-base font-extrabold text-slate-900 dark:text-white">
                        {p.price.toLocaleString('fr-FR')} FCFA
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                      >
                        {p.isPublished ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                            <span>Masquer</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Publier</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setProductToEdit(p);
                            setIsProductModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: STORE EDIT */}
      {currentStore && activeTab === 'store' && (
        <Card variant="bordered" className="max-w-2xl space-y-6">
          <div className="border-b border-slate-100 dark:border-zinc-800 pb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Paramètres de la Boutique
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Ces informations apparaissent directement sur votre vitrine publique.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Nom de la boutique
              </label>
              <input
                type="text"
                value={currentStore.name}
                onChange={(e) =>
                  setCurrentStore({ ...currentStore, name: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Ville d'opération
                </label>
                <select
                  value={currentStore.city}
                  onChange={(e) =>
                    setCurrentStore({
                      ...currentStore,
                      city: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white"
                >
                  <option value="Yaoundé">Yaoundé</option>
                  <option value="Douala">Douala</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Numéro WhatsApp
                </label>
                <input
                  type="text"
                  value={currentStore.whatsappNumber}
                  onChange={(e) =>
                    setCurrentStore({ ...currentStore, whatsappNumber: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Adresse physique
              </label>
              <input
                type="text"
                value={currentStore.address || ''}
                onChange={(e) =>
                  setCurrentStore({ ...currentStore, address: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Bio / Présentation
              </label>
              <textarea
                rows={3}
                value={currentStore.description}
                onChange={(e) =>
                  setCurrentStore({ ...currentStore, description: e.target.value })
                }
                className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white resize-none"
              />
            </div>

            <Button
              variant="orange"
              onClick={async () => {
                await updateStore(currentStore.id, currentStore);
                alert('Informations de la boutique mises à jour avec succès !');
              }}
            >
              Enregistrer les modifications
            </Button>
          </div>
        </Card>
      )}

      {/* TAB 4: SUBSCRIPTION DETAILS */}
      {currentStore && activeTab === 'subscription' && (
        <div className="space-y-6">
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-zinc-800 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  Mon Abonnement Commerçant
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Aperçu de vos capacités et quotas Mervason
                </p>
              </div>
              <Badge variant="orange" size="md">
                Formule Aktuelle : Gratuit
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-zinc-300">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Quota Boutiques</div>
                <div className="text-lg font-extrabold text-orange-500">1 / 1 Boutique</div>
                <p className="text-[11px] text-slate-400">
                  Votre offre gratuite inclut 1 boutique dédiée.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Quota Produits Publiés</div>
                <div className="text-lg font-extrabold text-orange-500">
                  {productsCount} / {maxProductsAllowed} Produits
                </div>
                <p className="text-[11px] text-slate-400">
                  Capacité maximum autorisée sur le Plan Gratuit.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Modals */}
      {currentStore && (
        <ProductFormModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          onSubmit={handleSaveProduct}
          productToEdit={productToEdit}
          categories={categories}
          storeId={currentStore.id}
          ownerId={userProfile?.uid || ''}
        />
      )}

      <StoreFormModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        onSubmit={handleCreateStore}
        ownerId={userProfile?.uid || ''}
      />
    </div>
  );
};
