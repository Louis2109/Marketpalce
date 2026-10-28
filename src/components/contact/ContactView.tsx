import React, { useState } from 'react';
import { MessageSquare, Mail, MapPin, Clock, Send, CheckCircle2, Phone } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    userType: 'buyer',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Contactez l'équipe Mervason
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Une question sur un produit, un besoin d'assistance pour configurer votre boutique ou une demande de partenariat ? Nous sommes à votre écoute à Yaoundé et Douala.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Support Channels */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="bordered" className="p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Assistance directe
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Nos conseillers répondent rapidement à vos messages.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="https://wa.me/237690000000?text=Bonjour%20Mervason%2C%20j%27ai%20une%20question%20concernant%20la%20plateforme"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/40 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    WhatsApp Support Direct
                  </div>
                  <div className="text-xs text-slate-600 dark:text-zinc-400 font-mono">
                    +237 690 00 00 00
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50">
                <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">
                    Email
                  </div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">
                    contact@mervason.cm
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50">
                <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">
                    Villes couvertes
                  </div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">
                    Yaoundé & Douala, Cameroun
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50">
                <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">
                    Disponibilité
                  </div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">
                    Lundi - Samedi : 08h00 - 18h00
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card variant="bordered" className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Message envoyé avec succès
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
                  Merci de nous avoir contactés. Notre équipe reviendra vers vous sous 24 heures ouvrées.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', contact: '', userType: 'buyer', subject: '', message: '' });
                  }}
                  className="mt-4"
                >
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Envoyez-nous un message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Alain Tchuente"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Téléphone WhatsApp ou Email *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: +237 6XX XX XX XX"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Vous êtes :
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'buyer', label: 'Acheteur' },
                      { id: 'merchant', label: 'Commerçant' },
                      { id: 'partner', label: 'Partenaire' },
                    ].map((type) => (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setFormData({ ...formData, userType: type.id })}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                          formData.userType === type.id
                            ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-500 text-orange-600 dark:text-orange-400 font-bold'
                            : 'border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Objet de votre demande *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Information sur la création de boutique"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Détaillez votre message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="orange"
                    disabled={isSubmitting}
                    className="w-full font-bold text-xs py-2.5 justify-center"
                  >
                    {isSubmitting ? (
                      'Envoi en cours...'
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
