import React, { useState, useEffect } from 'react';
import {
  Tag,
  Shirt,
  Sparkles,
  Smartphone,
  Home,
  Apple,
  Palette,
  ArrowRight,
  Package,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Category, Product } from '../../types';
import { getCategories, getAllProducts } from '../../lib/firebase/services';
import { updatePageMetadata } from '../../lib/seo';

interface CategoriesViewProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updatePageMetadata({
      title: 'Catégories de Produits | Mervason Cameroun',
      description: 'Explorez nos univers : Mode, High-Tech, Beauté, Pagne, Alimentation locale.',
    });

    async function loadData() {
      setIsLoading(true);
      try {
        const [cData, pData] = await Promise.all([getCategories(), getAllProducts()]);
        setCategories(cData);
        setProducts(pData.filter((p) => p.isPublished));
      } catch (err) {
        console.error('Error loading categories:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shirt':
        return <Shirt className="w-6 h-6 text-orange-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-blue-500" />;
      case 'Home':
        return <Home className="w-6 h-6 text-emerald-500" />;
      case 'Apple':
        return <Apple className="w-6 h-6 text-red-500" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-purple-500" />;
      default:
        return <Tag className="w-6 h-6 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="space-y-2">
        <Badge variant="orange" size="md">
          Univers Mervason
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Parcourir par Catégories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-2xl">
          Sélectionnez une catégorie pour découvrir tous les articles publiés par nos commerçants partenaires.
        </p>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-44 rounded-2xl bg-slate-200/60 dark:bg-zinc-800/60 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;

            return (
              <Card
                key={cat.id}
                variant="bordered"
                className="group p-6 space-y-4 cursor-pointer transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/5 flex flex-col justify-between"
                onClick={() => onSelectCategory(cat.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <Badge variant="default" size="sm">
                      <Package className="w-3 h-3" />
                      <span>{count} article(s)</span>
                    </Badge>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                    Découvrez nos articles sélectionnés dans {cat.name.toLowerCase()} auprès de commerçants à Yaoundé et Douala.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-orange-600 dark:text-orange-400">
                  <span>Explorer le catalogue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
