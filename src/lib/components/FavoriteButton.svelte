<script lang="ts">
	import { favorites, type FavoriteItem } from '$lib/stores/favorites.svelte';

	interface Props {
		item: FavoriteItem;
		class?: string;
	}
	let { item, class: cls = '' }: Props = $props();

	let isFav = $derived(favorites.has(item.id, item.kind));
</script>

<button
	onclick={() => favorites.toggle(item)}
	aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
	class="rounded-full p-2 transition {isFav
		? 'bg-emerald-500/20 text-emerald-400'
		: 'bg-zinc-900/80 text-zinc-400 hover:text-emerald-400'} {cls}"
>
	<svg
		class="h-5 w-5"
		viewBox="0 0 24 24"
		fill={isFav ? 'currentColor' : 'none'}
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path
			d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
		/>
	</svg>
</button>
