<script lang="ts">
	import MediaCarousel from '$lib/components/MediaCarousel.svelte';
	import type { PageData } from './$types';
	import type { TvShow } from '$lib/models/tmdb';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	type SortKey = 'popularity' | 'rating' | 'date';
	let sortBy = $state<SortKey>('popularity');

	function sortShows(shows: TvShow[], key: SortKey): TvShow[] {
		return [...shows].sort((a, b) => {
			if (key === 'rating') return b.vote_average - a.vote_average;
			if (key === 'date') return b.first_air_date.localeCompare(a.first_air_date);
			return b.popularity - a.popularity;
		});
	}

	let sortedCategories = $derived(
		data.categories.map((cat) => ({ ...cat, shows: sortShows(cat.shows, sortBy) }))
	);
</script>

<svelte:head>
	<title>Séries · Cinémag</title>
</svelte:head>

<section class="mb-6">
	<p class="mb-2 text-sm font-medium tracking-widest text-emerald-400 uppercase">Séries</p>
	<h1 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
		Plonge dans les <span class="text-emerald-400">séries</span>
	</h1>
	<p class="mt-3 max-w-2xl text-zinc-400">
		Les séries du moment, les incontournables et les meilleures par genre.
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
		<option value="date">Date de diffusion</option>
	</select>
</div>

<div class="space-y-10">
	{#each sortedCategories as category (category.key)}
		<MediaCarousel title={category.label} kind="tv" items={category.shows} />
	{/each}
</div>
