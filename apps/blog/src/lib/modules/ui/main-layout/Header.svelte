<script>
	import { getAllBlogs } from '$lib/backend/api/blogs/get-all-blogs'
</script>

<header class="container mx-auto py-6 sticky top-0">
	<h1>/</h1>

	<div>
		<button on:click={() => getAllBlogs()}>aa</button>
	</div>

	<div class="flex gap-x-2">
		<a href="/auth/sign-in">Sign in</a>
		<a href="/">Register</a>
	</div>
</header>

<style>
	header {
		background-color: var(--bg-color);
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 2rem;
	}

	a {
		text-decoration: underline;
	}
</style>
