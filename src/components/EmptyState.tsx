import React from 'react';
import { FileQuestion, Plus, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'empty';
  query?: string;
  onResetFilters?: () => void;
  onPublishClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'empty',
  query = '',
  onResetFilters,
  onPublishClick,
}) => {
  return (
    <div id="empty-state-container" className="my-16 p-8 sm:p-14 text-center rounded-2xl sm:rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40 max-w-xl mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 flex items-center justify-center mx-auto mb-4">
        {type === 'search' ? (
          <FileQuestion className="w-7 h-7 stroke-[1.75]" />
        ) : (
          <FileQuestion className="w-7 h-7 stroke-[1.75]" />
        )}
      </div>

      <h3 className="font-serif-title text-2xl font-bold text-stone-950 dark:text-stone-50 mb-2">
        {type === 'search' ? 'Aucun article trouvé' : 'Aucun article pour le moment'}
      </h3>

      <p className="text-sm text-stone-600 dark:text-stone-400 mb-6 max-w-sm mx-auto leading-relaxed">
        {type === 'search'
          ? query
            ? `Aucun résultat ne correspond à la recherche "${query}". Essayez un autre mot-clé ou réinitialisez les filtres.`
            : 'Aucun article ne correspond aux critères sélectionnés.'
          : 'Commencez à partager vos idées, analyses et tutoriels avec la communauté NOVA BLOG.'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {type === 'search' && onResetFilters && (
          <button
            type="button"
            id="reset-search-btn"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Réinitialiser la recherche
          </button>
        )}

        {onPublishClick && (
          <button
            type="button"
            id="empty-publish-btn"
            onClick={onPublishClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Publier un article
          </button>
        )}
      </div>
    </div>
  );
};
