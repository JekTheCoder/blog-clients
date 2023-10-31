<script lang="ts">
	import type { BlogPreview } from '$lib/backend/api/blogs/get-all-blogs';

	export let post: BlogPreview;
</script>

<a href="/blogs/{post.id}">
	<article>
		<div class="img-wrapper">
			<img src="https://cdn-images-1.medium.com/max/600/1*G6Wcui5h86A-GX50pZ4-yg.jpeg" alt="" />
		</div>

		<h4>{post.title}</h4>
		<p>
			{post.content}
		</p>
	</article>
</a>

<style lang="scss">
	.img-wrapper {
		width: 100%;
		aspect-ratio: 2 / 1;
		overflow: hidden;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;

		transition: transform 0.2s ease-in-out;
	}

	a:hover img {
		transform: scale(1.1);
	}
</style>
