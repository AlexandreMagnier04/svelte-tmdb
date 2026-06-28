<script lang="ts">
	import { favorites } from '$lib/stores/favorites.svelte';
	import FavoriteButton from '$lib/components/FavoriteButton.svelte';
</script>

<svelte:head>
	<title>Mes favoris · Cinémag</title>
</svelte:head>

<section class="mb-10">
	<p class="mb-2 text-sm font-medium tracking-widest text-emerald-400 uppercase">Ma liste</p>
	<h1 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">Mes favoris</h1>
	<p class="mt-3 text-zinc-400">{favorites.count} titre{favorites.count > 1 ? 's' : ''} sauvegardé{favorites.count > 1 ? 's' : ''}</p>
</section>

{#if favorites.items.length === 0}
	<div class="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-12 text-center">
		<p class="text-zinc-400">Aucun favori pour l'instant.</p>
		<p class="mt-2 text-sm text-zinc-600">Clique sur ♥ sur une fiche film ou série.</p>
	</div>
{:else}
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each favorites.items as item (item.id + item.kind)}
			<div class="group relative">
				<a href="/{item.kind === 'movie' ? 'movies' : 'series'}/{item.id}">
					{#if item.poster_path}
						<img
							src="https://image.tmdb.org/t/p/w342{item.poster_path}"
							alt={item.title}
							class="w-full rounded-xl object-cover shadow-lg transition group-hover:opacity-80"
						/>
					{:else}
						<div class="flex aspect-[2/3] w-full items-center justify-center rounded-xl bg-zinc-900 text-zinc-600">
							Pas d'image
						</div>
					{/if}
					<p class="mt-2 truncate text-sm font-medium text-zinc-200">{item.title}</p>
					<p class="text-xs text-zinc-500">{item.kind === 'movie' ? 'Film' : 'Série'}</p>
				</a>
				<div class="absolute top-2 right-2">
					<FavoriteButton {item} />
				</div>
			</div>
		{/each}
	</div>
{/if}
