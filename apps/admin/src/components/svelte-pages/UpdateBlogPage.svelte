<script lang="ts">
	import { onMount } from 'svelte';

	import { BlogFrame } from 'blog-frame';
	import type { EventHandler } from 'svelte/elements';
	import { BlogRwClient } from '@/lib/blog-rw-client';
	import { uploadImages } from 'backend/blogs';
	import WorkspaceImagePool from '../WorkspaceImagePool.svelte';

	export let blogId: string;

	const workspaceId = crypto.randomUUID();

	let content = '';
	let client: BlogRwClient;

	let save: Promise<unknown> | null = null;

	let images: File[] = [];

	onMount(() => {
		client = new BlogRwClient(workspaceId, blogId);
		const onHtml = client.onHtml();

		const sub = onHtml.subscribe(html => (content = html));

		return () => {
			client.close();
			sub();
		};
	});

	const spawnSave = async () => {
		const content = await client.getContent();

		// const created = await updateOne({
		// 	content,
		// 	categoryId,
		// 	tags,
		// 	subCategories,
		// });
		//
		return uploadImages(blogId, images);
	};

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = () => {
		save = spawnSave();
	};
</script>

<main class="container mx-auto grid gap-4">
	<BlogFrame {content} class="min-w-0" />

	<hr />

	<WorkspaceImagePool {workspaceId} bind:images />

	<form class="grid gap-4" on:submit|preventDefault={onSubmit}>
		<div>
			{#if save}
				{#await save}
					<p>Saving...</p>
				{:then}
					<p>Saved!</p>
				{:catch}
					<p>Failed to save</p>
				{/await}
			{/if}
		</div>
		<button type="submit" class="button primary raised">Save</button>
	</form>
</main>
