import { KEY_API_TMDB } from '$env/static/private';
import type { Movie, MovieDetail, TmdbPaginated, TvShow, TvShowDetail } from '$lib/models/tmdb';

const BASE = 'https://api.themoviedb.org/3';

//On accepte la fonction fetch en paramètre pour pouvoir passer le fetch de SvelteKit

type FetchLike = typeof fetch;

// Helper pour construire l'url ajoute la clé API et la langue

async function tmdb<T>(path: string, fetchFn: FetchLike): Promise<T> {
	const sep = path.includes('?') ? '&' : '?';
	const url = `${BASE}${path}${sep}api_key=${KEY_API_TMDB}&language=fr-FR`;

	const res = await fetchFn(url, { headers: { Accept: 'application/json' } });
	if (!res.ok) {
		throw new Error(`TMDB ${res.status} ${res.statusText} on ${path}`);
	}
	return res.json() as Promise<T>;
}

// --- Films ---
// Films actuellement à l'affiche en France.
export function getNowPlayingMovies(fetchFn: FetchLike = fetch) {
	return tmdb<TmdbPaginated<Movie>>('/movie/now_playing?region=FR', fetchFn);
}

// Films les mieux notés de tous les temps (utilisé pour "Les classiques").
export function getTopRatedMovies(fetchFn: FetchLike = fetch) {
	return tmdb<TmdbPaginated<Movie>>('/movie/top_rated', fetchFn);
}

// Films d'un genre donné, triés par popularité.
export function discoverMoviesByGenre(genreId: number, fetchFn: FetchLike = fetch) {
	return tmdb<TmdbPaginated<Movie>>(
		`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&vote_count.gte=300`,
		fetchFn
	);
}

// --- Séries ---

// Séries diffusées actuellement
export function getOnTheAirTvShows(fetchFn: FetchLike = fetch) {
	return tmdb<TmdbPaginated<TvShow>>('/tv/on_the_air', fetchFn);
}

// Séries les mieux notées de tous les temps.
export function getTopRatedTvShows(fetchFn: FetchLike = fetch) {
	return tmdb<TmdbPaginated<TvShow>>('/tv/top_rated', fetchFn);
}

// Séries d'un genre donné, triées par popularité.
export function discoverTvShowsByGenre(genreId: number, fetchFn: FetchLike = fetch) {
	return tmdb<TmdbPaginated<TvShow>>(
		`/discover/tv?with_genres=${genreId}&sort_by=popularity.desc&vote_count.gte=200`,
		fetchFn
	);
}

// Détail d'un film par son ID
export function getMovieById(id: number, fetchFn: FetchLike = fetch) {
	return tmdb<MovieDetail>(`/movie/${id}`, fetchFn);
}

// Détail d'une série par son ID
export function getTvShowById(id: number, fetchFn: FetchLike = fetch) {
	return tmdb<TvShowDetail>(`/tv/${id}`, fetchFn);
}
