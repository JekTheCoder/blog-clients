<script lang="ts">
	import type { PageData } from './$types';
	import { OutlineFormField } from 'ui/form-field';
	import { createOne, type TagRequest } from 'backend/tags';
	import type { EventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	export let data: PageData;
	let id = $page.params.id;

	type CategoryCreation = {
		key: number;
		status: Promise<unknown>;
		data: TagRequest;
	};

	const creationCategories = writable<CategoryCreation[]>([]);

	const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = ({ currentTarget: form }) => {
		const formData = new FormData(form);
		const name = formData.get('name');
		const color = formData.get('color');
		if (!name || !color) return;

		const req = {
			name: name.toString(),
			color: color.toString()
		};
		const createReq = createOne(id, req);

		creationCategories.update((categories) => {
			categories.push({
				key: Math.random(),
				status: createReq,
				data: req
			});

			return categories;
		});

		form.reset();
	};
</script>

<main class="container mx-auto grid gap-4">
	<h1>Tags</h1>

	<form class="grid gap-4" on:submit|preventDefault={handleSubmit}>
		<div class="row gap-4">
			<OutlineFormField>
				<label for="">Name</label>
				<input type="text" required name="name" />
			</OutlineFormField>

			<div class="grid gap-2">
				<label for="">Color</label>
				<input type="color" name="color" required />
			</div>
		</div>

		<div class="flex gap-x-2 justify-end">
			<button type="submit" class="button primary raised">Submit</button>
		</div>
	</form>

	<ul>
		{#each $creationCategories as category (category.key)}
			<li>
				<!-- <CategoryPromise status={category.status} name={category.data.name} /> -->
			</li>
		{/each}

		{#each data.tags as tag (tag.id)}
			<li class="flex justify-between">
				{tag.name}
			</li>
		{/each}
	</ul>
</main>

<style>
	.row {
		display: grid;
		grid-template-columns: 3fr 1fr;
	}
</style>
