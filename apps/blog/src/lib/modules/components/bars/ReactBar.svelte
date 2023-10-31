<script lang="ts">
	import MatButton from '$lib/modules/ui/button/components/MatButton.svelte';
	import { ButtonDesign } from '$lib/modules/ui/button/type';
	import Icon from '$lib/modules/ui/icon/Icon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let hasReplies = false;
	export let repliesChecked = false;

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
	<MatButton design={ButtonDesign.Icon}>
		<Icon icon="iconamoon:like-thin" />
	</MatButton>

	<MatButton design={ButtonDesign.Icon}>
		<Icon icon="iconamoon:dislike-thin" />
	</MatButton>

	<MatButton on:click={(e) => dispatch('replyClick', e)}>Reply</MatButton>

	<MatButton on:click={onRepliesClick} disabled={!hasReplies}>
		<Icon
			icon="mdi:menu-down"
			class={'transition-transform ' + (repliesChecked ? 'rotate-0' : 'rotate-180')}
		/>
		Replies
	</MatButton>
</div>
