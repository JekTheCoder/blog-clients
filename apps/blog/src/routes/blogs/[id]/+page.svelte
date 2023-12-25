<script lang="ts">
	import OutlineFormField from '$lib/modules/ui/form-field/fields/OutlineFormField.svelte';
	import type { FormEventHandler } from 'svelte/elements';
	import { createOneComment, type CommentCreate } from 'backend/comments';
	import type { PageData } from './$types';
	import { user } from 'auth';
	import { writable } from 'svelte/store';
	import { fromAxios, type Result } from '$lib/util/result';
	import Textarea from '$lib/modules/ui/text-field/components/Textarea.svelte';
	import EachComment from '$lib/modules/components/comments/smart/EachComment.svelte';
	import EachCommentCreation from '$lib/modules/components/comments/smart/EachCommentCreation.svelte';
	import { BlogFrame } from 'blog-frame';
	import type { IdReturn } from 'backend/src/models/id-return';

	type CommentCreation = {
		id: number;
		comment: CommentCreate;
		status: Promise<Result<IdReturn, unknown>>;
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

		const result = fromAxios(createOneComment(data.blog.id, req));
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
			comments[i].status = fromAxios(createOneComment(data.blog.id, commentCreation.comment));
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
