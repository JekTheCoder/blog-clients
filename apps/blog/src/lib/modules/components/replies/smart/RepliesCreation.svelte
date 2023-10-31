<script lang="ts">
	import {
		createOneReply,
		type ReplyCreate
	} from '$lib/backend/api/blogs/comments/replies/create-one-reply';
	import { writable } from 'svelte/store';
	import EachReplyCreation from './EachReplyCreation.svelte';
	import type { User } from '$lib/global/user';
	import type { ReplyCreation } from '../type';

	export let commentId: string;
	export let parentId: string | undefined | null = undefined;
	export let user: User;

	const replies = writable<ReplyCreation[]>([]);

	export function createReply(reply: ReplyCreate) {
		replies.update((replies) => {
			replies.push({
				key: Math.random(),
				reply,
				status: createOneReply(commentId, reply, parentId)
			});

			return replies;
		});
	}

	const handleRetry = (creation: ReplyCreation, index: number) => {
		replies.update((replies) => {
			const reply = replies[index];
			reply.status = createOneReply(commentId, creation.reply, parentId);
			return replies;
		});
	};
</script>

{#each $replies as reply, i (reply.key)}
	<li>
		<EachReplyCreation
			{commentId}
			{user}
			content={reply.reply.content}
			status={reply.status}
			on:retry={() => handleRetry(reply, i)}
		/>
	</li>
{/each}
