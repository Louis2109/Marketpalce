import React, { useState, useEffect } from 'react';
import { X, Package, Image as ImageIcon, Tag, DollarSign, Eye, EyeOff } from 'lucide-react';
import { Product, Category } from '../../types';
import { Button } from '../ui/Button';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  productToEdit?: Product | null;
  categories: Category[];
  storeId: string;
  ownerId: string;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  productToEdit,
  categories,
  storeId,
  ownerId,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(5000);
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-mode');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setCategoryId(productToEdit.categoryId);
      setImageUrl(productToEdit.images[0] || '');
      setIsPublished(productToEdit.isPublished);
    } else {
      setName('');
      setDescription('');
      setPrice(5000);
      setCategoryId(categories[0]?.id || 'cat-mode');
      setImageUrl('');
      setIsPublished(true);
    }
  }, [productToEdit, categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);

    try {
      const defaultImg =
        imageUrl.trim() ||
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80';

      await onSubmit({
        storeId,
        ownerId,
        name: name.trim(),
        description: description.trim(),
        price: Number(price) || 0,
        currency: 'XAF',
        categoryId,
        images: [defaultImg],
        isPublished,
      });

      onClose();
    } catch (err) {
      console.error('Save product error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {productToEdit ? 'Modifier le Produit' : 'Ajouter un Produit'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                {productToEdit
                  ? 'Mettre à jour les caractéristiques'
                  : 'Publiez un nouvel article sur votre boutique'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Product Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
              Nom du Produit *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Sac Artisanal Cuir Bastos"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Prix (FCFA / XAF) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min={0}
                  step={500}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full pl-3 pr-12 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
                <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                  FCFA
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Catégorie *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
              Lien de l'image (URL)
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
            {imageUrl && (
              <div className="mt-2 w-full h-32 rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden bg-slate-100 dark:bg-zinc-950 flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Aperçu"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
              Description du produit
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Précisez les détails, la taille, l'état ou le mode de retrait..."
              className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
            />
          </div>

          {/* Publication Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950">
            <div className="flex items-center gap-2">
              {isPublished ? (
                <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <EyeOff className="w-4 h-4 text-slate-400" />
              )}
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {isPublished ? 'Produit Visible En Ligne' : 'Produit Masqué'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-zinc-400">
                  {isPublished
                    ? 'Le produit apparaît sur votre vitrine et le marché'
                    : 'Uniquement visible dans votre dashboard'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsPublished(!isPublished)}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                isPublished ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform absolute top-0.5 ${
                  isPublished ? 'translate-x-5.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading} variant="orange">
              {loading ? 'Enregistrement...' : productToEdit ? 'Enregistrer' : 'Publier le Produit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
