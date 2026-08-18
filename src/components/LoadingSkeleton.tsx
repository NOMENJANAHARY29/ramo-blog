import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingSkeletonProps {
  count?: number;
  showSectionHeader?: boolean;
}

export const ArticleCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-stone-900 rounded-2xl sm:rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[16/10] w-full bg-stone-200 dark:bg-stone-800" />
      
      {/* Body Skeleton */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Category & Date */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 bg-stone-200 dark:bg-stone-800 rounded-full" />
          <div className="h-3 w-16 bg-stone-100 dark:bg-stone-850 rounded" />
        </div>

        {/* Title Lines */}
        <div className="space-y-2">
          <div className="h-6 w-5/6 bg-stone-200 dark:bg-stone-800 rounded" />
          <div className="h-6 w-3/4 bg-stone-200 dark:bg-stone-800 rounded" />
        </div>

        {/* Excerpt Lines */}
        <div className="space-y-1.5 pt-1">
          <div className="h-3.5 w-full bg-stone-100 dark:bg-stone-850 rounded" />
          <div className="h-3.5 w-4/5 bg-stone-100 dark:bg-stone-850 rounded" />
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="h-4 w-24 bg-stone-200 dark:bg-stone-800 rounded" />
          <div className="h-4 w-12 bg-stone-100 dark:bg-stone-850 rounded" />
        </div>
      </div>
    </div>
  );
};

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count = 3,
  showSectionHeader = true,
}) => {
  return (
    <div id="loading-skeleton-section" className="mb-14 sm:mb-20">
      {showSectionHeader && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            Plus d'articles...
          </h2>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-stone-700 dark:text-stone-300" />
            <span>Fetching GET /articles</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
