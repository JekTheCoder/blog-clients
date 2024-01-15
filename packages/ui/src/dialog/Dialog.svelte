<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	let dialog: HTMLDialogElement;

	export const open = () => {
		dialog.showModal();
	};

	export const close = () => {
		dialog.close();
	};

	const onDialogClick: MouseEventHandler<HTMLDialogElement> = event => {
		if (event.target !== dialog) return;
		dialog.close();
	};
</script>

<dialog class="dialog" bind:this={dialog} on:click={onDialogClick}>
	<div>
		<slot {close} />
	</div>
</dialog>
