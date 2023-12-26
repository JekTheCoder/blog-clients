<script lang="ts">
	import type { PageData } from './$types';
	import { OutlineFormField } from 'ui/form-field';
	import { createOne, type SubCategory, deleteOne } from 'backend/sub-categories';
	import type { EventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import CategoryPromise from '$lib/components/category/CategoryPromise.svelte';
	import { Icon } from 'ui/icon';

	export let data: PageData;
	let categoryId = $page.params.id;

	type CategoryCreation = {
		key: number;
		status: Promise<unknown>;
		data: {
			name: string;
		};
	};

	const creationCategories = writable<CategoryCreation[]>([]);

	const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = ({ currentTarget: form }) => {
		const formData = new FormData(form);
		const name = formData.get('name');
		if (!name) return;

		const createReq = createOne(categoryId, {
			name: name.toString()
		});

		creationCategories.update((categories) => {
			categories.push({
				key: Math.random(),
				status: createReq,
				data: {
					name: name.toString()
				}
			});

			return categories;
		});

		form.reset();
	};

	const spawnDelete = ({ id }: SubCategory) => {
		const i = data.subCategories.findIndex((c) => c.id === id);
		if (i === -1) return;

		deleteOne(id).then(() => {
			data.subCategories.splice(i, 1);
			data.subCategories = data.subCategories;
		});
	};
</script>

<main class="container mx-auto grid gap-4">
	<h1>SubCategories</h1>

	<form class="grid gap-4" on:submit|preventDefault={handleSubmit}>
		<OutlineFormField>
			<svelte:fragment slot="label">Name</svelte:fragment>
			<input type="text" required name="name" />
		</OutlineFormField>

		<div class="flex gap-x-2 justify-end">
			<button type="submit" class="button primary raised">Submit</button>
		</div>
	</form>

	<ul>
		{#each $creationCategories as category (category.key)}
			<li>
				<CategoryPromise status={category.status} name={category.data.name} />
			</li>
		{/each}

		{#each data.subCategories as subCategory (subCategory.id)}
			<li class="flex justify-between">
				<span>
					{subCategory.name}
				</span>

				<div class="flex gap-x-2">
					<button class="button icon accent">
						<Icon icon="material-symbols:edit" />
					</button>

					<button class="button icon warn" on:click={() => spawnDelete(subCategory)}>
						<Icon icon="material-symbols:delete" />
					</button>
				</div>
			</li>
		{/each}
	</ul>
</main>
