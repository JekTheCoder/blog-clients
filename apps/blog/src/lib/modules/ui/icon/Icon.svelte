<script lang="ts">
	import 'iconify-icon';

	export let icon: string;
	let klass = '';

	export { klass as class };
</script>

<iconify-icon {icon} class={klass} />
