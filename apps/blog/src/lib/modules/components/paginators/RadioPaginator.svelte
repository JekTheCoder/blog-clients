<script lang="ts">
	import Icon from '$lib/modules/ui/icon/Icon.svelte';

	export let page = 0;
	export let pages = 1;

	$: hasNext = page < pages - 1;

	const updatePage = (newPage: number) => {
		page = Math.max(0, newPage);
	};
</script>

<div>
	<button class="button icon" on:click={() => updatePage(page - 1)} disabled={page === 0}>
		<Icon icon="ooui:next-rtl" />
	</button>

	<fieldset class="flex gap-x-2">
		{#each Array(pages) as _, i}
			<input
				type="radio"
				name="page"
				value={i}
				checked={i === page}
				on:change={() => updatePage(i)}
			/>
		{/each}
	</fieldset>

	<button class="button icon" on:click={() => updatePage(page + 1)} disabled={!hasNext}>
		<Icon icon="ooui:next-ltr" />
	</button>
</div>

<style>
	div {
		display: grid;
		gap: 0.5rem;
		align-items: center;
		justify-content: space-between;

		grid-template-columns: auto auto auto;
	}
</style>
