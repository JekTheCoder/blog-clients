<script lang="ts">
	import type { User } from 'auth';
	import { createEventDispatcher } from 'svelte';
	import type { Result } from 'common/result';
	import type { IdReturn } from 'backend';
	import RepliesCreation from './RepliesCreation.svelte';
	import RepliesFetch from './RepliesFetch.svelte';
	import CommentFooter from '@/components/comments/smart/CommentFooter.svelte';
	import CommentPromise from '@/components/comments/components/CommentPromise.svelte';

	const dispatch = createEventDispatcher<{
		retry: void;
	}>();

	export let commentId: string;
	export let content: string;
	export let status: Promise<Result<IdReturn, unknown>>;
	export let user: User;

	let replyId: string | null;

	$: status.then((response) => {
		if (response.isOk()) replyId = response.unwrap().id;
	});

	let repliesCreation: RepliesCreation | null;
</script>

<div class="grid gap-2">
	<CommentPromise
		{content}
		username={user.username}
		name={user.name}
		{status}
		onRetry={() => dispatch('retry')}
	/>

	{#if replyId !== null}
		<CommentFooter {user} on:repliesCreation={(e) => repliesCreation?.createReply(e.detail)}>
			<svelte:fragment slot="repliesCreation">
				{#if user}
					<RepliesCreation bind:this={repliesCreation} {user} {commentId} parentId={replyId} />
				{/if}
			</svelte:fragment>

			<RepliesFetch slot="replies" {commentId} parentId={replyId} {user} />
		</CommentFooter>
	{/if}
</div>
