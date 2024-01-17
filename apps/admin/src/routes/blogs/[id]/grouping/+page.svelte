<script lang="ts">
	import TagsManagement from '$lib/panels/blog-grouping/TagsManagement.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="container mx-auto">
	<h1 class="text-3xl font-semibold mb-4">Blog: {data.blog.title}</h1>

	<section>
		<TagsManagement blogId={data.blog.id} blogTags={data.blog.tags} allTags={data.tags} />
	</section>
</main>
