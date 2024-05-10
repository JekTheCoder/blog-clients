import { derived, type Readable } from 'svelte/store';

export function debounced<T>(store: Readable<T>, ms: number): Readable<T> {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return derived(store, (value, set) => {
		timer = setTimeout(() => set(value), ms);
		return () => timer && clearTimeout(timer);
	});
}
