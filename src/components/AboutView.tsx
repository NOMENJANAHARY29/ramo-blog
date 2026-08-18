import React from 'react';
import { ArrowLeft, Sparkles, Shield, Cpu, Palette, BookOpen } from 'lucide-react';
import { ViewMode } from '../types';

interface AboutViewProps {
  onBack: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack, onNavigate }) => {
  return (
    <div id="about-view" className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-10 pb-5 border-b border-stone-200 dark:border-stone-800">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour à l'accueil</span>
        </button>

        <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">
          MANIFESTE ÉDITORIAL
        </span>
      </div>

      <div className="space-y-12">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 mb-6">
            RAMO BLOG • DIGITAL JOURNAL
          </span>
          <h1 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-black text-stone-950 dark:text-stone-50 tracking-tight leading-tight">
            Une publication numérique dédiée à la clarté technique et au minimalisme fonctionnel.
          </h1>
          <p className="mt-8 text-xl sm:text-2xl text-stone-600 dark:text-stone-300 font-editorial-body leading-relaxed">
            Fondé en 2026, <strong>Ramo Blog</strong> est un journal numérique indépendant conçu pour les ingénieurs, designers, chercheurs en IA et passionnés de culture numérique. Nous croyons en un web rapide, épuré et respectueux de l'attention de ses lecteurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs">
            <Cpu className="w-8 h-8 text-stone-900 dark:text-stone-100 mb-4" />
            <h3 className="font-serif-title text-2xl font-bold text-stone-950 dark:text-stone-50 mb-3">
              Ingénierie & Architecture
            </h3>
            <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
              Analyses approfondies des systèmes distribués, des API RESTful & GraphQL modernes, du cloud hybride et des performances de rendu edge.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs">
            <Sparkles className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="font-serif-title text-2xl font-bold text-stone-950 dark:text-stone-50 mb-3">
              Intelligence Artificielle
            </h3>
            <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
              Veille rigoureuse sur les modèles de fondation, les agents autonomes, le raisonnement multimodal et leurs implications éthiques.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs">
            <Palette className="w-8 h-8 text-indigo-500 mb-4" />
            <h3 className="font-serif-title text-2xl font-bold text-stone-950 dark:text-stone-50 mb-3">
              Design & Typographie
            </h3>
            <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
              Défense du minimalisme éditorial, respect du vide visuel, rigueur des systèmes de tokens et ergonomie d'interaction.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs">
            <Shield className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="font-serif-title text-2xl font-bold text-stone-950 dark:text-stone-50 mb-3">
              Confidentialité & Sécurité
            </h3>
            <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
              Paradigmes Zero-Trust, protection des données personnelles, protocoles cryptographiques et souveraineté applicative.
            </p>
          </div>
        </div>

        <div className="p-10 sm:p-12 rounded-3xl sm:rounded-4xl bg-stone-900 text-stone-100 text-center">
          <BookOpen className="w-10 h-10 mx-auto mb-4 text-stone-300" />
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white mb-3">
            Contribuer à Ramo Blog
          </h2>
          <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Vous souhaitez partager un retour d'expérience technique ou un essai de design ? Notre plateforme est ouverte aux contributions.
          </p>
          <button
            onClick={() => onNavigate('publish')}
            className="px-8 py-3.5 rounded-full font-bold text-base bg-[#f97316] hover:bg-[#ea580c] text-white shadow-lg transition-all cursor-pointer"
          >
            + Publier un article dès maintenant
          </button>
        </div>
      </div>
    </div>
  );
};
