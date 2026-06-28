<script lang="ts">
	// Carte d'affiche pour une série. Jumeau de MovieCard mais lit `name` et
	// `first_air_date` (les séries n'ont pas `title` ni `release_date` chez TMDB).
	import type { TvShow } from '$lib/server/db/models/tmdb';

	interface Props {
		show: TvShow;
	}
	let { show }: Props = $props();

	const posterUrl = $derived(
		show.poster_path ? `https://image.tmdb.org/t/p/w342${show.poster_path}` : null
	);
	const year = $derived(show.first_air_date ? show.first_air_date.slice(0, 4) : '');
	const rating = $derived(show.vote_average ? show.vote_average.toFixed(1) : '—');
</script>

<a
	href="/series/{show.id}"
	class="group flex w-36 shrink-0 flex-col gap-2 sm:w-44"
	aria-label={show.name}
>
	<div
		class="relative aspect-[2/3] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/40 transition group-hover:border-emerald-700/50"
	>
		{#if posterUrl}
			<img
				src={posterUrl}
				alt={show.name}
				loading="lazy"
				class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center text-xs text-zinc-600">
				Sans affiche
			</div>
		{/if}

		<div
			class="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-zinc-950/80 px-2 py-0.5 text-xs font-semibold text-emerald-300 backdrop-blur"
		>
			★ {rating}
		</div>
	</div>

	<div class="px-0.5">
		<h3 class="truncate text-sm font-medium text-zinc-100 group-hover:text-emerald-300">
			{show.name}
		</h3>
		<p class="text-xs text-zinc-500">{year}</p>
	</div>
</a>
