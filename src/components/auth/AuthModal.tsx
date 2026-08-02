import React, { useState } from 'react';
import { X, Store, User, Mail, Lock, Phone, MapPin, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { UserRole, OperatingCity } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
}) => {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>('merchant');
  const [city, setCity] = useState<OperatingCity>('Yaoundé');
  const [phone, setPhone] = useState('237');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        if (!displayName.trim()) {
          throw new Error('Veuillez saisir votre nom ou raison sociale.');
        }
        await signup(email, password, displayName, role, city, phone);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || 'Une erreur est survenue lors de la connexion. Vérifiez vos identifiants.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-bold flex items-center justify-center text-sm shadow-sm shadow-orange-500/30">
              M
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {mode === 'login' ? 'Connexion Mervason' : 'Créer un Compte'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                {mode === 'login'
                  ? 'Accédez à votre espace commerçant ou client'
                  : 'Rejoignez le réseau des commerçants du Cameroun'}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'signup' && (
            <>
              {/* Role selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Vous souhaitez rejoindre en tant que :
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('merchant')}
                    className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center gap-2 transition-all ${
                      role === 'merchant'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 ring-2 ring-orange-500/20'
                        : 'border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
                    }`}
                  >
                    <Store className="w-4 h-4 text-orange-500" />
                    <div>
                      <div className="font-bold">Commerçant</div>
                      <div className="text-[10px] text-slate-500 dark:text-zinc-400">
                        Boutique & Produits
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center gap-2 transition-all ${
                      role === 'client'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 ring-2 ring-orange-500/20'
                        : 'border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
                    }`}
                  >
                    <User className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
                    <div>
                      <div className="font-bold">Acheteur</div>
                      <div className="text-[10px] text-slate-500 dark:text-zinc-400">
                        Découverte & Contact
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Display Name */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                  {role === 'merchant' ? 'Nom de votre établissement / Marque' : 'Nom complet'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={role === 'merchant' ? 'Ex: Boutique Elegance Bastos' : 'Ex: Marc Nkong'}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* City & WhatsApp Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">Ville</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value as OperatingCity)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    >
                      <option value="Yaoundé">Yaoundé</option>
                      <option value="Douala">Douala</option>
                      <option value="Autre">Autre ville</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">WhatsApp</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="237..."
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">Adresse Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@mervason.cm"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">Mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} variant="orange" className="w-full mt-2">
            {loading ? 'Traitement en cours...' : mode === 'login' ? 'Se Connecter' : 'Créer mon Compte'}
          </Button>
        </form>

        {/* Footer switch */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-zinc-950/60 border-t border-slate-100 dark:border-zinc-800 text-center text-xs text-slate-600 dark:text-zinc-400">
          {mode === 'login' ? (
            <p>
              Vous n'avez pas encore de compte ?{' '}
              <button
                onClick={() => setMode('signup')}
                className="font-bold text-orange-600 dark:text-orange-400 hover:underline"
              >
                S'inscrire gratuitement
              </button>
            </p>
          ) : (
            <p>
              Déjà inscrit sur Mervason ?{' '}
              <button
                onClick={() => setMode('login')}
                className="font-bold text-orange-600 dark:text-orange-400 hover:underline"
              >
                Se connecter
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
