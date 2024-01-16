<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let height: number;
	export let hostHeight: number;
	export let hostY: number;

	const modalHeight = writable(height);
	$: modalHeight.set(height);

	let position = '';

	onMount(() => {
		const offset = 2;

		return modalHeight.subscribe((modalHeight) => {
			if (hostY + height + offset + modalHeight > window.innerHeight) {
				position = `bottom: ${hostHeight + offset}px`;
			} else {
				position = `top: ${hostHeight + offset}px`;
			}
		});
	});
</script>

<div style={position}>
	<slot />
</div>

<style>
	div {
		position: absolute;
		width: 100%;
	}
</style>
