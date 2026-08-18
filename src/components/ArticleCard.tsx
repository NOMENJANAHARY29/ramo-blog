import React from 'react';
import { ArrowRight, Heart, Eye } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onRead: (article: Article) => void;
  onLike?: (e: React.MouseEvent, article: Article) => void;
  isLiked?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onRead,
  onLike,
  isLiked = false,
}) => {
  return (
    <article
      id={`article-card-${article.id}`}
      onClick={() => onRead(article)}
      className="group cursor-pointer flex flex-col bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* Article Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={article.imageUrl}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Category Pill Tag Overlay */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
            {article.category}
          </span>
        </div>

        {/* Like Button overlay */}
        {onLike && (
          <button
            type="button"
            onClick={(e) => onLike(e, article)}
            className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-xs ${
              isLiked
                ? 'bg-rose-500 text-white'
                : 'bg-white/85 dark:bg-stone-900/85 text-stone-700 dark:text-stone-300 hover:text-rose-500'
            }`}
            title="Aimer cet article"
            aria-label="Aimer cet article"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-3 font-medium">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.createdAt}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif-title text-2xl font-bold text-stone-950 dark:text-stone-50 leading-snug group-hover:text-[#f97316] transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-3 text-stone-600 dark:text-stone-400 text-sm sm:text-base line-clamp-2 leading-relaxed font-normal">
            {article.summary}
          </p>
        </div>

        {/* Footer: Read button & Stats */}
        <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 group-hover:text-[#f97316] group-hover:translate-x-1 transition-all">
            Lire l'article
            <ArrowRight className="w-4 h-4" />
          </span>

          <div className="flex items-center gap-3.5 text-xs sm:text-sm text-stone-400 dark:text-stone-500 font-medium">
            {article.views > 0 && (
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {article.views}
              </span>
            )}
            {article.likes > 0 && (
              <span className="flex items-center gap-1.5 text-rose-500/90">
                <Heart className="w-4 h-4 fill-rose-500/30" />
                {article.likes}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
