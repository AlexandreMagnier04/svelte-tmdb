import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	const { data: { user } } = await locals.supabase.auth.getUser();
	if (!user) return json([], { status: 401 });

	const { data } = await locals.supabase
		.from('favorites')
		.select('media_id, media_type, title, poster_path')
		.eq('user_id', user.id);

	return json(data ?? []);
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const { data: { user } } = await locals.supabase.auth.getUser();
	if (!user) return json({ error: 'Non autorisé' }, { status: 401 });

	const { id, kind, title, poster_path } = await request.json();

	await locals.supabase.from('favorites').upsert({
		user_id: user.id,
		media_id: id,
		media_type: kind,
		title,
		poster_path
	}, { onConflict: 'user_id,media_id,media_type' });

	return json({ ok: true });
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	const { data: { user } } = await locals.supabase.auth.getUser();
	if (!user) return json({ error: 'Non autorisé' }, { status: 401 });

	const { id, kind } = await request.json();

	await locals.supabase
		.from('favorites')
		.delete()
		.eq('user_id', user.id)
		.eq('media_id', id)
		.eq('media_type', kind);

	return json({ ok: true });
};
