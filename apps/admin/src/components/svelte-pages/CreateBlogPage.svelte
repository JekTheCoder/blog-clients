<script lang="ts">
	import { onMount } from 'svelte';

	import { BlogFrame } from 'blog-frame';
	import type { EventHandler } from 'svelte/elements';
	import { BlogRwClient } from '@/lib/blog-rw-client';
	import { createOne, uploadImages } from 'backend/blogs';
	import type { Category } from 'backend/categories';
	import BlogGroupingForm from '../BlogGroupingForm.svelte';
	import type { BlogGroupingIds } from '@/lib/types/grouping';

	export let categories: Category[];

	const workspaceId = crypto.randomUUID();

	let content = '';
	let client: BlogRwClient;

	let save: Promise<unknown> | null = null;

	const images: File[] = [];

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

	const onImageUpload: EventHandler<Event, HTMLInputElement> = e => {
		const file = e.currentTarget.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append('image', file);

		fetch(`http://localhost:7878/${workspaceId}/upload`, {
			method: 'POST',
			body: formData,
		}).then(() => images.push(file));
	};
</script>

<main class="container mx-auto grid gap-4">
	<BlogFrame {content} on:groupingChange={e => (grouping = e.detail)} class="min-w-0" />

	<hr />

	<input type="file" accept="image/*" name="image" on:change={onImageUpload} />

	<form class="grid gap-4" on:submit|preventDefault={onSubmit}>
		<BlogGroupingForm {categories} />

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
