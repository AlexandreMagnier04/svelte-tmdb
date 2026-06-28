import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { signOut } from '$lib/server/services/auth';

export const POST: RequestHandler = async ({ locals: { supabase } }) => {
	await signOut(supabase);
	redirect(303, '/auth/login');
};
