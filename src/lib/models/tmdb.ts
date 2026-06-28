//Types TMDB partagés par toute l'app.


// Films 

export interface Movie {
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string; // format "YYYY-MM-DD"
	vote_average: number; // 0–10
	vote_count: number;
	popularity: number;
	genre_ids: number[];
}

// Séries 

export interface TvShow {
	id: number;
	name: string;
	original_name: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	popularity: number;
	genre_ids: number[];
}

// Résultats paginés

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

// Constantes de genres

//--Films--
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

//--Séries--
export const TV_GENRES = {
	ACTION_ADVENTURE: 10759,
	COMEDY: 35,
	DRAMA: 18,
	SCI_FI_FANTASY: 10765,
	CRIME: 80,
	MYSTERY: 9648,
	ANIMATION: 16,
	DOCUMENTARY: 99
} as const;

// Catégories de films (/movies).
export interface MovieCategory {
	key: string;
	label: string;
	movies: Movie[];
}

// Catégories de séries (/series).
export interface TvCategory {
	key: string;
	label: string;
	shows: TvShow[];
}

// Détail film
export interface MovieDetail extends Movie {
	tagline: string;
	runtime: number | null;
	status: string;
	budget: number;
	revenue: number;
	genres: Genre[];
}

// Détail série 
export interface TvShowDetail extends TvShow {
	tagline: string;
	status: string;
	number_of_seasons: number;
	number_of_episodes: number;
	genres: Genre[];
}
