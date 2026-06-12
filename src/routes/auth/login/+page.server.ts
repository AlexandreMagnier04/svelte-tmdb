import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { authErrorMessage, signIn } from '$lib/services/auth';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.auth.getClaims();
	if (!error && data?.claims) {
		redirect(303, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim();
		const password = String(formData.get('password') ?? '');

		const result = await signIn(supabase, { email, password });

		if (!result.ok) {
			return fail(400, { email, message: authErrorMessage(result.error) });
		}

		redirect(303, '/');
	}
};
