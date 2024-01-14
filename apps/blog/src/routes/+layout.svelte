<script lang="ts">
	import { onMount } from 'svelte';
	import './styles.scss';
	import { authReadFrom, saveAuth } from 'auth/persistance';
	import { setAuthHandler } from 'auth';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Theme, theme } from '$lib/globals/theme';

	onMount(() => {
		theme.subscribe((theme) => {
			const classes = document.querySelector('body')!.classList;
			classes.remove(Theme.Light as unknown as string, Theme.Dark as unknown as string);

			classes.add(theme as unknown as string);
			localStorage.setItem('theme', theme as unknown as string);
		});

		authReadFrom(localStorage);
		window.addEventListener('beforeunload', () => {
			alert('beforeunload');
			saveAuth(localStorage);
		});

		setAuthHandler({
			redirectLogin: () => {
				const pathname = $page.url.pathname;
				const parsed = encodeURI(pathname);
				return goto('/auth/sign-in?redirect=' + parsed);
			}
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
		color: var(--primary-text-color);
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
