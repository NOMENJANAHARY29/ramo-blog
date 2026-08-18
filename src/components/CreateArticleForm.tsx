import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Image as ImageIcon, 
  AlertCircle, 
  Type, 
  Quote, 
  Code2, 
  List, 
  Check, 
  HelpCircle 
} from 'lucide-react';
import { ArticleCategory, CreateArticlePayload } from '../types';
import { ImagePreview } from './ImagePreview';

interface CreateArticleFormProps {
  onSubmit: (payload: CreateArticlePayload) => Promise<boolean>;
  onCancel: () => void;
}

const CATEGORIES: Exclude<ArticleCategory, 'Tous'>[] = [
  'Technologie',
  'Web',
  'IA',
  'Cybersécurité',
  'Design',
  'Productivité',
];

export const CreateArticleForm: React.FC<CreateArticleFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Exclude<ArticleCategory, 'Tous'>>('Technologie');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    category?: string;
    content?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { title?: string; category?: string; content?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Le titre est obligatoire.';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Le titre doit comporter au moins 5 caractères.';
    }

    if (!category) {
      newErrors.category = 'La catégorie est obligatoire.';
    }

    if (!content.trim()) {
      newErrors.content = 'Le contenu est obligatoire.';
    } else if (content.trim().length < 30) {
      newErrors.content = 'Le contenu doit être plus substantiel (au moins 30 caractères).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const success = await onSubmit({
      title: title.trim(),
      category,
      summary: summary.trim() || undefined,
      content: content.trim(),
      imageUrl: imageUrl.trim() || undefined,
      author: author.trim() || undefined,
      authorRole: authorRole.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined,
    });

    setIsSubmitting(false);
  };

  // Helper to insert formatting snippets into content textarea
  const insertSnippet = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('article-content-input') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || 'Texte d\'exemple';
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  return (
    <div id="create-article-view" className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 animate-in fade-in duration-300">
      
      {/* Header bar */}
      <div className="flex items-center justify-between mb-10 pb-5 border-b border-stone-200 dark:border-stone-800">
        <button
          type="button"
          id="form-cancel-top-btn"
          onClick={onCancel}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Annuler et retourner</span>
        </button>

        <span className="text-xs font-mono text-stone-400">
          POST /articles
        </span>
      </div>

      {/* Title & Introduction */}
      <div className="mb-10 max-w-3xl">
        <h1 className="font-serif-title text-4xl sm:text-5xl font-black text-stone-950 dark:text-stone-50 tracking-tight">
          Publier un nouvel article
        </h1>
        <p className="mt-3 text-stone-600 dark:text-stone-300 text-base sm:text-lg">
          Partagez vos analyses de pointe, vos découvertes technologiques ou vos réflexions de design avec les lecteurs de Ramo Blog.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Title Field */}
        <div className="space-y-2">
          <label 
            htmlFor="article-title-input" 
            className="block text-sm font-bold text-stone-900 dark:text-stone-100"
          >
            Titre de l'article <span className="text-rose-500">*</span>
          </label>
          <input
            id="article-title-input"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: undefined });
            }}
            placeholder="Entrez le titre de votre article"
            className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-base sm:text-lg font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
              errors.title
                ? 'border-rose-500 ring-1 ring-rose-500'
                : 'border-stone-300 dark:border-stone-700 focus:ring-stone-900 dark:focus:ring-stone-300'
            }`}
          />
          {errors.title && (
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Category & Tags Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category Selector */}
          <div className="space-y-2">
            <label 
              htmlFor="article-category-select" 
              className="block text-sm font-bold text-stone-900 dark:text-stone-100"
            >
              Catégorie <span className="text-rose-500">*</span>
            </label>
            <select
              id="article-category-select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value as Exclude<ArticleCategory, 'Tous'>);
                if (errors.category) setErrors({ ...errors, category: undefined });
              }}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-300 transition-all cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.category}
              </p>
            )}
          </div>

          {/* Tags Field */}
          <div className="space-y-2">
            <label 
              htmlFor="article-tags-input" 
              className="block text-sm font-bold text-stone-900 dark:text-stone-100"
            >
              Tags / Mots-clés <span className="text-xs text-stone-400 font-normal">(optionnel, séparés par virgules)</span>
            </label>
            <input
              id="article-tags-input"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Ex: Architecture, AI, Performance"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-300 transition-all"
            />
          </div>
        </div>

        {/* Summary Field */}
        <div className="space-y-2">
          <label 
            htmlFor="article-summary-input" 
            className="block text-sm font-bold text-stone-900 dark:text-stone-100"
          >
            Chapeau / Résumé <span className="text-xs text-stone-400 font-normal">(optionnel)</span>
          </label>
          <input
            id="article-summary-input"
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Une phrase concise pour accrocher le lecteur dans les flux et la grille..."
            className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-300 transition-all"
          />
        </div>

        {/* Content Field with Editor Toolbar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label 
              htmlFor="article-content-input" 
              className="block text-sm font-bold text-stone-900 dark:text-stone-100"
            >
              Contenu de l'article <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-stone-400">Supporte le Markdown simplifié</span>
          </div>

          {/* Quick Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5 p-2 bg-stone-100 dark:bg-stone-850 rounded-t-xl border-t border-x border-stone-300 dark:border-stone-700 text-xs">
            <button
              type="button"
              onClick={() => insertSnippet('\n## Titre de section\n\n')}
              className="px-2.5 py-1 rounded bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 border border-stone-200 dark:border-stone-700 font-semibold flex items-center gap-1"
              title="Ajouter un titre ##"
            >
              <Type className="w-3.5 h-3.5" /> Titre
            </button>
            <button
              type="button"
              onClick={() => insertSnippet('\n> "Une citation marquante..."\n\n')}
              className="px-2.5 py-1 rounded bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 border border-stone-200 dark:border-stone-700 font-semibold flex items-center gap-1"
              title="Ajouter une citation >"
            >
              <Quote className="w-3.5 h-3.5" /> Citation
            </button>
            <button
              type="button"
              onClick={() => insertSnippet('\n```typescript\n// Votre code ici\n```\n\n')}
              className="px-2.5 py-1 rounded bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 border border-stone-200 dark:border-stone-700 font-semibold flex items-center gap-1"
              title="Ajouter un bloc de code"
            >
              <Code2 className="w-3.5 h-3.5" /> Code
            </button>
            <button
              type="button"
              onClick={() => insertSnippet('\n* Point clé 1\n* Point clé 2\n* Point clé 3\n\n')}
              className="px-2.5 py-1 rounded bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 border border-stone-200 dark:border-stone-700 font-semibold flex items-center gap-1"
              title="Ajouter une liste à puces"
            >
              <List className="w-3.5 h-3.5" /> Liste
            </button>
          </div>

          <textarea
            id="article-content-input"
            rows={10}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content) setErrors({ ...errors, content: undefined });
            }}
            placeholder="Écrivez votre article ici... Utilisez ## pour les sous-titres, > pour les citations, ``` pour les extraits de code."
            className={`w-full px-4 py-3 rounded-b-xl border bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm sm:text-base font-normal leading-relaxed placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all font-mono resize-y ${
              errors.content
                ? 'border-rose-500 ring-1 ring-rose-500'
                : 'border-stone-300 dark:border-stone-700 focus:ring-stone-900 dark:focus:ring-stone-300'
            }`}
          />
          {errors.content && (
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.content}
            </p>
          )}
        </div>

        {/* Image URL & Live Preview */}
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="article-image-url-input" 
                className="block text-sm font-bold text-stone-900 dark:text-stone-100"
              >
                Image URL
              </label>
              <span className="text-xs text-stone-500 font-medium px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800">
                Optionnel
              </span>
            </div>
            <input
              id="article-image-url-input"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemple.com/image.jpg"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm font-mono placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-300 transition-all"
            />
          </div>

          {/* Real-time Image Preview */}
          <ImagePreview
            imageUrl={imageUrl}
            onSelectPreset={(presetUrl) => setImageUrl(presetUrl)}
            altText={title || 'Aperçu'}
          />
        </div>

        {/* Author Details (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <label 
              htmlFor="article-author-input" 
              className="block text-sm font-bold text-stone-900 dark:text-stone-100"
            >
              Nom de l'auteur <span className="text-xs text-stone-400 font-normal">(optionnel)</span>
            </label>
            <input
              id="article-author-input"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: Rameaux Joseph"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-300 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="article-author-role-input" 
              className="block text-sm font-bold text-stone-900 dark:text-stone-100"
            >
              Rôle / Titre de l'auteur <span className="text-xs text-stone-400 font-normal">(optionnel)</span>
            </label>
            <input
              id="article-author-role-input"
              type="text"
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              placeholder="Ex: Architecte Logiciel"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-300 transition-all"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-end gap-4">
          <button
            type="button"
            id="form-cancel-btn"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-3 rounded-full text-sm font-semibold border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
          >
            Annuler
          </button>

          <button
            type="submit"
            id="form-submit-publish-btn"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-sm font-bold bg-[#f97316] hover:bg-[#ea580c] text-white shadow-md hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer active:scale-95"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Publication en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Publier l'article</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
