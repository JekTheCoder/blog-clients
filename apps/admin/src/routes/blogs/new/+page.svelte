<script lang="ts">
	import { buildWs } from '$lib/backend/api';
	import { onMount } from 'svelte';

	import { BlogFrame } from 'blog-frame';
	import type { MessageResult, WRequest } from './type';
	import { blog } from './blog';
	import type { PageData } from './$types';
	import { OutlineFormField } from 'ui/form-field';
	import type { EventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';
	import { getAll as getAllSubCategories, type SubCategory } from 'backend/sub-categories';
	import DropdownSearch from '$lib/backend/ui/search/DropdownSearch.svelte';
	import { getAll as getAllTags, type Tag } from 'backend/tags';

	export let data: PageData;
	let content = blog;

	let ws: WebSocket;

	// onMount(() => {
	// 	ws = buildWs();
	//
	// 	ws.addEventListener('message', (event) => {
	// 		handleMessage(JSON.parse(event.data));
	// 	});
	//
	// 	return () => ws.close();
	// });

	const handleMessage = (result: MessageResult) => {
		switch (result.type) {
			case 'ok':
				switch (result.value.type) {
					case 'html':
						content = result.value.value;
						break;
					case 'content':
						break;
				}
				break;
			case 'err':
				break;
		}
	};

	const handleSave = () => {
		let req: WRequest = {
			type: 'getContent'
		};

		ws.send(JSON.stringify(req));
	};

	const categorySelected = writable(data.categories[0]?.id ?? null);

	let subCategories: SubCategory[] = [];
	$: {
		if ($categorySelected) {
			subCategories.length = 0;
			getAllSubCategories($categorySelected).then((res) => {
				subCategories = res.data;
			});
		}
	}

	let tags: Tag[] = [];
	$: {
		if ($categorySelected) {
			tags.length = 0;
			getAllTags($categorySelected).then((res) => {
				tags = res.data;
			});
		}
	}


	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = (e) => {};
</script>

<section />

<main class="container mx-auto grid gap-4">
	<BlogFrame {content} />

	<hr />

	<form action="" class="grid grid-cols-3 gap-x-4" on:submit|preventDefault={onSubmit}>
		<OutlineFormField>
			<select name="categoryId" on:change={(e) => categorySelected.set(e.target?.value ?? null)}>
				{#each data.categories as category (category.id)}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
		</OutlineFormField>

		<div>
			<OutlineFormField>
				<DropdownSearch items={subCategories} />
			</OutlineFormField>
			<ul />
		</div>

		<div>
			<OutlineFormField>
				<DropdownSearch items={tags} />
			</OutlineFormField>

			<ul />
		</div>
	</form>

	<footer class="flex justify-end">
		<button class="button primary raised" on:click={handleSave}>Save</button>
	</footer>
</main>
