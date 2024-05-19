<script lang="ts">
	import { onMount } from 'svelte';

	import { BlogFrame } from 'blog-frame';
	import type { EventHandler } from 'svelte/elements';
	import { BlogRwClient } from '@/lib/blog-rw-client';
	import { createOne, uploadImages } from 'backend/blogs';
	import type { Category } from 'backend/categories';
	import BlogGroupingForm from '../BlogGroupingForm.svelte';
	import type { BlogGroupingIds } from '@/lib/types/grouping';
	import WorkspaceImagePool from '../WorkspaceImagePool.svelte';

	export let categories: Category[];

	const workspaceId = crypto.randomUUID();

	let content = '';
	let client: BlogRwClient;

	let save: Promise<unknown> | null = null;

	let images: File[] = [];

	let grouping: BlogGroupingIds = {
		categoryId: null,
		subCategories: [],
		tags: [],
	};

	onMount(() => {
		client = new BlogRwClient(workspaceId);
		const onHtml = client.onHtml();

		const sub = onHtml.subscribe(html => (content = html));

		return () => {
			client.close();
			sub();
		};
	});

	const spawnSave = async (
		categoryId: string,
		tags: string[],
		subCategories: string[],
	) => {
		const content = await client.getContent();

		const created = await createOne({
			content,
			categoryId,
			tags,
			subCategories,
		});

		return uploadImages(created.data.id, images);
	};

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = () => {
		const { categoryId, tags, subCategories } = grouping;

		if (!categoryId || subCategories.length === 0) {
			return;
		}

		save = spawnSave(categoryId, tags, subCategories);
	};
</script>

<main class="container mx-auto grid gap-4">
	<BlogFrame {content} class="min-w-0" />

	<hr />

	<WorkspaceImagePool {workspaceId} bind:images />

	<form class="grid gap-4" on:submit|preventDefault={onSubmit}>
		<BlogGroupingForm {categories} on:groupingChange={e => (grouping = e.detail)} />

		<footer class="grid grid-cols-[1fr,auto]">
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
		</footer>
	</form>
</main>
