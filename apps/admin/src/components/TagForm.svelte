<script lang="ts">
	import type { EventHandler } from "svelte/elements";
	import { OutlineFormField } from "ui/form-field";
	import { Icon } from "ui/icon";
	import type { Tag } from "backend/tags";
	import { tags$, setCategoryId } from '@/lib/stores/tags';
	import TagBackgroundSelect from "./tags/TagBackgroundSelect.svelte";
	import TagPromise from "./tags/TagPromise.svelte";
	import { Tag as TagContent } from 'domain-ui/tag';

	export let tags: Tag[];
	export let categoryId: string;

	setCategoryId(categoryId);
	tags$.items.set(tags);

	const { items, creations } = tags$;

	const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = ({ currentTarget: form }) => {
		const formData = new FormData(form);
		const name = formData.get('name');
		const color = formData.get('color');
		if (!name || !color) return;

		tags$.add({
			name: name.toString(),
			color: color.toString(),
		});

		form.reset();
	};

</script>

	<form class="grid gap-4" on:submit|preventDefault={handleSubmit}>
		<div class="row gap-4">
			<OutlineFormField>
				<svelte:fragment slot="label">Name</svelte:fragment>
				<input type="text" required name="name" />
			</OutlineFormField>

			<OutlineFormField>
				<svelte:fragment slot="label">Color</svelte:fragment>
				<TagBackgroundSelect name="color" />
			</OutlineFormField>
		</div>

		<div class="flex gap-x-2 justify-end">
			<button type="submit" class="button primary raised">Submit</button>
		</div>
	</form>

	<ul>
		{#each $creations as tag (tag.key)}
			<li>
				<TagPromise
					categoryId={categoryId}
					status={tag.status}
					name={tag.data.name}
					color={tag.data.color}
				/>
			</li>
		{/each}

		{#each $items as tag (tag.id)}
			<li class="flex items-center justify-between">
				<div>
					<TagContent id={tag.id} name={tag.name} color={tag.color} />
				</div>

				<div class="flex gap-x-2">
					<button class="button icon accent">
						<Icon icon="material-symbols:edit" />
					</button>

						<button class="button icon warn" on:click={() => tags$.delete(tag.id)}>
						<Icon icon="material-symbols:delete" />
					</button>
				</div>
			</li>
		{/each}
	</ul>

<style>
	.row {
		display: grid;
		grid-template-columns: 3fr 1fr;
	}
</style>
