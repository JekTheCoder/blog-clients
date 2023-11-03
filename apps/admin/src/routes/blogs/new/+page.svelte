<script lang="ts">
	import { buildWs } from '$lib/backend/api';
	import { onMount } from 'svelte';

	import { BlogFrame } from 'blog-frame';

	let content = '';

	onMount(() => {
		const ws = buildWs();

		ws.addEventListener('message', (event) => {
			content = event.data;
		});
	});
</script>

<main class="container mx-auto">
	<BlogFrame {content} />
</main>
