<script lang="ts">
	import { onMount } from 'svelte';

	import { BlogFrame } from 'blog-frame';
	import { OutlineFormField } from 'ui/form-field';
	import type { EventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';
	import { getAll as getAllSubCategories, type SubCategory } from 'backend/sub-categories';
	import { getAll as getAllTags, type Tag } from 'backend/tags';
	import ItemSelectorList from '@/components/ui/ItemSelectorList.svelte';
	import { BlogRwClient } from '@/lib/blog-rw-client';
	import { createOne, uploadImages } from 'backend/blogs';
	import type { Category } from 'backend/categories';

	export let categories: Category[];

	const workspaceId = crypto.randomUUID();

	let content = '';
	let client: BlogRwClient;

	let save: Promise<unknown> | null = null;

	const images: File[] = [];

	onMount(() => {
		client = new BlogRwClient(workspaceId);
		const onHtml = client.onHtml();

		const sub = onHtml.subscribe((html) => (content = html));

		return () => {
			client.close();
			sub();
		};
	});

	const categorySelected = writable(categories[0]?.id ?? null);

	let subCategories: SubCategory[] = [];
	let subCategoriesSelected: SubCategory[] = [];
	$: {
		subCategoriesSelected.length = 0;

		if ($categorySelected) {
			subCategories.length = 0;
			getAllSubCategories($categorySelected).then((res) => {
				subCategories = res.data;
			});
		}
	}

	let tags: Tag[] = [];
	let tagsSelected: Tag[] = [];
	$: {
		tagsSelected.length = 0;

		if ($categorySelected) {
			tags.length = 0;
			getAllTags($categorySelected).then((res) => {
				tags = res.data;
			});
		}
	}

	const spawnSave = async (categoryId: string, tags: Tag[], subCategories: SubCategory[]) => {
		const content = await client.getContent();

		const created = await createOne({
			content,
			categoryId,
			tags: tags.map((tag) => tag.id),
			subCategories: subCategories.map((subCategory) => subCategory.id)
		});

		return uploadImages(created.data.id, images);
	};

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = (e) => {
		if (subCategoriesSelected.length === 0) {
			return;
		}

		const data = new FormData(e.currentTarget);
		const categoryId = data.get('categoryId')?.toString();
		if (!categoryId) return;

		save = spawnSave(categoryId, tagsSelected, subCategoriesSelected);
	};

	const onImageUpload: EventHandler<Event, HTMLInputElement> = (e) => {
		const file = e.currentTarget.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append('image', file);

		fetch(`http://localhost:7878/${workspaceId}/upload`, {
			method: 'POST',
			body: formData
		}).then(() => images.push(file));
	};
</script>

<section />

<main class="container mx-auto grid gap-4">
	<BlogFrame {content} class="min-w-0" />

	<hr />

	<input type="file" accept="image/*" name="image" on:change={onImageUpload} />

	<form class="grid gap-4" on:submit|preventDefault={onSubmit}>
		<div class="grid grid-cols-3 gap-x-4">
			<div>
				<OutlineFormField>
					<select
						name="categoryId"
						on:change={(e) => categorySelected.set(e.currentTarget.value ?? null)}
					>
						{#each categories as category (category.id)}
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>
				</OutlineFormField>
			</div>

			<ItemSelectorList items={subCategories} bind:selected={subCategoriesSelected} />
			<ItemSelectorList items={tags} bind:selected={tagsSelected} />
		</div>

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
