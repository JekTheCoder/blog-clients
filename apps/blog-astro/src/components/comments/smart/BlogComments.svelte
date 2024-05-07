<script lang="ts">
	import { OutlineFormField } from 'ui/form-field';
	import type { FormEventHandler } from 'svelte/elements';
	import { Textarea } from 'ui/text-field';
	import { createOneComment, type CommentCreate, type Comment } from 'backend/comments';
	import { user } from 'auth';
	import { writable } from 'svelte/store';
	import { fromAxios, type Result } from 'common/result';
	import { type IdReturn } from 'backend';
	import EachCommentCreation from './EachCommentCreation.svelte';
	import EachComment from './EachComment.svelte';

	export let blogId: string;
	export let comments: Comment[];

	type CommentCreation = {
		id: number;
		comment: CommentCreate;
		status: Promise<Result<IdReturn, unknown>>;
	};

	let commentsCreated = writable<CommentCreation[]>([]);

	const onCommentSubmit: FormEventHandler<HTMLFormElement> = ({ currentTarget: form }) => {
		const formData = new FormData(form);
		const content = formData.get('content');
		if (!content) return;

		const req: CommentCreate = {
			content: content.toString()
		};

		const result = fromAxios(createOneComment(blogId, req));
		commentsCreated.update((comments) => {
			comments.unshift({
				id: Math.random(),
				comment: req,
				status: result
			});
			return comments;
		});

		form.reset();
	};

	const handleRetry = (commentCreation: CommentCreation, i: number) => {
		commentsCreated.update((comments) => {
			comments[i].status = fromAxios(createOneComment(blogId, commentCreation.comment));
			return comments;
		});
	};
</script>

	{#if $user}
		<form class="grid gap-4" on:submit|preventDefault={onCommentSubmit}>
			<OutlineFormField>
				<Textarea name="content" placeholder="Awesome comment!" required />
			</OutlineFormField>

			<footer class="flex justify-end">
				<button class="button raised primary">Save</button>
			</footer>
		</form>
	{/if}

	<ul class="grid gap-4">
		{#if $user}
			{#each $commentsCreated as commentCreation, i (commentCreation.id)}
				<li>
					<EachCommentCreation
						user={$user}
						content={commentCreation.comment.content}
						status={commentCreation.status}
						on:retry={() => handleRetry(commentCreation, i)}
					/>
				</li>
			{/each}
		{/if}

		<slot />

	{#each comments as comment}
		<li>
			<EachComment {comment} user={$user} />
		</li>
	{/each}
	</ul>

<style>
	ul {
		--name-text-color: var(--primary-text-color);
		--content-text-color: var(--primary-text-color);
		--username-text-color: var(--secondary-text-color);
	}
</style>
