<script lang="ts">
	import OutlineFormField from '$lib/modules/ui/form-field/fields/OutlineFormField.svelte';
	import type { FormEventHandler } from 'svelte/elements';
	import {
		createOneComment,
		type CommentCreate
	} from '$lib/backend/api/blogs/comments/create-one-comment';
	import type { PageData } from './$types';
	import { user } from '$lib/global/user';
	import { writable } from 'svelte/store';
	import type { Result } from '$lib/util/result';
	import Textarea from '$lib/modules/ui/text-field/components/Textarea.svelte';
	import EachComment from '$lib/modules/components/comments/smart/EachComment.svelte';
	import EachCommentCreation from '$lib/modules/components/comments/smart/EachCommentCreation.svelte';
	import type { IdResponse } from '$lib/backend/types/id-response';
	import { BlogFrame } from 'blog-frame';

	type CommentCreation = {
		id: number;
		comment: CommentCreate;
		status: Promise<Result<IdResponse, unknown>>;
	};

	export let data: PageData;

	let commentsCreated = writable<CommentCreation[]>([]);

	const onCommentSubmit: FormEventHandler<HTMLFormElement> = ({ currentTarget: form }) => {
		const formData = new FormData(form);
		const content = formData.get('content');
		if (!content) return;

		const req: CommentCreate = {
			content: content.toString()
		};

		const result = createOneComment(data.blog.id, req);
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
			comments[i].status = createOneComment(data.blog.id, commentCreation.comment);
			return comments;
		});
	};
</script>

<svelte:head>
	<title>{data.blog.title}</title>
</svelte:head>

<BlogFrame content={data.blog.content} />

<hr class="my-4" />

<section>
	<h3>Comments</h3>

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

		{#each data.blog.comments as comment (comment.id)}
			<li>
				<EachComment {comment} user={$user} />
			</li>
		{/each}
	</ul>
</section>

<style>
	img {
		width: 100%;
		aspect-ratio: 2 / 1;
		object-fit: cover;
		object-position: center;

		transition: transform 0.2s ease-in-out;
	}
</style>
