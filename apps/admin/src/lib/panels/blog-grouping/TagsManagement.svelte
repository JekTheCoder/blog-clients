<script lang="ts">
	import type { Tag } from 'backend/tags';
	import { setTags } from 'backend/blogs';
	import BaseTagsManagement from './BaseTagsManagement.svelte';
	import { FlashingDots } from 'ui/dots';

	export let blogTags: Tag[];
	export let allTags: Tag[];

	export let blogId: string;

	let save: Promise<unknown> | null = null;

	const handleSave = ({ detail }: CustomEvent<Tag[]>) => {
		const tags = detail.map((tag) => tag.id);
		save = setTags(blogId, tags);
	};
</script>

<BaseTagsManagement {blogTags} {allTags} on:save={handleSave} />

{#if save}
	{#await save}
		<FlashingDots />
	{:then}
		Saved!
	{:catch}
		Oops
	{/await}
{/if}
