<script lang="ts">
	import MediaCarousel from '$lib/components/MediaCarousel.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Cinémag · Films & Séries</title>
</svelte:head>

<section class="mb-12">
	<p class="mb-2 text-sm font-medium tracking-widest text-emerald-400 uppercase">Bienvenue</p>
	<h1 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
		Cinémag, le meilleur du <span class="text-emerald-400">cinéma</span>
	</h1>
	<p class="mt-3 max-w-2xl text-zinc-400">
		Films en salle, séries tendance, classiques intemporels. Tout ce qu'il faut voir, réuni en un
		seul endroit.
	</p>
</section>

<div class="space-y-10">
	<MediaCarousel title="En ce moment au cinéma" kind="movie" items={data.nowPlaying} />
	<MediaCarousel title="Séries à l'antenne" kind="tv" items={data.onTheAir} />
	<MediaCarousel title="Films les mieux notés" kind="movie" items={data.topRatedMovies} />
	<MediaCarousel title="Séries les mieux notées" kind="tv" items={data.topRatedShows} />
</div>
