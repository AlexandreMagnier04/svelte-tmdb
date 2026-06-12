<script lang="ts">
	import MediaCarousel from '$lib/components/MediaCarousel.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Films · Cinémag</title>
</svelte:head>

<section class="mb-10">
	<p class="mb-2 text-sm font-medium tracking-widest text-emerald-400 uppercase">Films</p>
	<h1 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
		Explore le <span class="text-emerald-400">cinéma</span>
	</h1>
	<p class="mt-3 max-w-2xl text-zinc-400">
		Les sorties du moment, les classiques incontournables et les meilleurs films par genre.
	</p>
</section>

<div class="space-y-10">
	{#each data.categories as category (category.key)}
		<MediaCarousel title={category.label} movies={category.movies} />
	{/each}
</div>
