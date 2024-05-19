<script lang="ts">
	import DropdownSearch from './search/DropdownSearch.svelte';
	import { OutlineFormField } from 'ui/form-field';

	type Item = {
		id: string;
		name: string;
	};

	export let items: Item[];
	export let selected: Item[] = [];

	const hamdleSelect = (event: CustomEvent<Item>) => {
		selected = [...selected, event.detail];
	};

	$: notSelected = items.filter(
		item => !selected.find(selected => selected.id === item.id),
	);
</script>

<div>
	<OutlineFormField>
		<DropdownSearch items={notSelected} on:select={hamdleSelect} />
	</OutlineFormField>

	<ul>
		{#each selected as item (item.id)}
			<li>{item.name}</li>
		{/each}
	</ul>
</div>
