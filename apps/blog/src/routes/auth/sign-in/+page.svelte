<script lang="ts">
	import { page } from '$app/stores';
	import CardArticle from '$lib/modules/ui/card/CardArticle.svelte';
	import OutlineFormField from '$lib/modules/ui/form-field/fields/OutlineFormField.svelte';
	import { login, type LoginResponse } from 'backend/auth/login';
	import type { FormEventHandler } from 'svelte/elements';
	import { goto } from '$app/navigation';
	import { setTokens, user } from 'globals/user';

	const redirectUrl = $page.url.searchParams.get('redirect') ?? '/';

	let invalid = false;

	const handleLogin = (login: LoginResponse) => {
		user.set(login.user);

		setTokens(login);

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
				<label for="">Username</label>
				<input type="text" name="username" required />
			</OutlineFormField>

			<OutlineFormField>
				<label for="">Password</label>
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
				<a href="/" class="link">Register</a>
			</p>
		</footer>
	</CardArticle>
</main>
