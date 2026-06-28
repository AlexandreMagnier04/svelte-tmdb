import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const {
		data: { user }
	} = await locals.supabase.auth.getUser();
	if (!user) redirect(303, '/auth/login');

	const { data: profile } = await locals.supabase
		.from('profiles')
		.select('username')
		.eq('id', user.id)
		.single();

	return { username: profile?.username ?? '', email: user.email ?? '' };
};

export const actions: Actions = {
	update: async ({ request, locals }) => {
		const {
			data: { user }
		} = await locals.supabase.auth.getUser();
		if (!user) redirect(303, '/auth/login');

		const form = await request.formData();
		const username = String(form.get('username')).trim();

		if (!username) return fail(400, { error: "Le nom d'utilisateur est requis." });

		const { error } = await locals.supabase.from('profiles').update({ username }).eq('id', user.id);

		if (error) return fail(500, { error: 'Erreur lors de la mise à jour.' });

		return { success: true };
	}
};
