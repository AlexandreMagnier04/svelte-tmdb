export type AuthErrorCode =
	| 'missing_fields'
	| 'password_too_short'
	| 'email_taken'
	| 'invalid_credentials'
	| 'supabase';

export interface AuthError {
	code: AuthErrorCode;
	message?: string;
}

export interface SignUpInput {
	email: string;
	password: string;
	username: string;
	redirectTo: string;
}

export interface SignInInput {
	email: string;
	password: string;
}

export type AuthResult<T = void> =
	| { ok: true; data: T }
	| { ok: false; error: AuthError };
