<script>
	import { page } from '$app/stores';
</script>

<header>
	<h1>Oh! An error occurred</h1>
</header>

<main>
	<p>
		An error ocurred with status <strong>{$page.status}</strong>. The server responded the following
		message:
	</p>

	<p>
		{$page.error?.message}
	</p>

	<p>Please, contact the server administrator</p>

	<a href="/">Go to home</a>
</main>
