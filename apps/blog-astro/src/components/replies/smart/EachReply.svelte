<script lang="ts">
	import type { User } from 'auth';
	import RepliesFetch from '../../replies/smart/RepliesFetch.svelte';
	import type { Reply } from 'backend/replies';
	import CommentContent from '../../comments/components/CommentContent.svelte';
	import RepliesCreation from './RepliesCreation.svelte';
	import CommentFooter from '@/components/comments/smart/CommentFooter.svelte';

	export let reply: Reply;
	export let user: User | null = null;
	export let commentId: string;

	let repliesCreation: RepliesCreation | null;
</script>

<div class="grid gap-2">
	<CommentContent
		content={reply.content}
		username={reply.account.username}
		name={reply.account.name}
	/>

	<CommentFooter
		{user}
		hasReplies={reply.hasReplies}
		on:repliesCreation={(e) => repliesCreation?.createReply(e.detail)}
	>
		<svelte:fragment slot="repliesCreation">
			{#if user}
				<RepliesCreation bind:this={repliesCreation} {user} {commentId} parentId={reply.id} />
			{/if}
		</svelte:fragment>

		<RepliesFetch slot="replies" {commentId} {user} parentId={reply.id} />
	</CommentFooter>
</div>
