<script>
	import { page } from '$app/stores';
</script>

<h1>Oh! An error occurred</h1>

<p>
	An error ocurred with status <strong>{$page.status}</strong>. The server responded the following
	message:
</p>

<p>
	{$page.error?.message}
</p>

<p>Please, contact the server administrator</p>
