<script lang="ts">
	import { triggerTokensRefresh } from 'backend';
	import type { EventHandler } from 'svelte/elements';

	const onClick: EventHandler<MouseEvent, HTMLButtonElement> = () => {
		triggerTokensRefresh();
	};
</script>

<button class="button raised primary" on:click={onClick}>refresh tokens</button>
