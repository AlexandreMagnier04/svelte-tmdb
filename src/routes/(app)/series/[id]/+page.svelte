<script lang="ts">
	import type { PageData } from './$types';
	import FavoriteButton from '$lib/components/FavoriteButton.svelte';

	let { data }: { data: PageData } = $props();

	const { show } = data;

	const backdrop = show.backdrop_path
		? `https://image.tmdb.org/t/p/w1280${show.backdrop_path}`
		: null;
	const poster = show.poster_path ? `https://image.tmdb.org/t/p/w342${show.poster_path}` : null;
	const year = show.first_air_date?.slice(0, 4) ?? '—';
	const rating = show.vote_average.toFixed(1);
</script>

<svelte:head>
	<title>{show.name} · Cinémag</title>
</svelte:head>

{#if backdrop}
	<div class="pointer-events-none fixed inset-0 -z-10 opacity-20">
		<img src={backdrop} alt="" class="h-full w-full object-cover" />
		<div class="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
	</div>
{/if}

<div class="flex flex-col gap-8 md:flex-row">
	{#if poster}
		<img
			src={poster}
			alt={show.name}
			class="w-48 shrink-0 self-start rounded-xl shadow-2xl md:w-64"
		/>
	{/if}

	<div class="flex flex-col gap-4">
		<div>
			<p class="text-sm text-zinc-500">{year}</p>
			<h1 class="text-3xl font-bold text-zinc-50 sm:text-4xl">{show.name}</h1>
			{#if show.tagline}
				<p class="mt-1 text-zinc-400 italic">"{show.tagline}"</p>
			{/if}
		</div>

		<div class="flex flex-wrap gap-2">
			<span class="rounded-full bg-emerald-900/60 px-3 py-1 text-sm font-semibold text-emerald-300">
				★ {rating}
			</span>
			<span class="rounded-full bg-zinc-900 px-3 py-1 text-sm text-zinc-400">
				{show.number_of_seasons} saison{show.number_of_seasons > 1 ? 's' : ''}
			</span>
			<span class="rounded-full bg-zinc-900 px-3 py-1 text-sm text-zinc-400">
				{show.number_of_episodes} épisodes
			</span>
			{#each show.genres as genre (genre.id)}
				<span class="rounded-full border border-zinc-800 px-3 py-1 text-sm text-zinc-400">
					{genre.name}
				</span>
			{/each}
		</div>

		{#if show.overview}
			<p class="max-w-2xl leading-relaxed text-zinc-300">{show.overview}</p>
		{/if}

		<FavoriteButton
			item={{ id: show.id, kind: 'tv', title: show.name, poster_path: show.poster_path }}
		/>

		<a href="/series" class="mt-2 w-fit text-sm text-zinc-500 transition hover:text-emerald-400">
			← Retour aux séries
		</a>
	</div>
</div>
