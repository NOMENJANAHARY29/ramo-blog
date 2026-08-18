import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface FeaturedArticleProps {
  primaryArticle: Article;
  secondaryArticles?: Article[];
  onReadArticle: (article: Article) => void;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
  primaryArticle,
  secondaryArticles = [],
  onReadArticle,
}) => {
  if (!primaryArticle) return null;

  return (
    <section id="featured-section" className="mb-16 sm:mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch">
        
        {/* Main Primary Hero Article Card (Takes 7 or 8 cols on large screens) */}
        <div 
          id={`featured-primary-${primaryArticle.id}`}
          onClick={() => onReadArticle(primaryArticle)}
          className="lg:col-span-7 xl:col-span-8 group relative rounded-3xl sm:rounded-4xl overflow-hidden cursor-pointer bg-stone-900 border border-stone-800/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-end min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] xl:min-h-[700px]"
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={primaryArticle.imageUrl}
              alt={primaryArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/15" />
            <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors duration-300" />
          </div>

          {/* Card Content */}
          <div className="relative z-10 p-7 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-end h-full">
            {/* Category Tag */}
            <div className="mb-5 sm:mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#f97316] text-white shadow-sm">
                {primaryArticle.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.12] sm:leading-[1.15] group-hover:text-stone-100 transition-colors line-clamp-3">
              {primaryArticle.title}
            </h2>

            {/* Excerpt */}
            <p className="mt-4 sm:mt-5 text-stone-200 text-base sm:text-lg md:text-xl line-clamp-2 sm:line-clamp-3 font-normal max-w-3xl leading-relaxed">
              {primaryArticle.summary}
            </p>

            {/* Author & Date Footer */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-stone-300 font-medium">
              <div className="flex items-center gap-3">
                <img
                  src={primaryArticle.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={primaryArticle.author}
                  className="w-10 h-10 rounded-full object-cover border border-white/30"
                />
                <div className="text-stone-200">
                  <span className="font-semibold text-white">Par {primaryArticle.author}</span>
                  <span className="mx-2 text-stone-400">·</span>
                  <span>{primaryArticle.createdAt}</span>
                  <span className="mx-2 text-stone-400">·</span>
                  <span>{primaryArticle.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#f97316] hover:text-[#fb923c] font-bold group-hover:translate-x-1 transition-all text-sm sm:text-base">
                <span>Lire l'article</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Editorial Cards (Takes 5 or 4 cols on large screens) */}
        {secondaryArticles && secondaryArticles.length > 0 && (
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 sm:gap-8 justify-between">
            {secondaryArticles.slice(0, 2).map((sec) => {
              return (
                <div
                  key={sec.id}
                  id={`featured-secondary-${sec.id}`}
                  onClick={() => onReadArticle(sec)}
                  className="group relative flex-1 p-7 sm:p-8 lg:p-9 xl:p-10 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between bg-white dark:bg-[#12161f] text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800/90 shadow-2xs hover:shadow-xl hover:border-stone-300 dark:hover:border-stone-700"
                >
                  <div>
                    {/* Category & Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800/90 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700/80">
                        {sec.category}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400">
                        {sec.createdAt}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-title text-2xl sm:text-3xl font-bold leading-snug text-stone-950 dark:text-stone-50 group-hover:text-[#f97316] transition-colors line-clamp-2">
                      {sec.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-3.5 text-sm sm:text-base line-clamp-3 leading-relaxed text-stone-600 dark:text-stone-300">
                      {sec.summary}
                    </p>
                  </div>

                  {/* Read time and arrow link */}
                  <div className="mt-6 sm:mt-8 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs sm:text-sm font-bold tracking-wider uppercase text-stone-500 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100">
                    <span>{sec.readTime || '5 MIN READ'}</span>
                    <span className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 group-hover:bg-[#f97316] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
