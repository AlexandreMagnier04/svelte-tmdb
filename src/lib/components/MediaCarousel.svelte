<script lang="ts">
	// Carrousel horizontal qui affiche une rangée de cartes.

	import type { Movie, TvShow } from '$lib/server/db/models/tmdb';
	import MovieCard from './MovieCard.svelte';
	import TvCard from './TvCard.svelte';

	// garantit qu'on ne mélange pas films et séries dans le même appel
	type Props =
		| { title: string; kind: 'movie'; items: Movie[] }
		| { title: string; kind: 'tv'; items: TvShow[] };

	const props: Props = $props();
</script>

<section class="space-y-3">
	<div class="flex items-baseline justify-between">
		<h2 class="text-lg font-semibold tracking-tight text-zinc-100 sm:text-xl">
			{props.title}
		</h2>
		<span class="text-xs text-zinc-500">{props.items.length} titres</span>
	</div>

	{#if props.items.length === 0}
		<p class="rounded-lg border border-zinc-900 bg-zinc-900/40 p-6 text-sm text-zinc-500">
			Aucun titre dans cette catégorie pour l'instant.
		</p>
	{:else}
		<div
			class="-mx-6 flex gap-4 overflow-x-auto px-6 pb-3 [scrollbar-color:#27272a_transparent] [scrollbar-width:thin]"
		>
			{#if props.kind === 'movie'}
				{#each props.items as movie (movie.id)}
					<MovieCard {movie} />
				{/each}
			{:else}
				{#each props.items as show (show.id)}
					<TvCard {show} />
				{/each}
			{/if}
		</div>
	{/if}
</section>
