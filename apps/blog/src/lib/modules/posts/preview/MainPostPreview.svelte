<script lang="ts">
	export let preview: string;
	export let title: string;
	export let mainImage: string | null | undefined;
	export let blogId: string;

	$: blogUrl = `/blogs/${blogId}`;
</script>

<article>
	{#if mainImage}
		<a href={blogUrl}>
			<img src={mainImage} alt="" />
		</a>
	{/if}

	<div class="p-2">
		<a href={blogUrl}>
			<h4>{title}</h4>
		</a>

		{@html preview}
	</div>
</article>

<style>
	article {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 1rem;
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
		aspect-ratio: 2 / 1;
	}
</style>
