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

<div class="max-w-md">
	<div class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
		<p class="mb-6 text-sm text-zinc-500">{data.email}</p>

		<form method="POST" action="?/update" use:enhance class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<label for="username" class="text-sm font-medium text-zinc-300"> Nom d'utilisateur </label>
				<input
					id="username"
					name="username"
					type="text"
					bind:value={username}
					class="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-zinc-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
				/>
			</div>

			{#if form?.error}
				<p class="text-sm text-red-400">{form.error}</p>
			{/if}

			{#if form?.success}
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
</div>
