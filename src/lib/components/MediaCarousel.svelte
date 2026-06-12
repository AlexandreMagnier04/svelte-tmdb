<script lang="ts">
	import type { Movie } from '$lib/models/tmdb';
	import MovieCard from './MovieCard.svelte';

	interface Props {
		title: string;
		movies: Movie[];
	}
	let { title, movies }: Props = $props();
</script>

<section class="space-y-3">
	<div class="flex items-baseline justify-between">
		<h2 class="text-lg font-semibold tracking-tight text-zinc-100 sm:text-xl">
			{title}
		</h2>
		<span class="text-xs text-zinc-500">{movies.length} titres</span>
	</div>

	{#if movies.length === 0}
		<p class="rounded-lg border border-zinc-900 bg-zinc-900/40 p-6 text-sm text-zinc-500">
			Aucun film dans cette catégorie pour l'instant.
		</p>
	{:else}
		<div
			class="-mx-6 flex gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:thin] [scrollbar-color:#27272a_transparent]"
		>
			{#each movies as movie (movie.id)}
				<MovieCard {movie} />
			{/each}
		</div>
	{/if}
</section>
