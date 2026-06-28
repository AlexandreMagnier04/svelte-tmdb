<script lang="ts">
	import MediaCarousel from '$lib/components/MediaCarousel.svelte';
	import type { PageData } from './$types';
	import type { Movie } from '$lib/server/db/models/tmdb';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	type SortKey = 'popularity' | 'rating' | 'date';
	let sortBy = $state<SortKey>('popularity');

	function sortMovies(movies: Movie[], key: SortKey): Movie[] {
		return [...movies].sort((a, b) => {
			if (key === 'rating') return b.vote_average - a.vote_average;
			if (key === 'date') return b.release_date.localeCompare(a.release_date);
			return b.popularity - a.popularity;
		});
	}

	let sortedCategories = $derived(
		data.categories.map((cat) => ({ ...cat, movies: sortMovies(cat.movies, sortBy) }))
	);
</script>

<svelte:head>
	<title>Films · Cinémag</title>
</svelte:head>

<section class="mb-6">
	<p class="mb-2 text-sm font-medium tracking-widest text-emerald-400 uppercase">Films</p>
	<h1 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
		Explore le <span class="text-emerald-400">cinéma</span>
	</h1>
	<p class="mt-3 max-w-2xl text-zinc-400">
		Les sorties du moment, les classiques incontournables et les meilleurs films par genre.
	</p>
</section>

<div class="mb-8 flex items-center gap-3">
	<span class="text-sm text-zinc-500">Trier par</span>
	<select
		bind:value={sortBy}
		class="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 outline-none focus:border-emerald-500"
	>
		<option value="popularity">Popularité</option>
		<option value="rating">Note</option>
		<option value="date">Date de sortie</option>
	</select>
</div>

<div class="space-y-10">
	{#each sortedCategories as category (category.key)}
		<MediaCarousel title={category.label} kind="movie" items={category.movies} />
	{/each}
</div>
