<script lang="ts">
	import Icon from '$lib/modules/ui/icon/Icon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let hasReplies = false;
	export let repliesChecked = false;
	export let canAnswer = true;

	const dispatch = createEventDispatcher<{
		repliesToggle: boolean;
		replyClick: MouseEvent;
	}>();

	const onRepliesClick = () => {
		const toggled = !repliesChecked;
		const canContinue = dispatch('repliesToggle', toggled, { cancelable: true });
		if (!canContinue) return;

		repliesChecked = toggled;
	};
</script>

<div class="w-full flex gap-x-2">
	<!-- TODO :( -->
	<!-- <button class="button icon"> -->
	<!-- 	<Icon icon="iconamoon:like-thin" /> -->
	<!-- </button> -->
	<!---->
	<!-- <button class="button icon"> -->
	<!-- 	<Icon icon="iconamoon:dislike-thin" /> -->
	<!-- </button> -->

	<button class="button basic" on:click={(e) => dispatch('replyClick', e)} disabled={!canAnswer}>Reply</button>

	<button class="button basic" on:click={onRepliesClick} disabled={!hasReplies}>
		<Icon
			icon="mdi:menu-down"
			class={'transition-transform ' + (repliesChecked ? 'rotate-0' : 'rotate-180')}
		/>
		Replies
	</button>
</div>
