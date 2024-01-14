<script lang="ts">
	import type { BlogPreview } from 'backend/blogs';
	import { Tag as TagComponent } from 'domain-ui/tag';
	import { CategoryText } from 'domain-ui/category';
	import { SubCategories } from 'domain-ui/sub-category';

	export let post: BlogPreview;
</script>

<a href="/blogs/{post.id}">
	<article class="grid grid-rows-[auto_1fr_auto]">
		<div class="img-wrapper">
			<img src={post.mainImage} alt="" />
		</div>

		<h4>{post.title}</h4>

		<div>
			{@html post.preview}
		</div>

		<footer class="flex gap-x-4 overflow-auto">
			<CategoryText name={post.category.name} id={post.category.id} />

			<span>•</span>

			<SubCategories subCategories={post.subCategories} />

			<span>•</span>

			<ul class="flex gap-x-2">
				{#each post.tags as tag (tag.id)}
					<li><TagComponent id={tag.id} name={tag.name} color={tag.color} /></li>
				{/each}
			</ul>
		</footer>
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
