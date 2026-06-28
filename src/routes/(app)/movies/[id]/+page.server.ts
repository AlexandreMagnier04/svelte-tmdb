import type { PageServerLoad } from './$types';
import { getMovieById } from '$lib/services/tmdb';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const id = Number(params.id);
	if (isNaN(id)) error(404, 'Film introuvable');

	const movie = await getMovieById(id, fetch);
	return { movie };
};
