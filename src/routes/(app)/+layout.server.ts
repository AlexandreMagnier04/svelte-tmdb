import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
        redirect(303, '/auth/login');
    }
    return { claims: data.claims };
};
