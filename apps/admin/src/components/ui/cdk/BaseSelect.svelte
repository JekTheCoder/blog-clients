<script lang="ts">
	import type { FocusEventHandler } from 'svelte/elements';

	import FixedAttached from '@/components/ui/cdk/FixedAttached.svelte';
	import { onMount } from 'svelte';
	import type { Context } from './base-select';

	type T = $$Generic;
	export let items: T[];
	export let key: (item: T) => unknown = (item) => item;

	let host: HTMLElement;

	let hostHeight = 0;
	let hostY = 0;
	const optionHeight = 32;

	let attachedContent: HTMLElement;

	let openned = false;

	let ctx: Context = {
		onOptionSelected: () => {
			openned = false;
		}
	};

	onMount(() => {
		hostHeight = host.offsetHeight;
		hostY = host.getBoundingClientRect().y;
	});

	const onFocusOut: FocusEventHandler<HTMLElement> = ({ relatedTarget }) => {
		if (relatedTarget && attachedContent.contains(relatedTarget as Node)) return;

		openned = false;
	};
</script>

<div class="relative">
	<button
		type="button"
		bind:this={host}
		on:click={() => (openned = true)}
		on:blur={onFocusOut}
		class="w-full"
	>
		<slot name="preview" />
	</button>

	{#if openned}
	<FixedAttached {hostHeight} {hostY} height={optionHeight * items.length}>
		<ul class="card grid" bind:this={attachedContent}>
			{#each items as item (key(item))}
				<li>
					<slot {ctx} {item} />
				</li>
			{/each}
		</ul>
	</FixedAttached>
	{/if}
</div>
