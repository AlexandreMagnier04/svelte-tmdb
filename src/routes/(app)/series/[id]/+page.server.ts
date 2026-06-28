import type { PageServerLoad } from './$types';
import { getTvShowById } from '$lib/server/services/tmdb';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const id = Number(params.id);
	if (isNaN(id)) error(404, 'Série introuvable');

	const show = await getTvShowById(id, fetch);
	return { show };
};
