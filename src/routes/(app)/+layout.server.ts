import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { FavoriteItem } from '$lib/stores/favorites.svelte';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.auth.getClaims();
	if (error || !data?.claims) redirect(303, '/auth/login');

	const {
		data: { user }
	} = await supabase.auth.getUser();

	let favorites: FavoriteItem[] = [];
	if (user) {
		const { data: rows } = await supabase
			.from('favorites')
			.select('media_id, media_type, title, poster_path')
			.eq('user_id', user.id);

		favorites = (rows ?? []).map((r) => ({
			id: r.media_id as number,
			kind: r.media_type as 'movie' | 'tv',
			title: r.title as string,
			poster_path: r.poster_path as string | null
		}));
	}

	return { claims: data.claims, favorites };
};
