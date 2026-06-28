export interface FavoriteItem {
	id: number;
	kind: 'movie' | 'tv';
	title: string;
	poster_path: string | null;
}

// Store pour gérer les favoris de l'utilisateur
class FavoritesStore {
	#items = $state<FavoriteItem[]>([]);

	// On charge les favoris depuis le localStorage au démarrage
	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('cinemag_favorites');
			if (saved) this.#items = JSON.parse(saved) as FavoriteItem[];
		}
	}

	// On expose les favoris
	get items() {
		return this.#items;
	}

	// On expose le nombre de favoris
	get count() {
		return this.#items.length;
	}

	// On vérifie si un élément est déjà dans les favoris
	has(id: number, kind: 'movie' | 'tv') {
		return this.#items.some((i) => i.id === id && i.kind === kind);
	}

	// On ajoute ou supprime un élément des favoris
	toggle(item: FavoriteItem) {
		if (this.has(item.id, item.kind)) {
			this.#items = this.#items.filter((i) => !(i.id === item.id && i.kind === item.kind));
		} else {
			this.#items = [...this.#items, item];
		}
		this.#persist();
	}

	// On sauvegarde les favoris dans le localStorage
	#persist() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('cinemag_favorites', JSON.stringify(this.#items));
		}
	}
}

export const favorites = new FavoritesStore();
