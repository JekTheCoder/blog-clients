<script lang="ts">
	import BaseOption from '$lib/ui/cdk/BaseOption.svelte';
	import BaseSelect from '$lib/ui/cdk/BaseSelect.svelte';
	import type { Tag } from 'backend/tags';
	import { Tag as TagContent } from 'domain-ui/tag';
	import { createEventDispatcher } from 'svelte';
	import { OutlineFormField } from 'ui/form-field';
	import { Icon } from 'ui/icon';

	const dispatch = createEventDispatcher<{
		save: Tag[];
	}>();

	export let blogTags: Tag[];
	export let allTags: Tag[];

	$: avaliableTags = allTags.filter((tag) => !blogTags.includes(tag));

	const addTag = (tag: Tag) => {
		blogTags = [...blogTags, tag];
	};

	const removeTag = (tag: Tag) => {
		blogTags = blogTags.filter((t) => t !== tag);
	};
</script>

<div class="grid gap-4">
	<h2 class="text-xl font-semibold">Tags</h2>

	<ul class="grid gap-4">
		{#each blogTags as tag (tag.id)}
			<li class="flex gap-x-2 items-center">
				<TagContent id={tag.id} name={tag.name} color={tag.color} />

				<button class="button icon warn" on:click={() => removeTag(tag)}>
					<Icon icon="mdi:remove" />
				</button>
			</li>
		{/each}

		<li class="flex items-center">
			<OutlineFormField class="w-full">
				<BaseSelect let:ctx let:item items={avaliableTags} key={(item) => item.id}>
					<BaseOption
						{ctx}
						value={item}
						on:change={() => addTag(item)}
						class="tag {item.color} w-full"
					>
						{item.name}
					</BaseOption>
				</BaseSelect>
			</OutlineFormField>
		</li>
	</ul>

	<div>
		<button class="button primary raised" on:click={() => dispatch('save', blogTags)}>Save</button>
	</div>

	<style>
		ul {
			grid-template-columns: repeat(auto-fill, minmax(5em, 1fr));
		}
	</style>
</div>
