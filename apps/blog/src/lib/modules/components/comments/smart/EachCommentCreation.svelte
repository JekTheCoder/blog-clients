<script lang="ts">
	import type { Result } from '$lib/util/result';
	import { createEventDispatcher } from 'svelte';
	import CommentPromise from '../components/CommentPromise.svelte';
	import type { User } from '$lib/global/user';
	import type { IdResponse } from '$lib/backend/types/id-response';
	import CommentFooter from '../../comment-footer/components/smart/CommentFooter.svelte';
	import RepliesFetch from '../../replies/smart/RepliesFetch.svelte';
	import RepliesCreation from '../../replies/smart/RepliesCreation.svelte';

	const dispatch = createEventDispatcher<{
		retry: void;
	}>();

	export let content: string;
	export let status: Promise<Result<IdResponse, unknown>>;
	export let user: User;
	let commentId: string | null;

	$: status.then((response) => {
		if (response.isOk()) commentId = response.unwrap().id;
	});

	let repliesCreation: RepliesCreation | null;
</script>

<div class="grid gap-2">
	<CommentPromise
		{content}
		{status}
		username={user.username}
		name={user.name}
		onRetry={() => dispatch('retry')}
	/>

	{#if commentId !== null}
		<CommentFooter
			{user}
			on:repliesCreation={(e) => repliesCreation?.createReply(e.detail)}
		>
			<svelte:fragment slot="repliesCreation">
				{#if user}
					<RepliesCreation bind:this={repliesCreation} {user} {commentId} />
				{/if}
			</svelte:fragment>

			<RepliesFetch slot="replies" {commentId} {user} />
		</CommentFooter>
	{/if}
</div>
