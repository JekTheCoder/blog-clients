<script lang="ts">
	import BaseOption from '@/components/ui/cdk/BaseOption.svelte';
	import BaseSelect from '@/components/ui/cdk/BaseSelect.svelte';
	import { tagBackgrounds } from 'domain-ui/tag';

	let backgroundSelected = tagBackgrounds[0];
	export let name = '';
</script>

<input type="hidden" {name} value={backgroundSelected} />

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
