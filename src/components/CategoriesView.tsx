import React from 'react';
import { ArrowLeft, ArrowRight, Layers, Tag } from 'lucide-react';
import { Article, ArticleCategory } from '../types';
import { ArticleCard } from './ArticleCard';

interface CategoriesViewProps {
  articles: Article[];
  categories: ArticleCategory[];
  activeCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
  onReadArticle: (article: Article) => void;
  onBack: () => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  articles,
  categories,
  activeCategory,
  onSelectCategory,
  onReadArticle,
  onBack,
}) => {
  const filteredArticles = activeCategory === 'Tous'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const categoryStats = categories
    .filter((c) => c !== 'Tous')
    .map((cat) => ({
      name: cat,
      count: articles.filter((a) => a.category === cat).length,
    }));

  return (
    <div id="categories-view" className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-14 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </button>

        <span className="text-xs font-mono text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          Index thématique
        </span>
      </div>

      {/* Hero Header */}
      <div className="mb-12 text-center max-w-4xl mx-auto">
        <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl font-black text-stone-950 dark:text-stone-50 tracking-tight">
          Explorer par Catégories
        </h1>
        <p className="mt-4 text-stone-600 dark:text-stone-300 text-lg sm:text-xl">
          Découvrez nos essais, guides et analyses organisés par domaine d'expertise technique et créatif.
        </p>
      </div>

      {/* Category Cards Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
        {categoryStats.map((item) => {
          const isSelected = activeCategory === item.name;
          return (
            <button
              key={item.name}
              onClick={() => onSelectCategory(item.name)}
              className={`p-5 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                isSelected
                  ? 'bg-[#f97316] text-white border-[#f97316] shadow-md scale-105'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 hover:border-stone-400 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Tag className="w-5 h-5 opacity-80" />
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}>
                  {item.count}
                </span>
              </div>
              <span className="text-base font-bold truncate">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Filtered Articles Grid */}
      <div>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            {activeCategory === 'Tous' ? 'Tous les articles' : `Articles dans "${activeCategory}"`}
          </h2>
          <span className="text-sm font-semibold text-stone-500">
            {filteredArticles.length} {filteredArticles.length > 1 ? 'articles' : 'article'}
          </span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {filteredArticles.map((art) => (
              <ArticleCard key={art.id} article={art} onRead={onReadArticle} />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center text-stone-500 text-lg">
            Aucun article dans cette catégorie pour le moment.
          </div>
        )}
      </div>
    </div>
  );
};
