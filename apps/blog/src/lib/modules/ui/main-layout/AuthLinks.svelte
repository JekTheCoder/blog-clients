<script>
	import { user, setTokens } from 'globals/user';

	$: isLoggedIn = Boolean($user);

	const logout = () => {
		user.set(null);
		setTokens(null);
	};
</script>

<ul class="flex gap-x-2">
	{#if isLoggedIn}
		<li><button class="link" on:click={logout}>Logout</button></li>
	{:else}
		<li>
			<a class="link" href="/auth/sign-in">Sign in</a>
		</li>
		<li>
			<a class="link" href="/auth/register">Register</a>
		</li>
	{/if}
</ul>
