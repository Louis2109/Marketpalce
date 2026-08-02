import React from 'react';
import { MessageSquare, MapPin, Store as StoreIcon, ShieldCheck, Tag } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Product, Store, Category } from '../../types';

interface ProductCardProps {
  product: Product;
  store?: Store;
  category?: Category;
  onSelectProduct: (product: Product) => void;
  onSelectShop?: (storeId: string) => void;
  onOpenWhatsAppOrder: (product: Product, store?: Store) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  store,
  category,
  onSelectProduct,
  onSelectShop,
  onOpenWhatsAppOrder,
}) => {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';

  return (
    <Card
      variant="bordered"
      className="group overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer"
      onClick={() => onSelectProduct(product)}
    >
      <div className="space-y-3">
        {/* Image Container */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-800">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges on image */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
            {store?.city && (
              <Badge variant="orange" size="sm" className="bg-orange-500/90 text-white backdrop-blur-md border-none font-bold shadow-xs">
                <MapPin className="w-3 h-3" />
                <span>{store.city}</span>
              </Badge>
            )}

            {category && (
              <Badge variant="default" size="sm" className="bg-slate-900/80 text-white backdrop-blur-md border-none font-medium text-[10px]">
                {category.name}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 px-1">
          {/* Store Info */}
          {store && (
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectShop) onSelectShop(store.id);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 font-medium truncate group/store"
              >
                <StoreIcon className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span className="truncate group-hover/store:underline">{store.name}</span>
                {store.isVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Boutique vérifiée" />
                )}
              </button>
            </div>
          )}

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-1 pt-1">
            <span className="text-lg font-extrabold text-orange-600 dark:text-orange-400">
              {product.price.toLocaleString('fr-FR')}
            </span>
            <span className="text-xs font-bold text-orange-600/80 dark:text-orange-400/80">
              FCFA
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 mt-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenWhatsAppOrder(product, store);
          }}
          className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98]"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Commander sur WhatsApp</span>
        </button>
      </div>
    </Card>
  );
};
