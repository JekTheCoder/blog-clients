<script lang="ts">
	import { buildWs } from '$lib/backend/api';
	import { onMount } from 'svelte';

	import { BlogFrame } from 'blog-frame';
	import type { MessageResult, WRequest } from './type';
	import { blog } from './blog';

	let content = blog;

	let ws: WebSocket;

	// onMount(() => {
	// 	ws = buildWs();
	//
	// 	ws.addEventListener('message', (event) => {
	// 		handleMessage(JSON.parse(event.data));
	// 	});
	//
	// 	return () => ws.close();
	// });

	const handleMessage = (result: MessageResult) => {
		switch (result.type) {
			case 'ok':
				switch (result.value.type) {
					case 'html':
						content = result.value.value;
						break;
					case 'content':
						break;
				}
				break;
			case 'err':
				break;
		}
	};

	const handleSave = () => {
		let req: WRequest = {
			type: 'getContent'
		};

		ws.send(JSON.stringify(req));
	};
</script>

<header class="container mx-auto">
	<nav class="flex gap-x-2 p-4">
		<a href="/" class="link">Home</a>
	</nav>
</header>

<section />

<main class="container mx-auto">
	<BlogFrame {content} />
</main>

<footer>
	<button class="button primary raised" on:click={handleSave}>Save</button>
</footer>
