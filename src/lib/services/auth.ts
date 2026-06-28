import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuthError, AuthResult, SignInInput, SignUpInput } from '$lib/models/auth';

export async function signUp(
	supabase: SupabaseClient,
	input: SignUpInput
): Promise<AuthResult<{ hasSession: boolean }>> {
	const { email, password, username, redirectTo } = input;

	if (!email || !password || !username) {
		return { ok: false, error: { code: 'missing_fields' } };
	}
	if (password.length < 6) {
		return { ok: false, error: { code: 'password_too_short' } };
	}

	try {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { username },
				emailRedirectTo: redirectTo
			}
		});

		if (error) {
			return { ok: false, error: { code: 'supabase', message: error.message } };
		}
		if (data.user && data.user.identities && data.user.identities.length === 0) {
			return { ok: false, error: { code: 'email_taken' } };
		}

		return { ok: true, data: { hasSession: !!data.session } };
	} catch (e) {
		return {
			ok: false,
			error: {
				code: 'supabase',
				message: e instanceof Error ? e.message : 'Connexion à Supabase impossible.'
			}
		};
	}
}

export async function signIn(supabase: SupabaseClient, input: SignInInput): Promise<AuthResult> {
	const { email, password } = input;

	if (!email || !password) {
		return { ok: false, error: { code: 'missing_fields' } };
	}

	try {
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			return { ok: false, error: { code: 'invalid_credentials' } };
		}
		return { ok: true, data: undefined };
	} catch (e) {
		return {
			ok: false,
			error: {
				code: 'supabase',
				message: e instanceof Error ? e.message : 'Connexion à Supabase impossible.'
			}
		};
	}
}

export async function signOut(supabase: SupabaseClient): Promise<void> {
	try {
		await supabase.auth.signOut();
	} catch {
		// ignore : on redirige de toute façon vers /auth/login
	}
}

export function authErrorMessage(error: AuthError): string {
	switch (error.code) {
		case 'missing_fields':
			return 'Tous les champs sont requis.';
		case 'password_too_short':
			return 'Le mot de passe doit faire au moins 6 caractères.';
		case 'email_taken':
			return 'Cet email est déjà utilisé.';
		case 'invalid_credentials':
			return 'Identifiants invalides.';
		case 'supabase':
			return error.message ?? 'Une erreur est survenue.';
	}
}
