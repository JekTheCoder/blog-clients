<script>
	import ThemeButton from '$lib/layout/components/ThemeButton.svelte';
	import AuthLinks from './AuthLinks.svelte';
</script>

<header class="py-2 sticky top-0 flex items-center">
	<div class="container mx-auto px-4 layout">
		<h1><a href="/">MeBlog</a></h1>

		<div />

		<div class="flex gap-x-4 items-center">
			<ThemeButton />

			<AuthLinks />
		</div>
	</div>
</header>

<style>
	header {
		background-color: var(--header-bg-color);
		backdrop-filter: blur(10px);
		z-index: 10;
	}

	.layout {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 2rem;
		place-items: center;
	}

	a {
		text-decoration: underline;
	}
</style>
