import React, { useState, useEffect } from 'react';
import {
  X,
  MessageSquare,
  Share2,
  Store as StoreIcon,
  ShieldCheck,
  MapPin,
  Tag,
  CheckCircle2,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Product, Store, Category } from '../../types';
import { updatePageMetadata } from '../../lib/seo';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  store: Store | null;
  category?: Category;
  onSelectShop?: (storeId: string) => void;
  onOpenWhatsAppOrder: (product: Product, store: Store) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  store,
  category,
  onSelectShop,
  onOpenWhatsAppOrder,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (product && isOpen) {
      updatePageMetadata({
        title: `${product.name} - ${product.price.toLocaleString('fr-FR')} FCFA`,
        description: product.description,
        image: product.images?.[0],
      });
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'];

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header toolbar */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            {category && <Badge variant="orange" size="sm">{category.name}</Badge>}
            <Badge variant="emerald" size="sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Disponible</span>
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Copier le lien du produit"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Lien copié !</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Partager</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-orange-500 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details & Actions */}
            <div className="space-y-5 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {product.name}
                </h1>

                {/* Price tag */}
                <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200/60 dark:border-orange-900/40 inline-block">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-orange-800 dark:text-orange-300">
                    Prix officiel commerçant
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400">
                    {product.price.toLocaleString('fr-FR')}{' '}
                    <span className="text-lg font-bold">FCFA</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Description de l'article
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    {product.description || 'Aucune description détaillée n’a été fournie pour cet article.'}
                  </p>
                </div>
              </div>

              {/* Store card info */}
              {store && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {store.logoUrl ? (
                        <img
                          src={store.logoUrl}
                          alt={store.name}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-zinc-800"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                          <StoreIcon className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                            {store.name}
                          </h4>
                          {store.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-emerald-500" title="Boutique vérifiée" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-zinc-400">
                          <MapPin className="w-3 h-3 text-orange-500" />
                          <span>{store.city}</span>
                          {store.address && <span>• {store.address}</span>}
                        </div>
                      </div>
                    </div>

                    {onSelectShop && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          onClose();
                          onSelectShop(store.id);
                        }}
                        className="text-xs"
                      >
                        <span>Voir la boutique</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Main CTA */}
              <div className="pt-2">
                <Button
                  variant="emerald"
                  size="lg"
                  onClick={() => {
                    if (store) {
                      onOpenWhatsAppOrder(product, store);
                    }
                  }}
                  className="w-full font-bold shadow-lg shadow-emerald-600/20 py-3 text-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Commander directement sur WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
