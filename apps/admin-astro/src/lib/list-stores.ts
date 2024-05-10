import { atom } from 'nanostores';
import type { IdReturn } from 'backend';

type Creation<T> = {
	key: number;
	status: Promise<unknown>;
	item: T;
};

export class ListStores<T, C> {
	readonly items = atom([] as T[]);
	readonly creations = atom([] as Creation<C>[]);

	constructor(
		private readonly keyFn: (item: T) => string,
		private readonly create: (item: C, id: string) => T,
		private readonly actor: Actor<C>,
	) {}

	delete(key: string) {
		this.actor.delete(key).then(() => this.remove(key));
	}

	remove(key: string) {
		this.items.set(this.items.get().filter(item => this.keyFn(item) !== key));
	}

	add(req: C) {
		const key = Math.random();
		const status = this.actor.create(req);

		this.creations.set([
			...this.creations.get(),
			{
				key,
				status: status.then(({ id }) => {
					this.items.set([...this.items.get(), this.create(req, id)]);
					this.creations.set(this.creations.get().filter(item => item.key !== key));
				}),
				item: req,
			},
		]);
	}
}

interface Actor<C> {
	create(item: C): Promise<IdReturn>;
	delete(key: string): Promise<void>;
}

export function useList<T, C>(
	actor: Actor<C>,
	keyFn: (item: T) => string,
	create: (item: C, id: string) => T,
) {
	return new ListStores(keyFn, create, actor);
}
