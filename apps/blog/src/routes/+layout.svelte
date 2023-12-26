<script>
	import { onMount } from 'svelte';
	import './styles.scss';
	import { authReadFrom, saveAuth } from 'auth/persistance';

	onMount(() => {
		const theme = localStorage.getItem('theme');
		document.querySelector('body')?.classList.add(theme ?? 'light-theme');

		authReadFrom(localStorage);
		window.addEventListener('beforeunload', () => {
			alert('beforeunload');
			saveAuth(localStorage);
		});
	});
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
