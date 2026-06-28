<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}
	let { data, form }: Props = $props();

	let username = $state(data.username);
</script>

<svelte:head>
	<title>Mon profil · Cinémag</title>
</svelte:head>

<section class="mb-10">
	<p class="mb-2 text-sm font-medium tracking-widest text-emerald-400 uppercase">Compte</p>
	<h1 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">Mon profil</h1>
</section>

<div class="flex max-w-md flex-col gap-6">
	<!-- Username -->
	<div class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
		<h2 class="mb-4 text-sm font-semibold text-zinc-300 uppercase tracking-widest">Informations</h2>
		<p class="mb-6 text-sm text-zinc-500">{data.email}</p>

		<form method="POST" action="?/update" use:enhance class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<label for="username" class="text-sm font-medium text-zinc-300">Nom d'utilisateur</label>
				<input
					id="username"
					name="username"
					type="text"
					bind:value={username}
					class="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-zinc-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
				/>
			</div>

			{#if form?.updateError}
				<p class="text-sm text-red-400">{form.updateError}</p>
			{/if}
			{#if form?.updateSuccess}
				<p class="text-sm text-emerald-400">Profil mis à jour ✓</p>
			{/if}

			<button
				type="submit"
				class="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
			>
				Enregistrer
			</button>
		</form>
	</div>

	<!-- Password -->
	<div class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
		<h2 class="mb-4 text-sm font-semibold text-zinc-300 uppercase tracking-widest">Mot de passe</h2>

		<form method="POST" action="?/password" use:enhance class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<label for="password" class="text-sm font-medium text-zinc-300">Nouveau mot de passe</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="••••••••"
					class="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-zinc-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
				/>
			</div>
			<div class="flex flex-col gap-1">
				<label for="confirm" class="text-sm font-medium text-zinc-300">Confirmer</label>
				<input
					id="confirm"
					name="confirm"
					type="password"
					placeholder="••••••••"
					class="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-zinc-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
				/>
			</div>

			{#if form?.passwordError}
				<p class="text-sm text-red-400">{form.passwordError}</p>
			{/if}
			{#if form?.passwordSuccess}
				<p class="text-sm text-emerald-400">Mot de passe mis à jour ✓</p>
			{/if}

			<button
				type="submit"
				class="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
			>
				Changer le mot de passe
			</button>
		</form>
	</div>
</div>
