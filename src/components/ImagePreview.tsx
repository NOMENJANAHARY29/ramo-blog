import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, RefreshCw, Check } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  onSelectPreset?: (url: string) => void;
  altText?: string;
}

const PRESET_IMAGES = [
  {
    name: 'Tech & Code',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Neural AI',
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Minimal Design',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Cyber Cloud',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Workspace Desk',
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Editorial Journal',
    url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=85',
  },
];

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onSelectPreset, altText = 'Aperçu' }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset states on URL change
  React.useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [imageUrl]);

  return (
    <div id="image-preview-container" className="space-y-3">
      <div className="flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400">
        <span className="flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5" />
          Aperçu de la couverture
        </span>
        {imageUrl && !hasError && (
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Check className="w-3 h-3" /> Image valide
          </span>
        )}
      </div>

      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900/60 flex items-center justify-center">
        {imageUrl && !hasError ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-100 dark:bg-stone-900 animate-pulse">
                <RefreshCw className="w-5 h-5 text-stone-400 animate-spin" />
              </div>
            )}
            <img
              src={imageUrl}
              alt={altText}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          </>
        ) : (
          <div className="text-center p-6 text-stone-400 dark:text-stone-500">
            <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50 stroke-[1.5]" />
            <p className="text-sm font-medium">
              {hasError ? 'Impossible de charger cette image' : 'Aucune image spécifiée'}
            </p>
            <p className="text-xs text-stone-400 mt-1">
              {hasError ? 'Vérifiez le lien URL ou choisissez une suggestion ci-dessous' : 'Une image par défaut adaptée à la catégorie sera utilisée'}
            </p>
          </div>
        )}
      </div>

      {onSelectPreset && (
        <div className="pt-2">
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Suggestions d'images éditoriales haute définition :
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {PRESET_IMAGES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                id={`preset-img-${idx}`}
                onClick={() => onSelectPreset(preset.url)}
                className={`group relative rounded-lg overflow-hidden border text-left text-xs transition-all ${
                  imageUrl === preset.url
                    ? 'border-stone-900 dark:border-stone-100 ring-2 ring-stone-900 dark:ring-stone-100'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200">
                  <img
                    src={preset.url}
                    alt={preset.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-1 bg-stone-50 dark:bg-stone-900 truncate font-medium text-[10px] text-stone-700 dark:text-stone-300 text-center">
                  {preset.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
