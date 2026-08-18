import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Une erreur est survenue lors de la récupération des données.",
  onRetry,
}) => {
  return (
    <div id="error-state-container" className="my-16 p-8 sm:p-12 text-center rounded-2xl sm:rounded-3xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 max-w-xl mx-auto">
      <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-6 h-6 stroke-[2]" />
      </div>
      <h3 className="font-serif-title text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
        Impossible de charger les articles
      </h3>
      <p className="text-sm text-stone-600 dark:text-stone-300 mb-6 max-w-md mx-auto">
        {message}
      </p>
      <button
        type="button"
        id="retry-fetch-btn"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white shadow-sm transition-all cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        Réessayer
      </button>
    </div>
  );
};
