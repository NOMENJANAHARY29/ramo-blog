import mysql from 'mysql2/promise';
import { Article, Comment } from '../src/types';

// DATABASE_URL est une chaîne de connexion MySQL, ex:
// mysql://user:password@host:3306/dbname
// Fournie par ton hébergeur MySQL (Aiven, Railway, Clever Cloud, etc.).
// En local, mets-la dans .env.local (voir README.md).
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // la plupart des MySQL gratuits (Aiven...) exigent TLS
  connectionLimit: 5,
  waitForConnections: true,
});

let schemaReady: Promise<void> | null = null;

// Crée la table si elle n'existe pas encore (idempotent, appelé avant chaque requête)
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = pool
      .query(
        `
        CREATE TABLE IF NOT EXISTS articles (
          id VARCHAR(64) PRIMARY KEY,
          title VARCHAR(500) NOT NULL,
          category VARCHAR(100) NOT NULL,
          summary TEXT,
          content LONGTEXT NOT NULL,
          image_url TEXT,
          author VARCHAR(255),
          author_role VARCHAR(255),
          author_avatar TEXT,
          created_at VARCHAR(100),
          created_ts TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          read_time VARCHAR(50),
          is_featured BOOLEAN DEFAULT FALSE,
          featured_order INT,
          likes INT DEFAULT 0,
          views INT DEFAULT 0,
          tags JSON,
          comments JSON
        ) ENGINE=InnoDB;
        `
      )
      .then(() => undefined);
  }
  return schemaReady;
}

function rowToArticle(row: any): Article {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    summary: row.summary,
    content: row.content,
    imageUrl: row.image_url,
    author: row.author,
    authorRole: row.author_role ?? undefined,
    authorAvatar: row.author_avatar ?? undefined,
    createdAt: row.created_at,
    readTime: row.read_time,
    isFeatured: !!row.is_featured,
    featuredOrder: row.featured_order ?? undefined,
    likes: row.likes ?? 0,
    views: row.views ?? 0,
    tags: row.tags ?? [],
    comments: row.comments ?? [],
  };
}

export async function insertArticle(a: Article): Promise<void> {
  await ensureSchema();
  await pool.query(
    `
    INSERT INTO articles (
      id, title, category, summary, content, image_url, author, author_role,
      author_avatar, created_at, read_time, is_featured, featured_order,
      likes, views, tags, comments
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE id = id;
    `,
    [
      a.id,
      a.title,
      a.category,
      a.summary,
      a.content,
      a.imageUrl,
      a.author,
      a.authorRole ?? null,
      a.authorAvatar ?? null,
      a.createdAt,
      a.readTime,
      a.isFeatured ?? false,
      a.featuredOrder ?? null,
      a.likes ?? 0,
      a.views ?? 0,
      JSON.stringify(a.tags ?? []),
      JSON.stringify(a.comments ?? []),
    ]
  );
}

// Insère les articles de démonstration une seule fois (base vide) pour que le site
// ne soit jamais vide au premier chargement, sans jamais écraser des articles existants.
export async function seedIfEmpty(initial: Article[]): Promise<void> {
  await ensureSchema();
  const [rows] = (await pool.query('SELECT COUNT(*) AS count FROM articles;')) as any[];
  if (rows[0].count === 0) {
    for (const article of initial) {
      await insertArticle(article);
    }
  }
}

export async function getArticles(category?: string, query?: string): Promise<Article[]> {
  await ensureSchema();
  const [rows] = (await pool.query('SELECT * FROM articles ORDER BY created_ts DESC;')) as any[];
  let articles = (rows as any[]).map(rowToArticle);

  if (category && category !== 'Tous') {
    articles = articles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }
  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary?.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }
  return articles;
}

export async function getArticleById(id: string): Promise<Article | null> {
  await ensureSchema();
  const [rows] = (await pool.query('SELECT * FROM articles WHERE id = ?;', [id])) as any[];
  return rows[0] ? rowToArticle(rows[0]) : null;
}

export async function incrementViews(id: string): Promise<Article | null> {
  await ensureSchema();
  await pool.query('UPDATE articles SET views = views + 1 WHERE id = ?;', [id]);
  const [rows] = (await pool.query('SELECT * FROM articles WHERE id = ?;', [id])) as any[];
  return rows[0] ? rowToArticle(rows[0]) : null;
}

export async function incrementLikes(id: string): Promise<number | null> {
  await ensureSchema();
  await pool.query('UPDATE articles SET likes = likes + 1 WHERE id = ?;', [id]);
  const [rows] = (await pool.query('SELECT likes FROM articles WHERE id = ?;', [id])) as any[];
  return rows[0] ? rows[0].likes : null;
}

export async function addComment(id: string, comment: Comment): Promise<boolean> {
  await ensureSchema();
  const [rows] = (await pool.query('SELECT comments FROM articles WHERE id = ?;', [id])) as any[];
  if (!rows[0]) return false;
  const comments: Comment[] = rows[0].comments ?? [];
  comments.push(comment);
  await pool.query('UPDATE articles SET comments = ? WHERE id = ?;', [JSON.stringify(comments), id]);
  return true;
}

export async function resetArticles(initial: Article[]): Promise<void> {
  await ensureSchema();
  await pool.query('DELETE FROM articles;');
  for (const article of initial) {
    await insertArticle(article);
  }
}
