<script lang="ts">
	export let id: string;
	export let name: string;
	export let color: string;
</script>

<a href="/blogs?tag={id}" class="elevation-1" style="background-color: {color}">
	{name}
</a>

<style>
	a {
		display: inline-block;
		border-radius: var(--card-radius);
		padding: 0rem 0.5rem; 
	}
</style>
