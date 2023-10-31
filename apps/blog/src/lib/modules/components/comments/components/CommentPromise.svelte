<script lang="ts">
	import CommentContent from './CommentContent.svelte';
	import FlasingDots from '$lib/modules/ui/dots/components/FlashingDots.svelte';
	import type { Result } from '$lib/util/result';
	import { writable } from 'svelte/store';
	import { debounced } from '$lib/stores/debounced';
	import { createEventDispatcher } from 'svelte';

	const enum PromiseStatus {
		Loading,
		Done,
		Error
	}

	export let content: string;
	export let name: string;
	export let username: string;

	export let onRetry!: () => void;

	export let status: Promise<Result<unknown, unknown>>;

	const promiseStatus = writable(PromiseStatus.Loading);

	$: {
		promiseStatus.set(PromiseStatus.Loading);
		status
			.then((result) => {
				const status = result.match({
					ok: () => PromiseStatus.Done,
					err: () => PromiseStatus.Error
				});

				promiseStatus.set(status);
			})
			.catch(() => promiseStatus.set(PromiseStatus.Error));
	}

	const debouncedStatus = debounced(promiseStatus, 200);
	$: colors = getColors($debouncedStatus);

	function getColors(status: PromiseStatus) {
		switch (status) {
			case PromiseStatus.Done:
				return {
					name: 'var(--primary-text-color)',
					username: 'var(--secondary-text-color)',
					content: 'var(--primary-text-color)'
				};
			default:
				return {
					name: 'var(--primary-disabled-text-color)',
					username: 'var(--secondary-disabled-text-color)',
					content: 'var(--primary-disabled-text-color)'
				};
		}
	}
</script>

<CommentContent
	{content}
	{name}
	{username}
	--name-text-color={colors.name}
	--username-text-color={colors.username}
	--content-text-color={colors.content}
/>

{#if $debouncedStatus === PromiseStatus.Loading}
	<span class="primary-text">|&nbsp;</span>
	<FlasingDots class="accent" />
{:else if $debouncedStatus === PromiseStatus.Error}
	<div class="w-max inline-block">
		<span class="primary-text">|&nbsp;</span>
		<span class="text-warning">An error occurred while saving your comment.</span>
		<span class="primary-text">|&nbsp;</span>
		<button class="link" on:click={onRetry}>Retry</button>
		<span class="primary-text">|&nbsp;</span>
	</div>
{/if}
