<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Accueil · Cinémag</title>
</svelte:head>

<section class="mb-12">
	<p class="mb-2 text-sm font-medium tracking-widest text-emerald-400 uppercase">
		Bienvenue
	</p>
	<h1 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
		Découvre le cinéma <span class="text-emerald-400">en direct</span>
	</h1>
	<p class="mt-3 max-w-2xl text-zinc-400">
		Les sorties de la semaine, les films les plus populaires et les séries qui font
		l'actualité — réunies en un seul endroit.
	</p>
</section>

<div class="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-8">
	<h2 class="mb-4 text-lg font-semibold text-zinc-100">État de la session</h2>
	<pre class="overflow-x-auto rounded-lg bg-zinc-950/80 p-4 text-xs text-emerald-300">{JSON.stringify(data.claims, null, 2)}</pre>
	<p class="mt-4 text-sm text-zinc-500">
		Les sections « Sorties de la semaine », « Films populaires » et « Séries tendance »
		arrivent à la prochaine étape (intégration TMDB).
	</p>
</div>
