<script lang="ts">
	import { FlashingDots } from 'ui/dots';

	export let status: Promise<unknown>;
	export let name: string;

	let resolved = false;
	status.then(() => {
		resolved = true;
	});
</script>

<span class:preview={!resolved}>
	{name}
</span>

{#await status}
	<FlashingDots />
{:catch}
	<span>An error occurred</span>
{/await}

<style lang="scss">
	.preview {
		color: var(--primary-disabled-text-color);
	}
</style>
