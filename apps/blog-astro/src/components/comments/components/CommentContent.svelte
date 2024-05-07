<script lang="ts">
	export let content: string;
	export let name: string;
	export let username: string;
</script>

<div class="block">
	<span class="text-xl font-semibold name">
		{name}
	</span>

	<span class="text-sm username">
		@{username}
	</span>

	<p class="content">
		{content}
	</p>
</div>

<style>
	.name {
		color: var(--name-text-color);
	}

	.username {
		color: var(--username-text-color, theme('colors.gray.500'));
	}

	.content {
		color: var(--content-text-color);
	}
</style>
