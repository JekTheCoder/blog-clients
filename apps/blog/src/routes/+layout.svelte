<script>
	import { onMount } from 'svelte';
	import { saveChanges } from '$lib/global/user';
	import './styles.scss';

	onMount(() => {
		const theme = localStorage.getItem('theme');
		document.querySelector('body')?.classList.add(theme ?? 'light-theme');
	});

	onMount(() => {
		window.addEventListener('beforeunload', () => saveChanges());
	})
</script>

<slot />

<style>
	:global(body) {
		display: grid;
		grid-template-rows: auto 1fr auto;

		background-color: var(--app-bg-color);

		min-height: 100vh;
	}

	:global(h2) {
		font-size: 3rem;
		font-weight: 600;
	}

	:global(h3) {
		font-size: 2rem;
		font-weight: 600;
	}

	:global(h4) {
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
