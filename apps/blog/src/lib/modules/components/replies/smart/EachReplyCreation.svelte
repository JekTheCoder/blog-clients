<script lang="ts">
	import CommentPromise from '$lib/modules/components/comments/components/CommentPromise.svelte';
	import type { User } from '$lib/global/user';
	import { createEventDispatcher } from 'svelte';
	import type { Result } from '$lib/util/result';
	import type { IdResponse } from '$lib/backend/types/id-response';
	import CommentFooter from '../../comment-footer/components/smart/CommentFooter.svelte';
	import RepliesCreation from './RepliesCreation.svelte';
	import RepliesFetch from './RepliesFetch.svelte';

	const dispatch = createEventDispatcher<{
		retry: void;
	}>();

	export let commentId: string;
	export let content: string;
	export let status: Promise<Result<IdResponse, unknown>>;
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
