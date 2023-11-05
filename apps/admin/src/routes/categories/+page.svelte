<script lang="ts">
	import type { PageData } from './$types';
	import { OutlineFormField } from 'ui/form-field';
	import { create } from 'backend/categories';
	import type { EventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';

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
	};
</script>

<main class="container mx-auto">
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
				<span>
					{category.data.name}
				</span>

				<span>
					{#await category.status}
						...
					{:then result}
						{result}
					{/await}
				</span>
			</li>
		{/each}

		{#each data.categories as category}
			<li>
				{category}
			</li>
		{/each}
	</ul>
</main>
