import { createApp } from '../server/app';

// Vercel exécute ce fichier comme une fonction serverless Node.
// L'app Express est directement compatible (req, res) => ... donc on l'exporte telle quelle.
const app = createApp();

export default app;
