<script lang="ts">
	import DropdownSearch from './search/DropdownSearch.svelte';
	import { writable } from 'svelte/store';
	import { OutlineFormField } from 'ui/form-field';

	type Item = {
		id: string;
		name: string;
	};

	export let items: Item[];
	let selected_: Item[] = [];

	export { selected_ as selected };

	const selected = writable<Item[]>([]);

	$: selected.set(selected_);

	const hamdleSelect = (event: CustomEvent<Item>) =>
		selected.update((items) => {
			items.push(event.detail);
			return items;
		});

	$: notSelected = items.filter((item) => !$selected.find((selected) => selected.id === item.id));
</script>

<div>
	<OutlineFormField>
		<DropdownSearch items={notSelected} on:select={hamdleSelect} />
	</OutlineFormField>

	<ul>
		{#each $selected as item (item.id)}
			<li>{item.name}</li>
		{/each}
	</ul>
</div>
