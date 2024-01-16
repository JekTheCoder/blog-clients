<script lang="ts">
	import BaseOption from '$lib/ui/cdk/BaseOption.svelte';
	import BaseSelect from '$lib/ui/cdk/BaseSelect.svelte';
	import { tagBackgrounds } from 'domain-ui/tag';

	let backgroundSelected = tagBackgrounds[0];
</script>

<BaseSelect items={tagBackgrounds} let:ctx let:item>
	<div slot="preview" class="tag {backgroundSelected} w-full">{backgroundSelected}</div>

	<BaseOption
		{ctx}
		value={item}
		on:change={() => (backgroundSelected = item)}
		class="grid tag {item} w-full"
	>
		{item}
	</BaseOption>
</BaseSelect>
