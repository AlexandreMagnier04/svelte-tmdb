import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { authErrorMessage, signUp } from '$lib/services/auth';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.auth.getClaims();
	if (!error && data?.claims) {
		redirect(303, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ url, request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim();
		const password = String(formData.get('password') ?? '');
		const username = String(formData.get('username') ?? '').trim();

		const result = await signUp(supabase, {
			email,
			password,
			username,
			redirectTo: `${url.origin}/auth/callback`
		});

		if (!result.ok) {
			return fail(400, {
				email,
				username,
				message: authErrorMessage(result.error)
			});
		}

		if (result.data.hasSession) {
			redirect(303, '/');
		}

		return {
			success: true,
			message: 'Compte créé. Vérifie ton email pour confirmer ton inscription.'
		};
	}
};
