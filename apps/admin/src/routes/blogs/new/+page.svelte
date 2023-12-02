<script lang="ts">
	import { onMount } from 'svelte';

	import { BlogFrame } from 'blog-frame';
	import { blog } from './blog';
	import type { PageData } from './$types';
	import { OutlineFormField } from 'ui/form-field';
	import type { EventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';
	import { getAll as getAllSubCategories, type SubCategory } from 'backend/sub-categories';
	import { getAll as getAllTags, type Tag } from 'backend/tags';
	import ItemSelectorList from './ItemSelectorList.svelte';
	import { BlogRwClient } from '$lib/blogs/blog-rw-client';

	export let data: PageData;
	let content = blog;

	let client: BlogRwClient;

	onMount(() => {
		client = new BlogRwClient();
		const onHtml = client.onHtml();

		const sub = onHtml.subscribe((html) => (content = html));

		return () => {
			client.close();
			sub();
		};
	});

	const categorySelected = writable(data.categories[0]?.id ?? null);

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

	const spawnSave = async () => {
		const content = await client.getContent();
		console.log({ tagsSelected, subCategoriesSelected, content });
	};

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = (e) => {
		spawnSave();
	};
</script>

<section />

<main class="container mx-auto grid gap-4">
	<BlogFrame {content} class="min-w-0" />

	<hr />

	<form class="grid gap-4" on:submit|preventDefault={onSubmit}>
		<div class="grid grid-cols-3 gap-x-4">
			<div>
				<OutlineFormField>
					<select
						name="categoryId"
						on:change={(e) => categorySelected.set(e.target?.value ?? null)}
					>
						{#each data.categories as category (category.id)}
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>
				</OutlineFormField>
			</div>

			<ItemSelectorList items={subCategories} bind:selected={subCategoriesSelected} />
			<ItemSelectorList items={tags} bind:selected={tagsSelected} />
		</div>

		<footer class="flex justify-end">
			<button type="submit" class="button primary raised">Save</button>
		</footer>
	</form>
</main>