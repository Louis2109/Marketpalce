import React, { useState } from 'react';
import { MessageSquare, X, Send, MapPin, User, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Product, Store } from '../../types';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  store: Store | null;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  isOpen,
  onClose,
  product,
  store,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState<'Yaoundé' | 'Douala' | 'Autre'>('Yaoundé');
  const [address, setAddress] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  if (!isOpen || !product || !store) return null;

  // Clean WhatsApp phone number (strip spaces, +, -, etc.)
  const cleanPhone = store.whatsappNumber.replace(/[^0-9]/g, '');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Bonjour ${store.name},

Je souhaite commander le produit suivant sur Mervason :
🛍️ *Produit* : ${product.name}
💰 *Prix* : ${product.price.toLocaleString('fr-FR')} FCFA

📍 *Informations de livraison* :
• *Nom* : ${customerName || 'Client Mervason'}
• *Téléphone* : ${phone || 'Non spécifié'}
• *Ville* : ${city}
• *Quartier / Adresse* : ${address || 'À préciser sur WhatsApp'}
${customMessage ? `• *Note client* : ${customMessage}` : ''}

Merci de me confirmer la disponibilité et les modalités !`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-zinc-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="emerald" size="sm">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Direct WhatsApp</span>
              </Badge>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Passer Commande auprès de {store.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Remplissez vos coordonnées pour générer un message WhatsApp pré-rempli. Aucun frais sur Mervason.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Product Summary */}
        <div className="p-3.5 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/40 flex items-center gap-3">
          {product.images && product.images[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-14 h-14 rounded-xl object-cover border border-orange-200/50 dark:border-orange-900/50 shrink-0"
            />
          )}
          <div className="space-y-0.5 flex-1 min-w-0">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">
              {product.name}
            </h4>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400">
                {product.price.toLocaleString('fr-FR')} FCFA
              </span>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                Vendu par {store.name}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSendWhatsApp} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-orange-500" />
                <span>Votre Nom / Prénom</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ex: Jean-Paul Mvondo"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>

            {/* Customer Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>Votre Numéro de Téléphone</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: 699001122"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* City */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Ville de Livraison</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as 'Yaoundé' | 'Douala' | 'Autre')}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                <option value="Yaoundé">Yaoundé</option>
                <option value="Douala">Douala</option>
                <option value="Autre">Autre ville du Cameroun</option>
              </select>
            </div>

            {/* Address / Quartier */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                <span>Quartier / Repère précis</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ex: Bastos, près de la pharmacie"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
              <span>Message / Précision pour le commerçant (Optionnel)</span>
            </label>
            <textarea
              rows={2}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Ex: Taille 42 souhaitée, livraison rapide en matinée..."
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"
            />
          </div>

          {/* Notice */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800/80 text-[11px] text-slate-600 dark:text-zinc-400 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-zinc-200">
              <AlertCircle className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Fonctionnement direct :</span>
            </div>
            <p className="leading-relaxed">
              En cliquant sur le bouton ci-dessous, WhatsApp s'ouvrira avec le message rédigé. Vous négocierez directement avec le commerçant et paierez à la livraison.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" variant="emerald" size="md" className="font-bold shadow-md gap-2">
              <Send className="w-4 h-4" />
              <span>Ouvrir WhatsApp ({cleanPhone})</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
