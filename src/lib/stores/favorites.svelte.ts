export interface FavoriteItem {
	id: number;
	kind: 'movie' | 'tv';
	title: string;
	poster_path: string | null;
}

class FavoritesStore {
	#items = $state<FavoriteItem[]>([]);
	#initialized = false;

	// Appelé depuis +layout.svelte avec les données Supabase
	init(items: FavoriteItem[]) {
		if (this.#initialized) return;
		this.#items = items;
		this.#initialized = true;
	}

	get items() {
		return this.#items;
	}

	get count() {
		return this.#items.length;
	}

	has(id: number, kind: 'movie' | 'tv') {
		return this.#items.some((i) => i.id === id && i.kind === kind);
	}

	async toggle(item: FavoriteItem) {
		const removing = this.has(item.id, item.kind);

		// Mise à jour optimiste immédiate
		if (removing) {
			this.#items = this.#items.filter((i) => !(i.id === item.id && i.kind === item.kind));
		} else {
			this.#items = [...this.#items, item];
		}

		// Sync Supabase en arrière-plan
		await fetch('/api/favorites', {
			method: removing ? 'DELETE' : 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(item)
		});
	}
}

export const favorites = new FavoritesStore();
