import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Plus, 
  Menu, 
  X, 
  Search, 
  Compass, 
  BookOpen, 
  Tag, 
  Info,
  ArrowRight
} from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenSearch?: () => void;
  onSelectCategory?: (category: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isDarkMode,
  onToggleTheme,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-header"
      className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0c0f14]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-300"
    >
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20 sm:h-22">
          
          {/* Left section: Mobile Hamburger & Big Editorial Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo & Digital Journal Badge */}
            <div 
              className="flex items-center gap-3 sm:gap-4 cursor-pointer group select-none" 
              onClick={() => handleNavClick('home')}
            >
              <span className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 group-hover:opacity-90 transition-opacity">
                Ramo Bl<span className="text-orange-500 italic">og</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-stone-300 dark:border-stone-700 bg-stone-100/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 shadow-2xs">
                DIGITAL JOURNAL
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links with Generous Spacing */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-5">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`px-4 py-2.5 rounded-xl text-sm lg:text-base font-semibold transition-all ${
                currentView === 'home'
                  ? 'text-stone-950 dark:text-stone-50 bg-stone-100 dark:bg-stone-800 shadow-2xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/60 dark:hover:bg-stone-800/60'
              }`}
            >
              Accueil
            </button>
            <button
              id="nav-link-articles"
              onClick={() => handleNavClick('articles')}
              className={`px-4 py-2.5 rounded-xl text-sm lg:text-base font-semibold transition-all ${
                currentView === 'articles'
                  ? 'text-stone-950 dark:text-stone-50 bg-stone-100 dark:bg-stone-800 shadow-2xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/60 dark:hover:bg-stone-800/60'
              }`}
            >
              Articles
            </button>
            <button
              id="nav-link-categories"
              onClick={() => handleNavClick('categories')}
              className={`px-4 py-2.5 rounded-xl text-sm lg:text-base font-semibold transition-all ${
                currentView === 'categories'
                  ? 'text-stone-950 dark:text-stone-50 bg-stone-100 dark:bg-stone-800 shadow-2xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/60 dark:hover:bg-stone-800/60'
              }`}
            >
              Catégories
            </button>
            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`px-4 py-2.5 rounded-xl text-sm lg:text-base font-semibold transition-all ${
                currentView === 'about'
                  ? 'text-stone-950 dark:text-stone-50 bg-stone-100 dark:bg-stone-800 shadow-2xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/60 dark:hover:bg-stone-800/60'
              }`}
            >
              À propos
            </button>
          </nav>

          {/* Right Section: Search, Dark Mode & Primary Publish Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            {onOpenSearch && (
              <button
                id="header-search-btn"
                type="button"
                onClick={onOpenSearch}
                className="p-3 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Rechercher"
                aria-label="Rechercher des articles"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            <button
              id="theme-toggle-btn"
              type="button"
              onClick={onToggleTheme}
              className="p-3 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title={isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
              aria-label="Basculer le thème"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-stone-700" />
              )}
            </button>

            <button
              id="header-publish-btn"
              type="button"
              onClick={() => handleNavClick('publish')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-bold bg-[#f97316] hover:bg-[#ea580c] text-white shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              <span>+ Publier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer"
          className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0c0f14] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Navigation</span>
            <span className="text-xs font-medium text-stone-500">Ramo Blog Digital Journal</span>
          </div>
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-left ${
              currentView === 'home'
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-stone-50 font-semibold'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900'
            }`}
          >
            <Compass className="w-5 h-5 text-stone-500" />
            Accueil
          </button>
          <button
            onClick={() => handleNavClick('articles')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-left ${
              currentView === 'articles'
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-stone-50 font-semibold'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900'
            }`}
          >
            <BookOpen className="w-5 h-5 text-stone-500" />
            Tous les Articles
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-left ${
              currentView === 'categories'
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-stone-50 font-semibold'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900'
            }`}
          >
            <Tag className="w-5 h-5 text-stone-500" />
            Catégories
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-left ${
              currentView === 'about'
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-stone-50 font-semibold'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900'
            }`}
          >
            <Info className="w-5 h-5 text-stone-500" />
            À propos de Ramo Blog
          </button>

          <div className="pt-3">
            <button
              onClick={() => handleNavClick('publish')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-[#f97316] hover:bg-[#ea580c] text-white shadow-sm"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              Publier un nouvel article
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
