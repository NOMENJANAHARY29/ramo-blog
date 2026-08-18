import React from 'react';
import { ArticleCategory } from '../types';

interface CategoryFilterProps {
  categories: ArticleCategory[];
  activeCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div id="category-filter-container" className="w-full max-w-5xl 2xl:max-w-6xl mx-auto px-4 mb-10 sm:mb-16">
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2.5 sm:gap-3.5 overflow-x-auto py-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              id={`cat-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(cat)}
              className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm lg:text-base font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#f97316] hover:bg-[#ea580c] text-white shadow-sm scale-105'
                  : 'bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
