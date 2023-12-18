<script lang="ts">
	import { page } from '$app/stores';
	import { uploadImages } from 'backend/blogs';
	import type { ChangeEventHandler, EventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';

	const blogId = $page.params['id'];
	const images = writable<File[]>([]);
	let upload$: Promise<unknown> | null = null;

	const onDrop: ChangeEventHandler<HTMLInputElement> = (event) => {
		images.update((images) => {
			if (!event.currentTarget.files) return images;

			images.push(...event.currentTarget.files);

			return images;
		});
	};

	const upload: EventHandler<Event, HTMLButtonElement> = () => {
		upload$ = uploadImages(blogId, $images);
	};
</script>

<div class="container mx-auto grid gap-4">
	<h1 class="text-3xl font-semibold mb-4">Images</h1>

	<section class="grid relative place-content-center p-4 shadow cursor-pointer">
		<p>Drop your images here</p>
		<input type="file" class="w-full h-full absolute top-0 opacity-0" on:change={onDrop} />
	</section>

	<ul>
		{#each $images as image (image.name)}
			<li>{image.name}</li>
		{/each}
	</ul>

	<footer class="flex justify-end">
		{#if upload$}
			<p class="text-right">
				{#await upload$}
					Uploading...
				{:then}
					Uploaded
				{:catch}
					Failed
				{/await}
			</p>
		{/if}
		<button class="button raised primary" on:click={upload}>Upload</button>
	</footer>
</div>
