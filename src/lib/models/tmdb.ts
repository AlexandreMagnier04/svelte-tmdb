export interface Movie {
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string;
	vote_average: number;
	vote_count: number;
	popularity: number;
	genre_ids: number[];
}

export interface TmdbPaginated<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export interface Genre {
	id: number;
	name: string;
}

export const MOVIE_GENRES = {
	ACTION: 28,
	COMEDY: 35,
	SCIENCE_FICTION: 878,
	DRAMA: 18,
	HORROR: 27,
	THRILLER: 53,
	ROMANCE: 10749,
	ANIMATION: 16
} as const;

export interface MovieCategory {
	key: string;
	label: string;
	movies: Movie[];
}
