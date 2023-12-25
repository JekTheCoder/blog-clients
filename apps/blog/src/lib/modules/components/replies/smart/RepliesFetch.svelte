<script lang="ts">
	import { getAllReplies } from 'backend/replies';
	import type { User } from 'globals/user';
	import FlashingDots from '$lib/modules/ui/dots/components/FlashingDots.svelte';
	import EachReply from './EachReply.svelte';

	export let commentId: string;
	export let parentId: string | undefined = undefined;
	export let user: User | null = null;

	$: replies = getAllReplies(commentId, parentId);
</script>

{#await replies}
	<FlashingDots />
{:then replies}
	{#each replies.data as reply (reply.id)}
		<li>
			<EachReply {reply} {commentId} {user} />
		</li>
	{/each}
{:catch error}
	error
{/await}
