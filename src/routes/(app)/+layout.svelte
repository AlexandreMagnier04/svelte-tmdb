<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const navItems = [
		{ href: '/', label: 'Accueil' },
		{ href: '/movies', label: 'Films' },
		{ href: '/series', label: 'Séries' },
		{ href: '/search', label: 'Recherche' },
		{ href: '/favoris', label: 'Favoris' }
	];
</script>

<div class="relative min-h-screen overflow-x-hidden">
	<div
		class="pointer-events-none fixed -top-40 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-emerald-800/10 blur-3xl"
	></div>

	<header class="sticky top-0 z-40 border-b border-zinc-900/80 bg-zinc-950/70 backdrop-blur-xl">
		<div class="mx-auto flex h-16 max-w-6xl items-center gap-6 px-6">
			<a href="/" class="flex items-center gap-2 text-lg font-bold tracking-tight">
				<span
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700"
				>
					<svg
						class="h-4 w-4 text-white"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect x="3" y="5" width="18" height="14" rx="2" />
						<path d="M7 5v14M17 5v14M3 9h18" />
					</svg>
				</span>
				<span>Cinémag</span>
			</a>

			<nav class="hidden flex-1 items-center gap-1 md:flex">
				{#each navItems as item (item.href)}
					{@const active = page.url.pathname === item.href}
					<a
						href={item.href}
						class="rounded-lg px-3 py-1.5 text-sm font-medium transition {active
							? 'bg-emerald-950/60 text-emerald-300'
							: 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'}"
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="ml-auto flex items-center gap-2">
				<a
					href="/profil"
					class="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
					aria-label="Profil"
				>
					<svg
						class="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="8" r="4" />
						<path d="M4 21a8 8 0 0 1 16 0" />
					</svg>
				</a>
				<form method="POST" action="/auth/logout">
					<button
						type="submit"
						class="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-emerald-700/50 hover:text-emerald-300"
					>
						Déconnexion
					</button>
				</form>
			</div>
		</div>
	</header>

	<main class="relative mx-auto max-w-6xl px-6 py-10">
		{@render children()}
	</main>
</div>
