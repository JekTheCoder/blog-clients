<script lang="ts">
	import { Tag } from 'domain-ui/tag';
	import { createEventDispatcher } from 'svelte';
	import { FlashingDots } from 'ui/dots';
	import { Icon } from 'ui/icon';

	export let status: Promise<unknown>;
	export let name: string;
	export let color: string;

	const dispatch = createEventDispatcher<{
		retry: void;
	}>();
</script>

<div class="flex items-center gap-x-2">
	{#await status}
		<FlashingDots />
	{:catch}
		<button class="button icon warn" on:click={() => dispatch('retry')}>
			<Icon icon="mingcute:alert-fill" />
		</button>
	{/await}

	<Tag id="" {name} {color} />
</div>
