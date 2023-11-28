<script lang="ts">
	import type { PageData } from './$types';
	import { OutlineFormField } from 'ui/form-field';
	import { create, type Category, deleteOne } from 'backend/categories';
	import type { EventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';
	import CategoryPromise from '$lib/components/category/CategoryPromise.svelte';
	import { Icon } from 'ui/icon';

	export let data: PageData;

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

		const createReq = create({
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

	const spawnDelete = ({ id }: Category) => {
		deleteOne(id);
	};
</script>

<main class="container mx-auto grid gap-4">
	<h1>Categories</h1>

	<form class="grid gap-4" on:submit|preventDefault={handleSubmit}>
		<OutlineFormField>
			<label for="">Name</label>
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

		{#each data.categories as category (category.id)}
			<li class="flex justify-between">
				<span>
					{category.name}
				</span>

				<div class="flex gap-x-2">
					<button class="button icon accent">
						<Icon icon="material-symbols:edit" />
					</button>

					<button class="button icon warn" on:click={() => spawnDelete(category)}>
						<Icon icon="material-symbols:delete" />
					</button>

					|

					<a href="categories/{category.id}/sub-categories" class="link"> SubCategories </a>
					<a href="categories/{category.id}/tags" class="link"> Tags </a>
				</div>
			</li>
		{/each}
	</ul>
</main>
