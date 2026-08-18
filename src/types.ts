export type ArticleCategory = 
  | 'Tous'
  | 'Technologie'
  | 'Web'
  | 'IA'
  | 'Cybersécurité'
  | 'Design'
  | 'Productivité';

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  createdAt: string;
  readTime: string;
  isFeatured?: boolean;
  featuredOrder?: number;
  likes: number;
  views: number;
  tags?: string[];
  comments?: Comment[];
}

export interface CreateArticlePayload {
  title: string;
  category: Exclude<ArticleCategory, 'Tous'>;
  summary?: string;
  content: string;
  imageUrl?: string;
  author?: string;
  authorRole?: string;
  tags?: string[];
}

export type ViewMode = 'home' | 'articles' | 'detail' | 'publish' | 'categories' | 'about';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
