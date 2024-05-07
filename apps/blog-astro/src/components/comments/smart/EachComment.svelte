<script lang="ts">
	import type { Comment } from 'backend/comments';
	import type { User } from 'auth';
	import CommentFooter from './CommentFooter.svelte';
	import CommentContent from '../components/CommentContent.svelte';
	import RepliesFetch from '../../replies/smart/RepliesFetch.svelte';
	import RepliesCreation from '../../replies/smart/RepliesCreation.svelte';

	export let comment: Comment;
	export let user: User | null = null;

	let repliesCreation: RepliesCreation | null;
</script>

<div class="grid gap-2">
	<CommentContent
		content={comment.content}
		username={comment.account.username}
		name={comment.account.name}
	/>

	<CommentFooter
		{user}
		hasReplies={comment.hasReplies}
		on:repliesCreation={(e) => repliesCreation?.createReply(e.detail)}
	>
		<svelte:fragment slot="repliesCreation">
			{#if user}
				<RepliesCreation bind:this={repliesCreation} {user} commentId={comment.id} />
			{/if}
		</svelte:fragment>

		<RepliesFetch slot="replies" commentId={comment.id} {user} />
	</CommentFooter>
</div>
