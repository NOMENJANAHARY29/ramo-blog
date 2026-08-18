import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

interface ArticleGridProps {
  title?: string;
  articles: Article[];
  onReadArticle: (article: Article) => void;
  onLikeArticle?: (e: React.MouseEvent, article: Article) => void;
  likedArticleIds?: Set<string>;
  onViewAll?: () => void;
  showViewAll?: boolean;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  title = "Dernières publications",
  articles,
  onReadArticle,
  onLikeArticle,
  likedArticleIds = new Set(),
  onViewAll,
  showViewAll = true,
}) => {
  if (articles.length === 0) return null;

  return (
    <section id="latest-publications-section" className="mb-16 sm:mb-24">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 sm:mb-12">
        <h2 
          id="publications-section-title"
          className="font-serif-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-stone-950 dark:text-stone-50 tracking-tight"
        >
          {title}
        </h2>

        {showViewAll && onViewAll && (
          <button
            type="button"
            id="view-all-articles-btn"
            onClick={onViewAll}
            className="group flex items-center gap-2 text-sm sm:text-base font-bold text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Grid: 3 columns Desktop, 2 columns Tablet, 1 column Mobile with large spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onRead={onReadArticle}
            onLike={onLikeArticle}
            isLiked={likedArticleIds.has(article.id)}
          />
        ))}
      </div>
    </section>
  );
};
