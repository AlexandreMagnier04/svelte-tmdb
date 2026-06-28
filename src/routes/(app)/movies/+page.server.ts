import type { PageServerLoad } from './$types';
import { discoverMoviesByGenre, getNowPlayingMovies, getTopRatedMovies } from '$lib/server/services/tmdb';
import { MOVIE_GENRES, type MovieCategory } from '$lib/server/db/models/tmdb';

export const load: PageServerLoad = async ({ fetch }) => {
	const [nowPlaying, topRated, comedy, action, scifi] = await Promise.all([
		getNowPlayingMovies(fetch),
		getTopRatedMovies(fetch),
		discoverMoviesByGenre(MOVIE_GENRES.COMEDY, fetch),
		discoverMoviesByGenre(MOVIE_GENRES.ACTION, fetch),
		discoverMoviesByGenre(MOVIE_GENRES.SCIENCE_FICTION, fetch)
	]);

	const categories: MovieCategory[] = [
		{ key: 'now_playing', label: 'En ce moment au cinéma', movies: nowPlaying.results },
		{ key: 'top_rated', label: 'Les classiques', movies: topRated.results },
		{ key: 'comedy', label: 'Comédie', movies: comedy.results },
		{ key: 'action', label: 'Action', movies: action.results },
		{ key: 'scifi', label: 'Science-fiction', movies: scifi.results }
	];

	return { categories };
};
