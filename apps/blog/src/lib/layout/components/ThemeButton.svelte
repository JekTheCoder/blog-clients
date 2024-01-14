<script lang="ts">
	import Icon from '$lib/modules/ui/icon/Icon.svelte';
	import { Theme, theme } from '$lib/globals/theme';

	const icons = {
		[Theme.Dark]: 'ion:moon',
		[Theme.Light]: 'ion:sunny'
	};

	function onClick() {
		theme.set($theme === Theme.Dark ? Theme.Light : Theme.Dark);
	}
</script>

<button class="button icon" on:click={onClick}>
	<Icon icon={icons[$theme]} />
</button>
