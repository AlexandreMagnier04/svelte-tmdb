import type { PageServerLoad } from './$types';
import { discoverTvShowsByGenre, getOnTheAirTvShows, getTopRatedTvShows } from '$lib/server/services/tmdb';
import { TV_GENRES, type TvCategory } from '$lib/server/db/models/tmdb';

export const load: PageServerLoad = async ({ fetch }) => {
	const [nowPlaying, topRated, drama, comedy, scifi] = await Promise.all([
		getOnTheAirTvShows(fetch),
		getTopRatedTvShows(fetch),
		discoverTvShowsByGenre(TV_GENRES.DRAMA, fetch),
		discoverTvShowsByGenre(TV_GENRES.COMEDY, fetch),
		discoverTvShowsByGenre(TV_GENRES.SCI_FI_FANTASY, fetch)
	]);

	const categories: TvCategory[] = [
		{ key: 'now_playing', label: 'Actuellement à la télévision', shows: nowPlaying.results },
		{ key: 'top_rated', label: 'Les incontournables', shows: topRated.results },
		{ key: 'drama', label: 'Drame', shows: drama.results },
		{ key: 'comedy', label: 'Comédie', shows: comedy.results },
		{ key: 'scifi', label: 'Sci-Fi & Fantasy', shows: scifi.results }
	];

	return { categories };
};
