<script lang="ts">
	import { triggerTokensRefresh } from 'auth';
	import type { EventHandler } from 'svelte/elements';

	const onClick: EventHandler<MouseEvent, HTMLButtonElement> = () => {
		triggerTokensRefresh();
	};
</script>

<button class="button raised primary" on:click={onClick}>refresh tokens</button>
