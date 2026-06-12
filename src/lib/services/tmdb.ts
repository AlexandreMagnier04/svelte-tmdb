import { KEY_API_TMDB } from '$env/static/private';
import type { Movie, TmdbPaginated } from '$lib/models/tmdb';

const BASE = 'https://api.themoviedb.org/3';

type FetchLike = typeof fetch;

async function tmdb<T>(path: string, fetchFn: FetchLike): Promise<T> {
	const sep = path.includes('?') ? '&' : '?';
	const url = `${BASE}${path}${sep}api_key=${KEY_API_TMDB}&language=fr-FR`;

	const res = await fetchFn(url, { headers: { Accept: 'application/json' } });
	if (!res.ok) {
		throw new Error(`TMDB ${res.status} ${res.statusText} on ${path}`);
	}
	return res.json() as Promise<T>;
}

export function getNowPlayingMovies(fetchFn: FetchLike = fetch) {
	return tmdb<TmdbPaginated<Movie>>('/movie/now_playing?region=FR', fetchFn);
}

export function getTopRatedMovies(fetchFn: FetchLike = fetch) {
	return tmdb<TmdbPaginated<Movie>>('/movie/top_rated', fetchFn);
}

export function discoverMoviesByGenre(genreId: number, fetchFn: FetchLike = fetch) {
	return tmdb<TmdbPaginated<Movie>>(
		`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&vote_count.gte=300`,
		fetchFn
	);
}
