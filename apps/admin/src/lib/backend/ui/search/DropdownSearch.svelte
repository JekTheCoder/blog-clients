<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { EventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';

	type Item = {
		id: string;
		name: string;
	};

	let input: HTMLInputElement;

	const dispatch = createEventDispatcher<{
		select: Item;
	}>();

	const optionHeight = 32;

	let items_: Item[];
	export { items_ as items };

	const items = writable<Item[]>([]);
	$: items.set(items_);

	let position = '';
	let focus = false;
	let content = '';

	let filtered: Item[] = [];

	$: {
		const lower = content.toLowerCase();
		filtered = $items.filter((item) => item.name.toLowerCase().includes(lower));
	}

	onMount(() => {
		const offset = 2;
		const height = input.offsetHeight;

		const { y } = input.getBoundingClientRect();

		return items.subscribe((items) => {
			const modalHeight = items.length * optionHeight;
			if (y + height + offset + modalHeight > window.innerHeight) {
				position = `bottom: ${height + offset}px`;
			} else {
				position = `top: ${height + offset}px`;
			}
		});
	});

	const actionHandler: EventHandler<KeyboardEvent, HTMLInputElement> = (e) => {
		if (e.key !== 'Enter') return;
		const [first] = filtered;

		if (!first) return;

		const canContinue = dispatch('select', first, {
			cancelable: true
		});
		if (!canContinue) return;

		content = '';
	};
</script>

<div class="relative">
	<input
		type="text"
		on:focusin={() => (focus = true)}
		on:focusout={() => (focus = false)}
		bind:value={content}
		on:keyup={actionHandler}
		bind:this={input}
	/>

	{#if focus}
		<ul class="absolute w-full z-10 bg-white card menu" style={position}>
			{#each filtered as item (item.id)}
				<li>{item.name}</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	li {
		height: 32px;
		padding: 0.2rem;
	}

	li:first-child {
		background-color: red;
	}

	input {
		width: 100%;
	}
</style>
