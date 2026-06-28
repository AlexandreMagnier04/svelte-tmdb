import type { PageServerLoad } from './$types';
import {
    getNowPlayingMovies,
    getTopRatedMovies,
    getOnTheAirTvShows,
    getTopRatedTvShows
} from '$lib/server/services/tmdb';

export const load: PageServerLoad = async ({ fetch }) => {
    const [nowPlaying, topRatedMovies, onTheAir, topRatedShows] = await Promise.all([
        getNowPlayingMovies(fetch),
        getTopRatedMovies(fetch),
        getOnTheAirTvShows(fetch),
        getTopRatedTvShows(fetch)
    ]);

    return {
        nowPlaying: nowPlaying.results.slice(0, 10),
        topRatedMovies: topRatedMovies.results.slice(0, 10),
        onTheAir: onTheAir.results.slice(0, 10),
        topRatedShows: topRatedShows.results.slice(0, 10)
    };
};
