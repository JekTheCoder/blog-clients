<script lang="ts">
	import type { EventHandler } from 'svelte/elements';

	export let workspaceId: string;
	export let images: File[] = [];

	const onImageUpload: EventHandler<Event, HTMLInputElement> = e => {
		const file = e.currentTarget.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append('image', file);

		fetch(`http://localhost:7878/${workspaceId}/upload`, {
			method: 'POST',
			body: formData,
		}).then(() => images.push(file));
	};
</script>

<input type="file" accept="image/*" name="image" on:change={onImageUpload} />
