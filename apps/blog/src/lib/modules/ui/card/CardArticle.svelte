<article class="card p-4">
	<slot />
</article>

<style>
	article {
		background-color: var(--card-bg-color, white);
		box-shadow: var(--card-shadow);
		border-radius: var(--card-radius);
	}
</style>
