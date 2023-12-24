<script lang="ts">
	import VPostPreview from '$lib/modules/posts/preview/VPostPreview.svelte';
	import MainPostPreview from '$lib/modules/posts/preview/MainPostPreview.svelte';
	import Header from '$lib/modules/ui/main-layout/Header.svelte';
	import RadioPaginator from '$lib/modules/components/paginators/RadioPaginator.svelte';
	import type { PageData } from './$types';
	import { LATEST_PAGE_SIZE } from './constants';

	export let data: PageData;
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

		<div class="grid grid-cols-3 gap-4">
			{#each data.latests.slice(1) as blog}
				<VPostPreview post={blog} />
			{/each}
		</div>

		<a href="/blogs" class="primary button outlined w-full"> View more </a>

		<footer class="mt-6">
			<RadioPaginator pages={Math.floor((data.latests.length - 1) / LATEST_PAGE_SIZE) + 1} />
		</footer>
	</section>
</main>

<footer />
