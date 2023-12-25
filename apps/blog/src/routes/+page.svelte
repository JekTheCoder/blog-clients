<script lang="ts">
	import VPostPreview from '$lib/modules/posts/preview/VPostPreview.svelte';
	import MainPostPreview from '$lib/modules/posts/preview/MainPostPreview.svelte';
	import Header from '$lib/modules/ui/main-layout/Header.svelte';
	import RadioPaginator from '$lib/modules/components/paginators/RadioPaginator.svelte';
	import type { PageData } from './$types';
	import { LATEST_PAGE_SIZE } from './constants';
	import ViewMore from './ViewMore.svelte';

	export let data: PageData;

	let page = 0;

	$: bellowBlogs = data.latests.slice(1);
	$: isExact = bellowBlogs.length % LATEST_PAGE_SIZE === 0;

	// Its -2 instead of -1 because of skip of the first blog
	$: pages = Math.floor((data.latests.length - 2) / LATEST_PAGE_SIZE) + 1 + (isExact ? 1 : 0);

	function chunks<T>(array: T[], size: number): T[][] {
		const nChunks = Math.floor((array.length - 1) / size) + 1;
		const chunks: T[][] = [];

		for (let i = 0; i < nChunks; i++) {
			chunks.push(array.slice(i * size, i * size + size));
		}

		return chunks;
	}
</script>

<svelte:head>
	<title>MeBlog</title>
</svelte:head>

<Header />

<main class="container mx-auto pt-6">
	<h2>MeBlog</h2>

	<!-- <nav class="py-2"> -->
	<!-- 	<ul class="flex justify-evenly overflow-auto w-full gap-x-4"> -->
	<!-- 		{#each data.categories as category} -->
	<!-- 			<li> -->
	<!-- 				<a class="link" href="/blogs/?category={category.id}"> -->
	<!-- 					{category.name} -->
	<!-- 				</a> -->
	<!-- 			</li> -->
	<!-- 		{/each} -->
	<!-- 	</ul> -->
	<!-- </nav> -->

	<hr class="mb-4" />

	<section>
		<h3>Latests</h3>

		{#if data.latests[0]}
			{@const blog = data.latests[0]}
			<MainPostPreview
				preview={blog.preview}
				title={blog.title}
				mainImage={blog.mainImage}
				blogId={blog.id}
			/>
		{/if}

		<hr class="my-3" />

		<div class="w-full overflow-hidden">
			<div class="carousel" style="transform: translateX(-{page * 100}%)">
				{#each chunks(bellowBlogs, LATEST_PAGE_SIZE) as chunk, i}
					<div class="chunk grid grid-cols-3 gap-x-2 min-w-full">
						{#each chunk as blog}
							<VPostPreview post={blog} />
						{/each}

						{#if !isExact && i === pages - 1}
							<ViewMore />
						{/if}
					</div>
				{/each}

				{#if isExact}
					<div class="chunk grid grid-cols-3 gap-x-2 min-w-full">
						<ViewMore />
					</div>
				{/if}
			</div>
		</div>

		<footer class="mt-6">
			<RadioPaginator {pages} bind:page />
		</footer>
	</section>
</main>

<footer />

<style lang="scss">
	.carousel {
		transition: transform 0.5s ease;
		display: flex;
	}
</style>
