<script lang="ts">
	import MediaCarousel from '$lib/components/MediaCarousel.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Séries · Cinémag</title>
</svelte:head>

<section class="mb-10">
	<p class="mb-2 text-sm font-medium tracking-widest text-emerald-400 uppercase">Séries</p>
	<h1 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
		Plonge dans les <span class="text-emerald-400">séries</span>
	</h1>
	<p class="mt-3 max-w-2xl text-zinc-400">
		Les séries du moment, les incontournables et les meilleures par genre.
	</p>
</section>

<div class="space-y-10">
	{#each data.categories as category (category.key)}
		<MediaCarousel title={category.label} kind="tv" items={category.shows} />
	{/each}
</div>
