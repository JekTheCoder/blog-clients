<script lang="ts">
	import type { PageData } from './$types';
	import { OutlineFormField } from 'ui/form-field';
	import { createOne, type Tag, type TagRequest, deleteOne } from 'backend/tags';
	import type { EventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import TagPromise from '$lib/components/tags/TagPromise.svelte';
	import { Icon } from 'ui/icon';
	import TagBackgroundSelect from '$lib/components/tags/TagBackgroundSelect.svelte';
	import type { IdReturn } from 'backend';
	import { Tag as TagContent } from 'domain-ui/tag';

	export let data: PageData;
	let id = $page.params.id;

	type TagCreation = {
		key: number;
		status: Promise<IdReturn>;
		data: TagRequest;
	};

	const creationTags = writable<TagCreation[]>([]);

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

		creationTags.update((categories) => {
			categories.push({
				key: Math.random(),
				status: createReq,
				data: req
			});

			return categories;
		});

		form.reset();
	};

	const spawnDelete = ({ id }: Tag) => {
		const i = data.tags.findIndex((c) => c.id === id);
		if (i === -1) return;

		deleteOne(id).then(() => {
			data.tags.splice(i, 1);
			data.tags = data.tags;
		});
	};

	const onTagDone = ({ id }: IdReturn, { name, color }: TagRequest, key: number) => {
		creationTags.update((tags) => {
			const i = tags.findIndex((t) => t.key === key);
			if (i === -1) return tags;

			tags.splice(i, 1);
			return tags;
		});

		data.tags.unshift({ id, name, color });
		data = data;
	};
</script>

<main class="container mx-auto grid gap-4">
	<h1>Tags</h1>

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
		{#each $creationTags as tag (tag.key)}
			<li>
				<TagPromise
					on:done={(e) => onTagDone(e.detail, tag.data, tag.key)}
					categoryId={id}
					status={tag.status}
					name={tag.data.name}
					color={tag.data.color}
				/>
			</li>
		{/each}

		{#each data.tags as tag (tag.id)}
			<li class="flex items-center justify-between">
				<div>
					<TagContent id={tag.id} name={tag.name} color={tag.color} />
				</div>

				<div class="flex gap-x-2">
					<button class="button icon accent">
						<Icon icon="material-symbols:edit" />
					</button>

					<button class="button icon warn" on:click={() => spawnDelete(tag)}>
						<Icon icon="material-symbols:delete" />
					</button>
				</div>
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
