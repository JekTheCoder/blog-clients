<script lang="ts">
	import type { Category } from 'backend/categories';
	import type { SubCategory } from 'backend/sub-categories';
	import type { Tag } from 'backend/tags';
	import { format } from 'common/date';
	import { Tag as TagComponent } from 'domain-ui/tag';
	import { CategoryText } from 'domain-ui/category';
	import { SubCategories } from 'domain-ui/sub-category';

	export let preview: string;
	export let title: string;
	export let mainImage: string | null | undefined;
	export let blogId: string;
	export let category: Category;
	export let subCategories: SubCategory[];
	export let tags: Tag[];
	export let createdAt: string;

	$: blogUrl = `/blogs/${blogId}`;
</script>

<article>
	{#if mainImage}
		<a href={blogUrl}>
			<img src={mainImage} alt="" />
		</a>
	{/if}

	<section class="p-2 grid grid-rows-[auto_1fr_auto]">
		<a href={blogUrl}>
			<h4>{title}</h4>
			<small>{format(new Date(createdAt))}</small>
		</a>

		<div>
			{@html preview}
		</div>

		<footer class="grid">
			<CategoryText name={category.name} id={category.id} />

			<SubCategories {subCategories} />

			<ul class="flex gap-x-2">
				{#each tags as tag (tag.id)}
					<li><TagComponent id={tag.id} name={tag.name} color={tag.color} /></li>
				{/each}
			</ul>
		</footer>
	</section>
</article>

<style lang="scss">
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
