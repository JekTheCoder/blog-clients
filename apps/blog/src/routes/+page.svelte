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

<Header />

<main class="container mx-auto pt-6">
	<h2>Lorem ipsum dolor sit.</h2>

	<section class="flex justify-between gap-x-6 py-4">
		<div class="flex gap-x-4">
			<span>Lorem, ipsum.</span>
			<span>Molestias, distinctio.</span>
			<span>Perspiciatis, maiores.</span>
			<span>Rem, numquam.</span>
		</div>

		<div />
	</section>

	<hr />

	<section>
		<h3>Latests</h3>
		<hr class="my-2" />

		{#if data.latests[0]}
			{@const blog = data.latests[0]}
			<MainPostPreview preview={blog.preview} title={blog.title} mainImage={blog.mainImage} />
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
