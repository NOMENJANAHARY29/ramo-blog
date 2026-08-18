import express from 'express';
import { INITIAL_ARTICLES } from '../src/data/initialArticles';
import { Article } from '../src/types';
import * as db from './db';

export function createApiRouter() {
  const router = express.Router();

  // GET /articles — récupère la liste (avec filtres optionnels ?category=&q=)
  const handleGetArticles = async (req: express.Request, res: express.Response) => {
    try {
      await db.seedIfEmpty(INITIAL_ARTICLES);
      const category = req.query.category as string | undefined;
      const query = req.query.q as string | undefined;
      const articles = await db.getArticles(category, query);
      res.json({ success: true, count: articles.length, data: articles });
    } catch (error) {
      console.error('GET /articles error:', error);
      res.status(500).json({ success: false, message: 'Erreur lors de la récupération des articles' });
    }
  };

  router.get('/articles', handleGetArticles);

  // GET /articles/:id — un seul article (incrémente les vues)
  router.get('/articles/:id', async (req, res) => {
    try {
      const article = await db.incrementViews(req.params.id);
      if (!article) {
        return res.status(404).json({ success: false, message: 'Article non trouvé' });
      }
      res.json({ success: true, data: article });
    } catch (error) {
      console.error('GET /articles/:id error:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
  });

  // POST /articles — crée un nouvel article
  router.post('/articles', async (req, res) => {
    try {
      const { title, category, content, imageUrl, summary, author, authorRole, tags } = req.body;

      // Validation côté serveur (défense en profondeur en plus du front)
      if (!title || !title.trim()) {
        return res.status(400).json({ success: false, error: 'Le titre est obligatoire.' });
      }
      if (!category || !category.trim()) {
        return res.status(400).json({ success: false, error: 'La catégorie est obligatoire.' });
      }
      if (!content || !content.trim()) {
        return res.status(400).json({ success: false, error: 'Le contenu est obligatoire.' });
      }

      const wordCount = content.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.ceil(wordCount / 200));
      const readTime = `${minutes} min read`;

      const defaultImages: Record<string, string> = {
        Technologie: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
        Web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
        IA: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=85',
        Cybersécurité: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85',
        Design: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85',
        Productivité: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85',
      };

      const finalImageUrl =
        imageUrl && imageUrl.trim().startsWith('http')
          ? imageUrl.trim()
          : defaultImages[category] || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85';

      const now = new Date();
      const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
      const formattedDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

      const newArticle: Article = {
        id: 'art-' + Date.now(),
        title: title.trim(),
        category,
        summary: summary?.trim() || content.trim().substring(0, 140) + '...',
        content: content.trim(),
        imageUrl: finalImageUrl,
        author: author?.trim() || 'Rédacteur NOVA',
        authorRole: authorRole?.trim() || 'Contributeur Editorial',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        createdAt: formattedDate,
        readTime,
        likes: 0,
        views: 1,
        tags: Array.isArray(tags) && tags.length > 0 ? tags : [category],
      };

      await db.insertArticle(newArticle);

      return res.status(201).json({ success: true, message: 'Article publié avec succès', data: newArticle });
    } catch (error) {
      console.error('POST /articles error:', error);
      return res.status(500).json({ success: false, error: "Impossible de publier l'article." });
    }
  });

  // POST /articles/:id/like
  router.post('/articles/:id/like', async (req, res) => {
    try {
      const likes = await db.incrementLikes(req.params.id);
      if (likes === null) {
        return res.status(404).json({ success: false, message: 'Article non trouvé' });
      }
      res.json({ success: true, likes });
    } catch (error) {
      console.error('POST /articles/:id/like error:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
  });

  // POST /articles/:id/comments
  router.post('/articles/:id/comments', async (req, res) => {
    try {
      const { author, content } = req.body;
      if (!content || !content.trim()) {
        return res.status(400).json({ success: false, message: 'Le commentaire ne peut pas être vide' });
      }
      const newComment = {
        id: 'c-' + Date.now(),
        author: author?.trim() || 'Lecteur Anonyme',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        content: content.trim(),
        createdAt: "À l'instant",
      };
      const ok = await db.addComment(req.params.id, newComment);
      if (!ok) {
        return res.status(404).json({ success: false, message: 'Article non trouvé' });
      }
      res.status(201).json({ success: true, data: newComment });
    } catch (error) {
      console.error('POST /articles/:id/comments error:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
  });

  // POST /reset — réinitialise aux données de démo (utile pour les démos / tests)
  router.post('/reset', async (req, res) => {
    try {
      await db.resetArticles(INITIAL_ARTICLES);
      res.json({ success: true, message: 'Données réinitialisées' });
    } catch (error) {
      console.error('POST /reset error:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
  });

  return router;
}

// App Express "pure API", sans app.listen() et sans middleware Vite —
// utilisée à la fois par le serveur de dev local et par la fonction serverless Vercel.
export function createApp() {
  const app = express();
  app.use(express.json());

  const apiRouter = createApiRouter();
  // On garde les deux préfixes pour respecter le libellé de l'énoncé (GET/POST /articles)
  // tout en suivant la convention Vercel (tout ce qui passe par une fonction serverless
  // vit sous /api pour ne jamais entrer en conflit avec les fichiers statiques).
  app.use('/api', apiRouter);
  app.use('/', apiRouter);

  return app;
}
