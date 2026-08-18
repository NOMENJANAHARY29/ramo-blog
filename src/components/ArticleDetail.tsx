import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Heart, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  Send, 
  Sparkles,
  Check,
  Tag
} from 'lucide-react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

interface ArticleDetailProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onLike: (article: Article) => void;
  isLiked?: boolean;
  onAddComment?: (articleId: string, author: string, content: string) => void;
  onNotify?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  onLike,
  isLiked = false,
  onAddComment,
  onNotify,
}) => {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Related articles in same category or recent
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      if (onNotify) onNotify('Lien de l\'article copié dans le presse-papier !', 'success');
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    if (onNotify) {
      onNotify(
        !isBookmarked ? 'Article enregistré dans vos favoris' : 'Article retiré des favoris',
        'info'
      );
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    setIsSubmittingComment(true);
    if (onAddComment) {
      onAddComment(
        article.id,
        commentAuthor.trim() || 'Lecteur Ramo',
        commentContent.trim()
      );
    }
    setCommentContent('');
    setIsSubmittingComment(false);
    if (onNotify) onNotify('Commentaire publié avec succès', 'success');
  };

  // Helper to render formatted markdown-like content cleanly
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split('\n\n');

    return paragraphs.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Heading 2
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-10 mb-4 pt-4 border-t border-stone-200 dark:border-stone-800">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // Heading 3
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-serif-title text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 mt-8 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-8 pl-6 border-l-4 border-stone-900 dark:border-stone-300 italic text-stone-700 dark:text-stone-300 text-lg sm:text-xl font-editorial-body">
            {trimmed.replace(/^>\s*/, '').replace(/^"|"$/g, '')}
          </blockquote>
        );
      }

      // Code Block
      if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const code = lines.slice(1, -1).join('\n');
        return (
          <div key={idx} className="my-6 rounded-2xl overflow-hidden bg-stone-950 text-stone-100 border border-stone-800 shadow-sm">
            <div className="px-4 py-2 bg-stone-900 border-b border-stone-800 text-xs font-mono text-stone-400 flex items-center justify-between">
              <span>Extrait de code</span>
              <span>Typescript</span>
            </div>
            <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-emerald-300">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Bullet List
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n');
        return (
          <ul key={idx} className="my-4 space-y-2.5 pl-5 list-disc text-stone-700 dark:text-stone-300 leading-relaxed">
            {items.map((item, i) => {
              const cleanItem = item.replace(/^[\*\-\d\.]+\s*/, '');
              return (
                <li key={i} className="pl-1">
                  <span dangerouslySetInnerHTML={{ 
                    __html: cleanItem.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }} />
                </li>
              );
            })}
          </ul>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="my-5 text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-relaxed font-normal">
          <span dangerouslySetInnerHTML={{
            __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }} />
        </p>
      );
    });
  };

  return (
    <article id={`article-detail-${article.id}`} className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 animate-in fade-in duration-300">
      
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between mb-10 pb-5 border-b border-stone-200 dark:border-stone-800">
        <button
          type="button"
          id="detail-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm sm:text-base font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour aux articles</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            id="detail-bookmark-btn"
            onClick={handleBookmarkToggle}
            className={`p-3 rounded-full border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-600'
                : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            title="Enregistrer"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            type="button"
            id="detail-share-btn"
            onClick={handleShare}
            className="p-3 rounded-full border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Partager"
          >
            {isCopied ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="mb-10 sm:mb-12">
        <div className="flex flex-wrap items-center gap-3.5 mb-5">
          <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900">
            {article.category}
          </span>
          <span className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {article.createdAt}
          </span>
          <span className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif-title text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black text-stone-950 dark:text-stone-50 tracking-tight leading-[1.12]">
          {article.title}
        </h1>

        {/* Excerpt / Summary */}
        <p className="mt-6 text-xl sm:text-2xl md:text-2xl text-stone-600 dark:text-stone-300 font-editorial-body leading-relaxed italic">
          {article.summary}
        </p>

        {/* Author Card */}
        <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-stone-100/80 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img
              src={article.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={article.author}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full object-cover border border-stone-300 dark:border-stone-700"
            />
            <div>
              <div className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                {article.author}
              </div>
              <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium">
                {article.authorRole || 'Rédacteur Éditorial NOVA'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              id="detail-like-btn"
              onClick={() => onLike(article)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isLiked
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-rose-300'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : 'text-rose-500'}`} />
              <span>{article.likes} J'aime</span>
            </button>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="mb-14 rounded-3xl sm:rounded-4xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md">
        <img
          src={article.imageUrl}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full max-h-[640px] xl:max-h-[720px] object-cover"
        />
        <div className="p-3.5 bg-stone-100 dark:bg-stone-900 text-center text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-mono">
          NOVA BLOG Digital Journal • Photographie originale haute résolution
        </div>
      </div>

      {/* Main Formatted Article Content */}
      <div className="prose prose-stone dark:prose-invert max-w-none mb-12">
        {renderFormattedContent(article.content)}
      </div>

      {/* Article Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="py-6 border-t border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2 mb-12">
          <span className="text-xs font-semibold text-stone-500 flex items-center gap-1 mr-2">
            <Tag className="w-3.5 h-3.5" /> Tags :
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Comments Section */}
      <section id="comments-section" className="mb-16">
        <h3 className="font-serif-title text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-stone-500" />
          Commentaires ({article.comments?.length || 0})
        </h3>

        {/* Add comment form */}
        <form onSubmit={handleCommentSubmit} className="mb-8 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Votre nom ou pseudonyme"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              className="px-3.5 py-2 rounded-xl text-sm border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-400"
            />
          </div>
          <textarea
            placeholder="Partagez votre réflexion sur cet article..."
            rows={3}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-400 resize-y"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmittingComment || !commentContent.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white disabled:opacity-50 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Publier le commentaire
            </button>
          </div>
        </form>

        {/* Existing comments */}
        {article.comments && article.comments.length > 0 ? (
          <div className="space-y-4">
            {article.comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex gap-3.5"
              >
                <img
                  src={comment.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                  alt={comment.author}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {comment.author}
                    </span>
                    <span className="text-xs text-stone-400">{comment.createdAt}</span>
                  </div>
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-500 dark:text-stone-400 italic">
            Soyez le premier à commenter cet article.
          </p>
        )}
      </section>

      {/* Related Articles ("Articles similaires") */}
      {relatedArticles.length > 0 && (
        <section id="related-articles-section" className="pt-14 border-t border-stone-200 dark:border-stone-800">
          <h3 className="font-serif-title text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 mb-8">
            Articles similaires
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {relatedArticles.map((rel) => (
              <ArticleCard
                key={rel.id}
                article={rel}
                onRead={onSelectArticle}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
