import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  resultCount?: number;
  isFiltered?: boolean;
  onClearFilters?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  resultCount,
  isFiltered,
  onClearFilters,
}) => {
  return (
    <div id="search-bar-container" className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-4 mb-8">
      <div className="relative flex items-center">
        <div className="absolute left-4 sm:left-5 text-stone-400 dark:text-stone-500 pointer-events-none">
          <Search className="w-5 h-5" />
        </div>
        <input
          id="article-search-input"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Rechercher un article, une thématique, un auteur..."
          className="w-full pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-400 focus:border-transparent shadow-2xs transition-all"
        />
        {query && (
          <button
            type="button"
            id="clear-search-btn"
            onClick={() => onQueryChange('')}
            className="absolute right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
            title="Effacer la recherche"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isFiltered && typeof resultCount === 'number' && (
        <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2.5 px-2">
          <span>
            {resultCount} {resultCount > 1 ? 'articles trouvés' : 'article trouvé'}
          </span>
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="text-stone-900 dark:text-stone-100 hover:underline font-semibold cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      )}
    </div>
  );
};
