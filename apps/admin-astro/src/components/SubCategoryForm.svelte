<script lang="ts">
	import type { EventHandler } from "svelte/elements";
	import { OutlineFormField } from "ui/form-field";
	import CategoryPromise from "./category/CategoryPromise.svelte";
	import { Icon } from "ui/icon";
	import type { SubCategory } from "backend/sub-categories";
	import { subCategories$, setCategoryId } from '@/lib/stores/sub-categories';

	export let subCategories: SubCategory[];
	export let categoryId: string;

	setCategoryId(categoryId);
	subCategories$.items.set(subCategories);

	const { items, creations } = subCategories$;

	const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = ({ currentTarget: form }) => {
		const formData = new FormData(form);
		const name = formData.get('name');
		if (!name) return;

		subCategories$.add({
			name: name.toString(),
		});

		form.reset();
	};

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
		{#each $creations as subCategory (subCategory.key)}
			<li>
				<CategoryPromise status={subCategory.status} name={subCategory.item.name} />
			</li>
		{/each}

		{#each $items as subCategory (subCategory.id)}
			<li class="flex justify-between">
				<span>
					{subCategory.name}
				</span>

				<div class="flex gap-x-2">
					<button class="button icon accent">
						<Icon icon="material-symbols:edit" />
					</button>

					<button class="button icon warn" on:click={() => subCategories$.delete(subCategory.id)}>
						<Icon icon="material-symbols:delete" />
					</button>
				</div>
			</li>
		{/each}
	</ul>
