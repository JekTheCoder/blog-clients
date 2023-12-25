<script lang="ts">
	import CardArticle from '$lib/modules/ui/card/CardArticle.svelte';
	import OutlineFormField from '$lib/modules/ui/form-field/fields/OutlineFormField.svelte';
	import type { LoginResponse } from 'backend/auth/login';
	import type { FormEventHandler } from 'svelte/elements';
	import { goto } from '$app/navigation';
	import { setTokens, user } from 'globals/user';

	let invalid = false;
	let password = '';

	const handleLogin = (login: LoginResponse) => {
		user.set(login.user);

		setTokens(login);

		goto('/');
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		const formData = new FormData(event.currentTarget);

		const username = formData.get('username')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const name = formData.get('name')?.toString() ?? '';
		const email = formData.get('email')?.toString() ?? '';
	};

	let repeatInput: HTMLInputElement;

	function checkRepeatInput() {
		repeatInput.setCustomValidity(password === repeatInput.value ? '' : 'Passwords do not match.');
	}
</script>

<main class="grid place-content-center h-screen">
	<CardArticle>
		<h1>Register</h1>

		<hr class="my-2" />

		<form method="POST" class="grid gap-4 mb-6" on:submit|preventDefault={onSubmit}>
			<div class="grid gap-4 grid-cols-2">
				<OutlineFormField>
					<label for="">Username</label>
					<input type="text" name="username" required />
				</OutlineFormField>

				<OutlineFormField>
					<label for="">Name</label>
					<input type="text" name="name" />
				</OutlineFormField>
			</div>

			<OutlineFormField>
				<label for="">Email</label>
				<input type="email" name="email" required />
			</OutlineFormField>

			<div class="grid gap-4 md:grid-cols-2">
				<OutlineFormField>
					<label for="">Password</label>
					<input
						type="password"
						name="password"
						required
						bind:value={password}
						on:input={() => checkRepeatInput()}
					/>
				</OutlineFormField>

				<OutlineFormField>
					<label for="">Repeat password</label>
					<input
						type="password"
						name="rpassword"
						required
						on:input={() => checkRepeatInput()}
						bind:this={repeatInput}
					/>
				</OutlineFormField>
			</div>

			{#if invalid}
				<p class="text-warning">Username or password invalid.</p>
			{/if}

			<button type="submit" class="button raised primary w-full">Register</button>
		</form>

		<footer>
			<p class="text-center">
				Already have an account?
				<a href="/auth/sign-in" class="link">sign in</a>
			</p>
		</footer>
	</CardArticle>
</main>
