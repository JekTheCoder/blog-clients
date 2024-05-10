<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import BaseTagPromise from './BaseTagPromise.svelte';
	import { createOne } from 'backend/tags';
	import type { IdReturn } from 'backend';

	export let status: Promise<IdReturn>;

	export let categoryId: string;
	export let name: string;
	export let color: string;

	const dispatch = createEventDispatcher<{
		done: IdReturn;
	}>();

	status.then(data => {
		dispatch('done', data);
	});

	const onRetry = () => {
		status = createOne(categoryId, {
			color,
			name
		});
	};
</script>

<BaseTagPromise {status} {name} {color} on:retry={onRetry} />
