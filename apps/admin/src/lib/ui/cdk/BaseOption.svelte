<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Context } from './base-select';

	type T = $$Generic;

	export let ctx: Context;
	export let value: T;
	let klass = '';

	export { klass as class };

	const dispatch = createEventDispatcher<{
		change: T;
	}>();

	const onClick = () => {
		const canContinue = dispatch('change', value, { cancelable: true });
		if (!canContinue) return;

		ctx.onOptionSelected();
	}
</script>

<button type="button" on:click={onClick} class={klass}>
	<slot />
</button>
