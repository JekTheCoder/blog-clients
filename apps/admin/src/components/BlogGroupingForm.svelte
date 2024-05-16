<script lang="ts">
	import { OutlineFormField } from 'ui/form-field';
	import { writable } from 'svelte/store';
	import {
		getAll as getAllSubCategories,
		type SubCategory,
	} from 'backend/sub-categories';
	import { getAll as getAllTags, type Tag } from 'backend/tags';
	import ItemSelectorList from '@/components/ui/ItemSelectorList.svelte';
	import type { Category } from 'backend/categories';
	import { createEventDispatcher } from 'svelte';
	import type { BlogGroupingIds } from '@/lib/types/grouping';

	const dispatch = createEventDispatcher<{
		groupingChange: BlogGroupingIds;
	}>();

	export let categories: Category[];

	const categorySelected = writable(categories[0]?.id ?? null);

	let subCategories: SubCategory[] = [];
	let subCategoriesSelected: SubCategory[] = [];
	$: {
		subCategoriesSelected.length = 0;

		if ($categorySelected) {
			subCategories.length = 0;
			getAllSubCategories($categorySelected).then(res => {
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
			getAllTags($categorySelected).then(res => {
				tags = res.data;
			});
		}
	}

	$: {
		dispatch('groupingChange', {
			categoryId: $categorySelected,
			subCategories: subCategoriesSelected.map(subCategory => subCategory.id),
			tags: tagsSelected.map(tag => tag.id),
		});
	}
</script>

<div class="grid grid-cols-3 gap-x-4">
	<div>
		<OutlineFormField>
			<select
				name="categoryId"
				on:change={e => categorySelected.set(e.currentTarget.value ?? null)}
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
