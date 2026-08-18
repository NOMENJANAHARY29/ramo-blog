import React from 'react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0c0f14] py-14 sm:py-18 transition-colors duration-300">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
        
        {/* Brand Name */}
        <div 
          onClick={() => onNavigate('home')}
          className="inline-block cursor-pointer group mb-6"
        >
          <span className="font-serif-title text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 group-hover:opacity-90 transition-opacity">
            Ramo Bl<span className="text-orange-500 italic">og</span>
          </span>
          <span className="block text-xs sm:text-sm font-semibold tracking-widest text-stone-400 dark:text-stone-500 uppercase mt-1">
            DIGITAL JOURNAL • PUBLICATION & ESSAIS
          </span>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-sm sm:text-base font-semibold text-stone-600 dark:text-stone-400 mb-8">
          <button 
            onClick={() => onNavigate('about')} 
            className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => onNavigate('about')} 
            className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <a 
            href="/api/articles" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors font-mono text-xs sm:text-sm"
          >
            RSS / JSON Feed
          </a>
          <button 
            onClick={() => onNavigate('about')} 
            className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
          >
            About
          </button>
        </div>

        {/* Copyright Notice */}
        <div className="text-xs sm:text-sm text-stone-400 dark:text-stone-600">
          © 2026 Ramo Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
