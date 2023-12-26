<script lang="ts">
	import { page } from '$app/stores';
	import CardArticle from '$lib/modules/ui/card/CardArticle.svelte';
	import { OutlineFormField } from 'ui/form-field';
	import { login } from 'auth';
	import type { FormEventHandler } from 'svelte/elements';
	import { goto } from '$app/navigation';

	const redirectUrl = $page.url.searchParams.get('redirect') ?? '/';

	let invalid = false;

	const handleLogin = () => {
		goto(redirectUrl).catch(() => goto('/'));
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		const formData = new FormData(event.currentTarget);
		const username = formData.get('username')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		login(username, password)
			.then(handleLogin)
			.catch(() => (invalid = true));
	};
</script>

<main class="grid place-content-center h-screen">
	<CardArticle>
		<h1>Sign in</h1>

		<hr class="my-2" />

		<form method="POST" class="mb-6 grid gap-4" on:submit|preventDefault={onSubmit}>
			<OutlineFormField>
				<svelte:fragment slot="label">Username</svelte:fragment>
				<input type="text" name="username" required />
			</OutlineFormField>

			<OutlineFormField>
				<svelte:fragment slot="label">Password</svelte:fragment>
				<input type="password" name="password" required />
			</OutlineFormField>

			{#if invalid}
				<p class="text-warning">Username or password invalid.</p>
			{/if}

			<button type="submit" class="button raised primary w-full">Sign in</button>
		</form>

		<footer>
			<p>
				Don't have an account?
				<a href="/auth/register" class="link">Register</a>
			</p>
		</footer>
	</CardArticle>
</main>
