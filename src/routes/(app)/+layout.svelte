<script lang="ts">
	import { page } from '$app/state';
	import { favorites } from '$lib/stores/favorites.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: import('svelte').Snippet; data: LayoutData } = $props();

	$effect(() => {
		favorites.init(data.favorites);
	});

	let menuOpen = $state(false);

	const navItems = [
		{ href: '/', label: 'Accueil' },
		{ href: '/movies', label: 'Films' },
		{ href: '/series', label: 'Séries' },
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
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 text-sm font-black text-white"
					>M</span
				>
				<span style="font-family: 'Stereonic'">Cinémag</span>
			</a>

			<!-- Nav desktop -->
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
				<form method="POST" action="/auth/logout" class="hidden md:block">
					<button
						type="submit"
						class="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-emerald-700/50 hover:text-emerald-300"
					>
						Déconnexion
					</button>
				</form>

				<!-- Burger mobile -->
				<button
					onclick={() => (menuOpen = !menuOpen)}
					class="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100 md:hidden"
					aria-label="Menu"
				>
					{#if menuOpen}
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M18 6 6 18M6 6l12 12" />
						</svg>
					{:else}
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</header>

	<!-- Overlay -->
	{#if menuOpen}
		<div
			class="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm md:hidden"
			onclick={() => (menuOpen = false)}
			role="presentation"
		></div>
	{/if}

	<!-- Drawer droite -->
	<div
		class="fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl transition-transform duration-300 md:hidden {menuOpen
			? 'translate-x-0'
			: 'translate-x-full'}"
	>
		<!-- Header drawer -->
		<div class="flex h-16 items-center justify-between border-b border-zinc-800/80 px-6">
			<span style="font-family: 'Stereonic'" class="text-lg font-bold text-zinc-100">Cinémag</span>
			<button
				onclick={() => (menuOpen = false)}
				class="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
				aria-label="Fermer"
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
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Nav links -->
		<nav class="flex flex-col gap-1 p-4">
			{#each navItems as item (item.href)}
				{@const active = page.url.pathname === item.href}
				<a
					href={item.href}
					onclick={() => (menuOpen = false)}
					class="flex items-center rounded-lg px-4 py-3 text-sm font-medium transition {active
						? 'bg-emerald-950/60 text-emerald-300'
						: 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'}"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Footer drawer -->
		<div class="mt-auto border-t border-zinc-800/80 p-4">
			<a
				href="/profil"
				onclick={() => (menuOpen = false)}
				class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
			>
				<svg
					class="h-4 w-4"
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
				Mon profil
			</a>
			<form method="POST" action="/auth/logout">
				<button
					type="submit"
					class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-red-400"
				>
					<svg
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
					</svg>
					Déconnexion
				</button>
			</form>
		</div>
	</div>

	<main class="relative mx-auto max-w-6xl px-6 py-10">
		{@render children()}
	</main>
</div>
