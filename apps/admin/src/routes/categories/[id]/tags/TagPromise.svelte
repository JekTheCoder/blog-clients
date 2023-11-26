<script lang="ts">
	const enum LoadStatus {
		Loading,
		Done,
		Error
	}

	export let status: Promise<unknown>;
	export let name: string;
	export let color: string;

	let done = LoadStatus.Loading;
	$: status.then(() => (done = LoadStatus.Done));
</script>

<div class="chip" class:disabled={done !== LoadStatus.Done} style="--color: {color}"> 
	{name}
</div>

{#if done === LoadStatus.Error}
	<span class="text-warning"> An error occurred. </span>
{/if}

<style>
	.chip {
		--color: var(--color-primary);

		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		line-height: 1;
		text-align: center;
		color: #fff;
		background-color: var(--color);
	}

	.disabled {
		--color: var(--color-primary-disabled);
	}
</style>
