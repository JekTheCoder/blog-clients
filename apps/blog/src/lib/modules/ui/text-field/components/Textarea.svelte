<script lang="ts">
	export let name: string;
	export let placeholder = '';
	export let required = false;

	export let minLines = 1;
	export let maxLines = 5;

	let textarea: HTMLTextAreaElement;

	const onInput = () => {
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	};
</script>

<textarea
	{name}
	{placeholder}
	{required}
	bind:this={textarea}
	on:input={onInput}
	style="min-height: {minLines}em; max-height: {maxLines}em"
/>

<style>
	textarea {
		box-sizing: content-box;
		resize: none;
	}
</style>
