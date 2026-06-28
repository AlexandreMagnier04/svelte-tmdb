# Cinémag

Application web type Allociné — films & séries en streaming, construite avec SvelteKit 2 + Svelte 5 (runes), Supabase et l'API TMDB.

## Stack technique

| Couche      | Technologie                         |
| ----------- | ----------------------------------- |
| Framework   | SvelteKit 2 + Svelte 5 (runes mode) |
| Langage     | TypeScript strict                   |
| Style       | TailwindCSS v4                      |
| Auth & BDD  | Supabase (Auth + PostgreSQL + RLS)  |
| API contenu | TMDB API v3                         |
| Déploiement | Vercel                              |
| CI          | GitHub Actions                      |

## Fonctionnalités

- **Authentification** — inscription, connexion, déconnexion via Supabase Auth
- **Page d'accueil** — carrousels mixtes films + séries
- **Films** — 5 catégories (en salle, classiques, action, comédie, sci-fi) + tri par popularité / note / date
- **Séries** — 5 catégories (à l'antenne, incontournables, drame, comédie, sci-fi) + tri
- **Pages détail** — film ou série avec poster, backdrop, genres, synopsis, note
- **Favoris** — store Universal Reactivity (`$state` dans `.svelte.ts`), persisté en base Supabase avec mise à jour optimiste
- **Profil** — modification du nom d'utilisateur et du mot de passe
- **CI/CD** — GitHub Actions (lint + type check + build) + déploiement auto sur Vercel

## Ce qui n'a pas été implémenté

- **Recherche** (`/search`) — manque de temps, l'endpoint TMDB `/search/multi` est prêt à être intégré
- **Pagination** — les carrousels affichent la première page TMDB (20 résultats max)

## Difficultés rencontrées

### CI GitHub Actions

La CI échouait à cause de la règle ESLint `svelte/no-navigation-without-resolve` introduite dans une version récente de `eslint-plugin-svelte`. Cette règle interdit les `<a href>` sans passer par `resolve()`, ce qui est incompatible avec notre usage standard de SvelteKit. Solution : désactivation de la règle dans `eslint.config.js`.

### Supabase — détection email déjà utilisé

Supabase ne retourne pas d'erreur lors d'un `signUp` avec un email existant (protection contre l'énumération d'emails). Pour détecter ce cas, on vérifie `data.user.identities.length === 0` après l'appel — comportement non documenté.

### Universal Reactivity — `.svelte.ts`

Les fichiers `.svelte.ts` permettent d'utiliser les runes Svelte 5 (`$state`, `$derived`) hors des composants. Le store favoris utilise ce pattern avec une classe et des champs privés (`#items = $state([])`), ce qui n'est pas documenté dans les guides officiels SvelteKit.

## Installation

```bash
# Cloner le repo
git clone https://github.com/AlexandreMagnier04/svelte-tmdb.git
cd svelte-tmdb

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env
# Remplir PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, KEY_API_TMDB

# Lancer en dev
pnpm dev
```

## Variables d'environnement

```env
PUBLIC_SUPABASE_URL=...
PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
KEY_API_TMDB=...
```

## Structure du projet

```
src/
├── lib/
│   ├── components/          # Composants réutilisables
│   │   ├── MovieCard.svelte
│   │   ├── TvCard.svelte
│   │   ├── MediaCarousel.svelte
│   │   └── FavoriteButton.svelte
│   ├── server/
│   │   ├── db/models/       # Types TypeScript (Movie, TvShow, MovieDetail, auth...)
│   │   └── services/        # Logique métier (tmdb.ts, auth.ts)
│   └── stores/
│       └── favorites.svelte.ts  # Universal Reactivity ($state)
└── routes/
    ├── (app)/               # Routes protégées (guard dans +layout.server.ts)
    │   ├── movies/          # Liste + détail films
    │   ├── series/          # Liste + détail séries
    │   ├── favoris/         # Page favoris
    │   └── profil/          # Page profil + changement mot de passe
    ├── api/
    │   └── favorites/       # API REST pour sync favoris Supabase
    └── auth/                # Routes publiques (login, register, callback, logout)
```
