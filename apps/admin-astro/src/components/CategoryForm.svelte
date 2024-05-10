<script lang="ts">
	import type { EventHandler } from "svelte/elements";
	import { OutlineFormField } from "ui/form-field";
	import { categories$ } from '@/lib/stores/categories';
	import CategoryPromise from "./category/CategoryPromise.svelte";
	import { Icon } from "ui/icon";
	import type { Category } from "backend/categories";

	export let categories: Category[];
	categories$.items.set(categories);

	const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = ({ currentTarget: form }) => {
		const formData = new FormData(form);
		const name = formData.get('name');
		if (!name) return;

		categories$.add({
			name: name.toString()
		})

		form.reset();
	};

	const { creations, items } = categories$;
</script>

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
		{#each $creations as category (category.key)}
			<li>
				<CategoryPromise status={category.status} name={category.item.name} />
			</li>
		{/each}

		{#each $items as category (category.id)}
			<li class="flex justify-between">
				<span>
					{category.name}
				</span>

				<div class="flex gap-x-2">
					<button class="button icon accent">
						<Icon icon="material-symbols:edit" />
					</button>

					<button class="button icon warn" on:click={() => categories$.remove(category.id)}>
						<Icon icon="material-symbols:delete" />
					</button>

					|

					<a href="categories/{category.id}/sub-categories" class="link"> SubCategories </a>
					<a href="categories/{category.id}/tags" class="link"> Tags </a>
				</div>
			</li>
		{/each}
	</ul>
