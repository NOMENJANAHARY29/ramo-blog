import { Article } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Construire des expériences web modernes avec des architectures découplées',
    category: 'Technologie',
    summary: 'Comment les architectures headless, le rendu incrémental et les API composables redéfinissent la rapidité, la scalabilité et la résilience des applications web d\'entreprise.',
    content: `## La convergence des architectures modernes

Les architectures découplées (*headless* et composables) ne sont plus une simple tendance technique, mais le fondement même de la résilience numérique moderne. En séparant la couche de présentation visuelle de la logique métier et de la gestion de données, les équipes d'ingénierie obtiennent une vélocité sans précédent.

> "La séparation claire des responsabilités entre la source de vérité et les points de contact clients transforme chaque mise à jour en une opération chirurgicale sans risque de régression globale."

### 1. Du monolithique au composable

Dans un système monolithique classique, chaque modification du design ou de l'expérience utilisateur nécessite un déploiement complet de la pile applicative. À l'inverse, l'approche composable s'appuie sur des API normalisées :

* **Frontend agnostique** : Consommation de flux JSON typés via GraphQL ou REST.
* **Edge Computing** : Déplacement de la logique de routage et de cache au plus près des utilisateurs finaux.
* **Isomorphisme & Rendu Hybride** : Rendu statique incrémental (ISR) combiné à une réhydratation sélective.

\`\`\`typescript
// Exemple d'un composant de récupération découplé avec revalidation optimiste
export async function getArticleFeed(category?: string) {
  const endpoint = new URL('/api/articles', process.env.API_BASE_URL);
  if (category) endpoint.searchParams.set('category', category);
  
  const response = await fetch(endpoint.toString(), {
    headers: { 'Accept': 'application/json' },
    next: { revalidate: 60 } // Revalidation incrémentale
  });
  
  if (!response.ok) throw new Error('Erreur de synchronisation');
  return response.json();
}
\`\`\`

### 2. Performance et métriques réelles

La réduction du temps de premier octet (TTFB) et la fidélité de l'interaction (INP) deviennent optimales lorsque les couches de micro-services sont orchestrées via un middleware centralisé.

### 3. Conclusion et perspectives

Adopter une architecture découplée exige une rigueur sur la gouvernance des API et les contrats de schémas. Cependant, le gain d'agilité pour les créateurs de contenu et les développeurs justifie largement cette transition stratégique.`,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=85',
    author: 'Rameaux Joseph',
    authorRole: 'Architecte Logiciel & Édimestre',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    createdAt: '16 Août 2026',
    readTime: '6 min read',
    isFeatured: true,
    featuredOrder: 1,
    likes: 142,
    views: 1840,
    tags: ['Architecture', 'WebDev', 'Headless', 'Edge Computing']
  },
  {
    id: 'art-2',
    title: 'L\'évolution des modèles de langage en 2026',
    category: 'IA',
    summary: 'Une analyse approfondie des dernières avancées dans la compréhension du langage naturel, le raisonnement multimodal et leurs applications concrètes.',
    content: `## Les nouveaux horizons du raisonnement synthétique

L'année 2026 marque un tournant fondamental dans le domaine des modèles de fondation. Nous avons dépassé la phase de simple prédiction probabiliste de tokens pour entrer dans l'ère des agents autonomes capables de réflexion itérative et d'auto-correction.

### Les trois piliers de la génération 2026 :

1. **Raisonnement arborescent natif** : Les modèles évaluent plusieurs branches d'hypothèses avant de générer une conclusion définitive.
2. **Multimodalité continue** : Traitement synchrone du texte, de l'audio haute-fidélité, du flux vidéo et des environnements spatiaux 3D sans transcription intermédiaire.
3. **Efficacité énergétique radicale** : Quantification avancée et distillation permettant d'exécuter des modèles de 70B paramètres sur des puces edge basse consommation.

> "L'intelligence artificielle n'est plus un simple générateur de contenu : elle devient un système d'amplification cognitive intégré aux outils quotidiens."

Les applications dans le code, la recherche biomédicale et la gouvernance de données démontrent une précision multipliée par 4 par rapport aux modèles de 2024.`,
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=85',
    author: 'Camille Laurent',
    authorRole: 'Chercheuse en Intelligence Artificielle',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    createdAt: '14 Août 2026',
    readTime: '5 min read',
    isFeatured: true,
    featuredOrder: 2,
    likes: 98,
    views: 1220,
    tags: ['IA', 'NLP', 'DeepLearning', 'Agents']
  },
  {
    id: 'art-3',
    title: 'Minimalisme Éditorial : L\'art du vide',
    category: 'Design',
    summary: 'Comment l\'utilisation stratégique de l\'espace négatif influence la hiérarchie visuelle, réduit la charge cognitive et sublime l\'expérience de lecture.',
    content: `## Le silence visuel au service du sens

Dans une époque saturée de stimuli visuels incessants, le véritable luxe réside dans la retenue. Le minimalisme éditorial n'est pas un manque de contenu, mais l'élimination méticuleuse de tout ce qui distrait de l'essentiel.

### La règle du ratio 60/30/10 dans l'espace typographique

* **60% d'espace de respiration** : Marges généreuses, interlignage aéré et pauses visuelles.
* **30% de structure ordonnée** : Grilles modulaires strictes inspirées du style suisse international.
* **10% de contrastes de focalisation** : Titrages éditoriaux au fort caractère serif associés à un sans-serif géométrique précis.

\`\`\`css
/* Formule mathématique d'espacement rythmique */
.editorial-container {
  max-width: 68ch;
  margin-inline: auto;
  padding-block: clamp(2rem, 5vw, 6rem);
  line-height: 1.75;
  letter-spacing: -0.011em;
}
\`\`\`

Le respect du lecteur passe par la clarté du texte. Donner de l'espace à un mot, c'est lui accorder de l'importance.`,
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85',
    author: 'Elena Vance',
    authorRole: 'Directrice Artistique & Typographe',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    createdAt: '11 Août 2026',
    readTime: '8 min read',
    isFeatured: true,
    featuredOrder: 3,
    likes: 215,
    views: 2950,
    tags: ['Design', 'Typographie', 'Minimalisme', 'UX']
  },
  {
    id: 'art-4',
    title: 'Sécuriser les API RESTful dans les environnements cloud hybrides',
    category: 'Cybersécurité',
    summary: 'Les meilleures pratiques pour implémenter des couches de sécurité robustes, gérer l\'authentification sans état et prévenir les fuites de données.',
    content: `## La défense en profondeur des interfaces programmables

Avec l'omniprésence des architectures distribuées, l'API devient le premier vecteur d'attaque ciblé. La sécurisation ne peut plus être une surcouche tardive : elle doit être intégrée dès la conception même des routes.

### Mesures indispensables :

1. **Tokens éphémères & DPoP** : Démonstration de possession de clé au niveau de la couche d'application pour contrer le vol de JWT.
2. **Limitation de débit adaptative** : Algorithmes *Token Bucket* couplés à une analyse comportementale en temps réel.
3. **Validation stricte des payloads** : Sanitization systématique via des validateurs de schémas stricts (Zod / TypeBox).

La cryptographie asymétrique et la rotation automatique des certificats garantissent la souveraineté des échanges de données sensibles.`,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85',
    author: 'Alexandre Meyer',
    authorRole: 'Consultant Sécurité Cloud & SecOps',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    createdAt: '20 Août 2026',
    readTime: '7 min read',
    likes: 87,
    views: 1410,
    tags: ['Sécurité', 'API', 'Cloud', 'ZeroTrust']
  },
  {
    id: 'art-5',
    title: 'L\'intégration de l\'IA générative dans les workflows créatifs',
    category: 'IA',
    summary: 'Comment les outils basés sur l\'intelligence artificielle redéfinissent les processus de conception graphique, de rédaction et de prototypage rapide.',
    content: `## L'émergence du co-pilote créatif

Loin de remplacer l'intuition humaine, les modèles d'IA générative agissent comme de puissants amplificateurs d'idées. Le designer et le rédacteur ne partent plus d'une page blanche mais d'une matrice infinie de variations.

### Nouveaux paradigmes d'idéation :

* **Moodboards génératifs dynamiques** : Exploration de palettes et de textures en quelques secondes.
* **Prototypage textuel interactif** : Validation des tonalités éditoriales avant même la première maquette.
* **Génération de micro-copies contextuelles** : Personnalisation de l'expérience utilisateur selon les profils cibles.`,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    author: 'Sophie Delacroix',
    authorRole: 'Product Strategist',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    createdAt: '18 Août 2026',
    readTime: '6 min read',
    likes: 114,
    views: 1670,
    tags: ['IA', 'Créativité', 'Design', 'Workflow']
  },
  {
    id: 'art-6',
    title: 'Optimisation des performances : au-delà des métriques web classiques',
    category: 'Web',
    summary: 'Stratégies avancées pour réduire le temps de chargement perçu, optimiser le rendu DOM et dompter les Core Web Vitals en production.',
    content: `## La psychologie de la vitesse perçue

Un site affiché en 1 seconde peut paraître plus lent qu'un site affiché en 2 secondes si le premier subit des sauts de mise en page (CLS) ou bloque le thread principal lors des clics (INP).

### Techniques de pointe :

* **Priorisation des ressources critiques** avec \`fetchpriority="high"\` et préconnexions DNS ciblées.
* **Virtualisation fluide du DOM** pour les listes volumineuses d'articles et de médias.
* **Transitions d'affichage natives** (\`View Transitions API\`) procurant le confort d'une application native sans la lourdeur d'un bundle JavaScript démesuré.`,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    author: 'Julien Mercier',
    authorRole: 'Senior Web Performance Engineer',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    createdAt: '15 Août 2026',
    readTime: '4 min read',
    likes: 153,
    views: 2130,
    tags: ['WebPerf', 'CoreWebVitals', 'Frontend', 'JavaScript']
  },
  {
    id: 'art-7',
    title: 'Design Systems adaptatifs : Concevoir pour le multi-device en 2026',
    category: 'Design',
    summary: 'Structurer des tokens sémantiques universels capables d\'alimenter le web, les applications natives, les montres connectées et les interfaces spatiales.',
    content: `## L'avènement des Design Tokens sémantiques à n dimensions

Concevoir un bouton pour un écran d'ordinateur ou pour une interface en réalité augmentée requiert une abstraction commune. Les Design Systems modernes séparent la valeur brute de l'intention sémantique.

### Les 3 niveaux de tokens :
1. **Tokens de référence** : Valeurs absolues (ex: \`color-neutral-900: #0f172a\`).
2. **Tokens système** : Intentions d'usage (ex: \`surface-primary-subtle: var(--color-neutral-100)\`).
3. **Tokens de composants** : Applications spécifiques (ex: \`card-editorial-border: var(--surface-border-subtle)\`).

Cette discipline garantit une cohérence absolue à travers des dizaines de plateformes avec un coût de maintenance minimal.`,
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=85',
    author: 'Elena Vance',
    authorRole: 'Directrice Artistique & Typographe',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    createdAt: '12 Août 2026',
    readTime: '5 min read',
    likes: 132,
    views: 1890,
    tags: ['DesignSystem', 'Tokens', 'UI/UX', 'Figma']
  },
  {
    id: 'art-8',
    title: 'La révolution de la productivité par le Deep Work asynchrone',
    category: 'Productivité',
    summary: 'Comment libérer jusqu\'à 4 heures de concentration quotidienne en remplaçant les réunions synchrones par une documentation éditoriale limpide.',
    content: `## L'écrit comme moteur de décision

Les équipes les plus performantes du monde ne passent pas leurs journées en visioconférence. Elles ont érigé la culture de l'écrit au rang de super-pouvoir organisationnel.

> "Une réflexion écrite oblige à clarifier sa pensée, élimine les ambiguïtés et permet à chacun de contribuer à son propre rythme biologique."

### Le protocole du deep work :
* **Blocs de concentration sanctuarisés** : 3 heures consécutives sans notifications.
* **Mémos de décision de 2 pages** plutôt que des réunions de cadrage de 60 minutes.
* **Validation par commentaires annotés** avec délais de réponse asynchrones respectueux.`,
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85',
    author: 'Marc Vignal',
    authorRole: 'Productivity & Organization Strategist',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    createdAt: '10 Août 2026',
    readTime: '6 min read',
    likes: 178,
    views: 2450,
    tags: ['Productivité', 'DeepWork', 'Organisation', 'Remote']
  }
];
