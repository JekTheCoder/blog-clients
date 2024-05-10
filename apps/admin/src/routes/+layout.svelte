<script>
	import { AuthLinks } from 'auth-ui';
	import { onMount } from 'svelte';
	import './styles.scss';
	import { authReadFrom, saveAuth } from 'auth/persistance';
	import { setAuthHandler } from 'auth';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	onMount(() => {
		const theme = localStorage.getItem('theme');
		document.querySelector('body')?.classList.add(theme ?? 'light-theme');

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

<header class="container mx-auto">
	<nav class="flex justify-between p-4">
		<ul class="flex gap-x-2">
			<li>
				<a href="/" class="link">Home</a>
			</li>

			<li>
				<a href="/categories" class="link">Categories</a>
			</li>

			<li>
				<a href="/blogs" class="link">Blogs</a>
			</li>				

			<li>
				<a href="/storybook" class="link">Storybook</a>
			</li>

			<li>
				<a href="/auth/refresh" class="link">Refresh</a>
			</li>
		</ul>

		<AuthLinks />
	</nav>
</header>

<div>
	<slot />
</div>

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
