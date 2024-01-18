<script>
	import Header from '$lib/modules/ui/main-layout/Header.svelte';
</script>

<Header />

<main class="container px-4">
	<div>
		<a class="link" href="/blogs">Back</a>
	</div>
	<slot />
</main>

<style>
	main {
		max-width: 1000px;
		margin: 0 auto;
	}
</style>
