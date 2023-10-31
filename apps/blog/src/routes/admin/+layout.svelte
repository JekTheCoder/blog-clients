<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/global/user';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	onMount(() => {
		const user_ = get(user);
		if (!user_) {
			goto('/auth/sign-in');
			return;
		}
	});
</script>

<slot />
