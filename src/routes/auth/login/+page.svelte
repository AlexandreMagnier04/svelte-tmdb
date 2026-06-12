<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, SubmitFunction } from './$types';

	interface Props {
		form: ActionData;
	}
	let { form }: Props = $props();

	let loading = $state(false);

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Connexion · Cinémag</title>
</svelte:head>

<div
	class="rounded-2xl border border-emerald-900/40 bg-zinc-900/60 p-8 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl"
>
	<div class="mb-8 flex flex-col items-center gap-2">
		<div
			class="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/50"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 text-white"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect x="3" y="5" width="18" height="14" rx="2" />
				<path d="M3 9h18" />
				<path d="M7 5v14" />
				<path d="M17 5v14" />
			</svg>
		</div>
		<h1 class="text-2xl font-semibold tracking-tight text-zinc-50">Connexion</h1>
		<p class="text-sm text-zinc-400">Accède aux sorties de la semaine</p>
	</div>

	{#if form?.message}
		<div
			class="mb-6 rounded-lg border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-300"
		>
			{form.message}
		</div>
	{/if}

	<form method="POST" use:enhance={handleSubmit} class="flex flex-col gap-4">
		<div class="flex flex-col gap-1.5">
			<label for="email" class="text-sm font-medium text-zinc-300">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				placeholder="toi@exemple.com"
				value={form?.email ?? ''}
				required
				autocomplete="email"
				class="rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-2.5 text-zinc-100 placeholder-zinc-600 transition outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
			/>
		</div>

		<div class="flex flex-col gap-1.5">
			<label for="password" class="text-sm font-medium text-zinc-300">Mot de passe</label>
			<input
				id="password"
				name="password"
				type="password"
				placeholder="••••••••"
				required
				autocomplete="current-password"
				class="rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-2.5 text-zinc-100 placeholder-zinc-600 transition outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
			/>
		</div>

		<button
			type="submit"
			disabled={loading}
			class="mt-2 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 px-4 py-2.5 font-medium text-white shadow-lg shadow-emerald-900/40 transition hover:from-emerald-400 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
		>
			{#if loading}
				<span class="inline-flex items-center justify-center gap-2">
					<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
						<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25" />
						<path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
					</svg>
					Connexion…
				</span>
			{:else}
				Se connecter
			{/if}
		</button>
	</form>

	<p class="mt-6 text-center text-sm text-zinc-500">
		Pas encore de compte ?
		<a href="/auth/register" class="font-medium text-emerald-400 hover:text-emerald-300">
			Créer un compte
		</a>
	</p>
</div>

<p class="mt-6 text-center text-xs text-zinc-600">
	© {new Date().getFullYear()} Cinémag · projet B3
</p>
