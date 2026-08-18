import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { FeaturedArticle } from './components/FeaturedArticle';
import { ArticleGrid } from './components/ArticleGrid';
import { ArticleDetail } from './components/ArticleDetail';
import { CreateArticleForm } from './components/CreateArticleForm';
import { CategoriesView } from './components/CategoriesView';
import { AboutView } from './components/AboutView';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';
import { INITIAL_ARTICLES } from './data/initialArticles';
import { Article, ArticleCategory, CreateArticlePayload, Toast, ViewMode } from './types';

const CATEGORIES: ArticleCategory[] = [
  'Tous',
  'Technologie',
  'Web',
  'IA',
  'Cybersécurité',
  'Design',
  'Productivité',
];

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Navigation & View State
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Filter States
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Interactions & Preferences
  const [likedArticleIds, setLikedArticleIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('nova_liked_articles');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('nova_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Dark mode effect
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      try { localStorage.setItem('nova_theme', 'dark'); } catch {}
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      try { localStorage.setItem('nova_theme', 'light'); } catch {}
    }
  }, [isDarkMode]);

  // Toast Helper
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch articles from API
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/articles');
      if (!res.ok) {
        throw new Error(`Erreur réseau (${res.status})`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setArticles(data.data);
      } else {
        // Fallback to initial articles if response format differs
        setArticles(INITIAL_ARTICLES);
      }
    } catch (err) {
      console.warn('API fetch encountered error, using client-side cache:', err);
      // Fallback gracefully to local dataset so the user always has a functional experience
      setArticles((prev) => (prev.length > 0 ? prev : INITIAL_ARTICLES));
    } finally {
      // Small simulated delay for smooth skeleton transition
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Filter logic
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category match
      const matchCategory =
        activeCategory === 'Tous' ||
        article.category.toLowerCase() === activeCategory.toLowerCase();

      // Search query match
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.content.toLowerCase().includes(q) ||
        article.author.toLowerCase().includes(q) ||
        article.tags?.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchQuery;
    });
  }, [articles, activeCategory, searchQuery]);

  // Featured articles breakdown
  const primaryFeaturedArticle = useMemo(() => {
    return articles.find((a) => a.isFeatured && a.featuredOrder === 1) || articles[0];
  }, [articles]);

  const secondaryFeaturedArticles = useMemo(() => {
    const secondaries = articles.filter(
      (a) => a.id !== primaryFeaturedArticle?.id && (a.isFeatured || a.featuredOrder)
    );
    if (secondaries.length >= 2) return secondaries.slice(0, 2);
    // fallback to next 2 articles
    return articles.filter((a) => a.id !== primaryFeaturedArticle?.id).slice(0, 2);
  }, [articles, primaryFeaturedArticle]);

  // Grid articles (remaining publications)
  const gridArticles = useMemo(() => {
    if (activeCategory !== 'Tous' || searchQuery.trim() !== '') {
      return filteredArticles;
    }
    // In default home view, exclude the top featured ones to avoid duplication
    const featuredIds = new Set([
      primaryFeaturedArticle?.id,
      ...secondaryFeaturedArticles.map((s) => s.id),
    ]);
    return articles.filter((a) => !featuredIds.has(a.id));
  }, [articles, filteredArticles, activeCategory, searchQuery, primaryFeaturedArticle, secondaryFeaturedArticles]);

  // Read article handler
  const handleReadArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Like article handler
  const handleLikeArticle = async (eOrArticle: React.MouseEvent | Article, maybeArticle?: Article) => {
    const article = 'id' in eOrArticle ? eOrArticle : (maybeArticle as Article);
    if (!article) return;

    if ('stopPropagation' in eOrArticle) {
      eOrArticle.stopPropagation();
    }

    const isAlreadyLiked = likedArticleIds.has(article.id);
    const newLiked = new Set(likedArticleIds);

    if (isAlreadyLiked) {
      newLiked.delete(article.id);
      setLikedArticleIds(newLiked);
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, likes: Math.max(0, a.likes - 1) } : a))
      );
      if (selectedArticle?.id === article.id) {
        setSelectedArticle((prev) => (prev ? { ...prev, likes: Math.max(0, prev.likes - 1) } : null));
      }
    } else {
      newLiked.add(article.id);
      setLikedArticleIds(newLiked);
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, likes: a.likes + 1 } : a))
      );
      if (selectedArticle?.id === article.id) {
        setSelectedArticle((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
      }
      addToast(`Vous avez aimé "${article.title}"`, 'info');

      // Call API like endpoint
      try {
        await fetch(`/api/articles/${article.id}/like`, { method: 'POST' });
      } catch (err) {
        // silent fallback
      }
    }

    try {
      localStorage.setItem('nova_liked_articles', JSON.stringify(Array.from(newLiked)));
    } catch {}
  };

  // Add comment handler
  const handleAddComment = async (articleId: string, author: string, content: string) => {
    const newComment = {
      id: 'c-' + Date.now(),
      author,
      content,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      createdAt: 'À l\'instant',
    };

    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === articleId) {
          const comments = a.comments ? [...a.comments, newComment] : [newComment];
          return { ...a, comments };
        }
        return a;
      })
    );

    if (selectedArticle?.id === articleId) {
      setSelectedArticle((prev) => {
        if (!prev) return null;
        const comments = prev.comments ? [...prev.comments, newComment] : [newComment];
        return { ...prev, comments };
      });
    }

    // Call API comment endpoint
    try {
      await fetch(`/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content }),
      });
    } catch (err) {
      // handled locally
    }
  };

  // Publish article handler (POST /articles)
  const handlePublishArticle = async (payload: CreateArticlePayload): Promise<boolean> => {
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let createdArticle: Article;

      if (res.ok) {
        const result = await res.json();
        createdArticle = result.data;
      } else {
        // Fallback local creation
        const now = new Date();
        const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
        const wordCount = payload.content.trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(wordCount / 200));

        createdArticle = {
          id: 'art-' + Date.now(),
          title: payload.title,
          category: payload.category,
          summary: payload.summary || payload.content.substring(0, 140) + '...',
          content: payload.content,
          imageUrl: payload.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
          author: payload.author || 'Rédacteur NOVA',
          authorRole: payload.authorRole || 'Contributeur Editorial',
          createdAt: `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`,
          readTime: `${minutes} min read`,
          likes: 0,
          views: 1,
          tags: payload.tags || [payload.category],
        };
      }

      // Prepend to article list
      setArticles((prev) => [createdArticle, ...prev]);

      // Success feedback
      addToast('✓ Article publié avec succès', 'success');

      // Navigate to the new article detail
      setSelectedArticle(createdArticle);
      setCurrentView('detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      return true;
    } catch (err) {
      console.error('Error during article creation:', err);
      addToast('Impossible de publier l\'article. Veuillez réessayer.', 'error');
      return false;
    }
  };

  const handleResetFilters = () => {
    setActiveCategory('Tous');
    setSearchQuery('');
  };

  const handleSearchFocus = () => {
    if (currentView !== 'home' && currentView !== 'articles') {
      setCurrentView('home');
    }
    const searchInput = document.getElementById('article-search-input');
    searchInput?.focus();
  };

  return (
    <div className={`min-h-screen w-full flex flex-col bg-stone-50 dark:bg-[#0c0f14] text-stone-900 dark:text-stone-100 selection:bg-stone-900 selection:text-white dark:selection:bg-stone-100 dark:selection:text-stone-950 font-sans-ui transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Sticky Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenSearch={handleSearchFocus}
      />

      {/* Main Content Area - Full-Width Editorial Layout (90-95% screen width on desktop) */}
      <main className="flex-1 w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* VIEW 1: HOME EDITORIAL VIEW */}
        {currentView === 'home' && (
          <div id="home-view" className="animate-in fade-in duration-300">
            {/* Hero Header */}
            <Hero />

            {/* Search Bar */}
            <SearchBar
              query={searchQuery}
              onQueryChange={setSearchQuery}
              resultCount={filteredArticles.length}
              isFiltered={activeCategory !== 'Tous' || searchQuery.trim() !== ''}
              onClearFilters={handleResetFilters}
            />

            {/* Category Filter Pills */}
            <CategoryFilter
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            {/* Error State */}
            {error && (
              <ErrorState
                message={error}
                onRetry={fetchArticles}
              />
            )}

            {/* Loading Skeleton */}
            {loading && !error && (
              <LoadingSkeleton count={3} showSectionHeader={true} />
            )}

            {/* Empty State when filters yield no results */}
            {!loading && !error && filteredArticles.length === 0 && (
              <EmptyState
                type="search"
                query={searchQuery}
                onResetFilters={handleResetFilters}
                onPublishClick={() => setCurrentView('publish')}
              />
            )}

            {/* If not filtering and articles loaded: Show Featured section + Grid */}
            {!loading && !error && filteredArticles.length > 0 && (
              <>
                {/* Featured Section (Only when no specific category or search active) */}
                {activeCategory === 'Tous' && !searchQuery.trim() && (
                  <FeaturedArticle
                    primaryArticle={primaryFeaturedArticle}
                    secondaryArticles={secondaryFeaturedArticles}
                    onReadArticle={handleReadArticle}
                  />
                )}

                {/* Latest Publications Grid */}
                <ArticleGrid
                  title={
                    activeCategory !== 'Tous' || searchQuery.trim()
                      ? `Articles trouvés (${filteredArticles.length})`
                      : 'Dernières publications'
                  }
                  articles={
                    activeCategory !== 'Tous' || searchQuery.trim()
                      ? filteredArticles
                      : gridArticles
                  }
                  onReadArticle={handleReadArticle}
                  onLikeArticle={handleLikeArticle}
                  likedArticleIds={likedArticleIds}
                  onViewAll={() => setCurrentView('articles')}
                  showViewAll={activeCategory === 'Tous' && !searchQuery.trim()}
                />

                {/* Shimmering "Plus d'articles... Fetching GET /articles" footer section */}
                {activeCategory === 'Tous' && !searchQuery.trim() && articles.length > 3 && (
                  <div className="border-t border-stone-200 dark:border-stone-800 pt-12 pb-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-serif-title text-2xl font-bold text-stone-900 dark:text-stone-100">
                        Plus d'articles...
                      </h3>
                      <button
                        onClick={fetchArticles}
                        className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                        title="Actualiser les données"
                      >
                        <span>GET /articles</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* VIEW 2: ALL ARTICLES VIEW */}
        {currentView === 'articles' && (
          <div id="all-articles-view" className="py-8 sm:py-14 animate-in fade-in duration-300">
            <div className="mb-10 text-center max-w-4xl mx-auto">
              <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl font-black text-stone-950 dark:text-stone-50 tracking-tight">
                Tous les Articles
              </h1>
              <p className="mt-4 text-stone-600 dark:text-stone-300 text-lg sm:text-xl">
                L'ensemble de nos publications, essais et dossiers techniques.
              </p>
            </div>

            {/* Search & Categories */}
            <SearchBar
              query={searchQuery}
              onQueryChange={setSearchQuery}
              resultCount={filteredArticles.length}
              isFiltered={activeCategory !== 'Tous' || searchQuery.trim() !== ''}
              onClearFilters={handleResetFilters}
            />

            <CategoryFilter
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
                {filteredArticles.map((art) => (
                  <div key={art.id}>
                    <ArticleGrid
                      title=""
                      articles={[art]}
                      onReadArticle={handleReadArticle}
                      onLikeArticle={handleLikeArticle}
                      likedArticleIds={likedArticleIds}
                      showViewAll={false}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                type="search"
                query={searchQuery}
                onResetFilters={handleResetFilters}
                onPublishClick={() => setCurrentView('publish')}
              />
            )}
          </div>
        )}

        {/* VIEW 3: ARTICLE DETAIL VIEW */}
        {currentView === 'detail' && selectedArticle && (
          <ArticleDetail
            article={selectedArticle}
            allArticles={articles}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectArticle={handleReadArticle}
            onLike={handleLikeArticle}
            isLiked={likedArticleIds.has(selectedArticle.id)}
            onAddComment={handleAddComment}
            onNotify={(msg, type) => addToast(msg, type)}
          />
        )}

        {/* VIEW 4: PUBLISH ARTICLE VIEW */}
        {currentView === 'publish' && (
          <CreateArticleForm
            onSubmit={handlePublishArticle}
            onCancel={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 5: CATEGORIES DIRECTORY VIEW */}
        {currentView === 'categories' && (
          <CategoriesView
            articles={articles}
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReadArticle={handleReadArticle}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 6: ABOUT VIEW */}
        {currentView === 'about' && (
          <AboutView
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Floating Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Editorial Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
