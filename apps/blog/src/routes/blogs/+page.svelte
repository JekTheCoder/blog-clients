<script lang="ts">
	import VPostPreview from '$lib/modules/posts/preview/VPostPreview.svelte';
	import type { PageData } from './$types';
	import Header from '$lib/modules/ui/main-layout/Header.svelte';
	import PageLayout from '$lib/modules/ui/main-layout/PageLayout.svelte';
	import MatButton from '$lib/modules/ui/button/components/MatButton.svelte';
	import Icon from '$lib/modules/ui/icon/Icon.svelte';
	import { ButtonDesign } from '$lib/modules/ui/button/type';
	import { page as svPage } from '$app/stores';
	import { getAllBlogs } from '$lib/backend/api/blogs/get-all-blogs';
	import { PAGE_SIZE } from './data';
	import FlashingDots from '$lib/modules/ui/dots/components/FlashingDots.svelte';

	export let data: PageData;

	let page = buildPage($svPage.url.searchParams);
	let blogs: Promise<PageData['blogs']> | PageData['blogs'] = data.blogs;

	function updatePage(page_: number) {
		blogs = getAllBlogs(PAGE_SIZE * page_, PAGE_SIZE).then((blogs) => blogs.unwrap());
		page = page_;
		$svPage.url.searchParams.set('page', page.toString());
	}

	function buildPage(params: URLSearchParams) {
		const pageStr = params.get('page');
		if (!pageStr) return 0;

		const page = Number(pageStr);
		if (isNaN(page)) return 0;

		return page;
	}
</script>

<PageLayout>
	<Header slot="header" />

	<div class="gap-y-8 gap-x-4">
		{#await blogs}
			<div class="flex justify-center w-full">
				<FlashingDots />
			</div>
		{:then blogs}
			{#each blogs as blog}
				<VPostPreview post={blog} />
			{/each}
		{/await}
	</div>

	<footer class="container mx-auto my-8" slot="footer">
		<MatButton design={ButtonDesign.Icon} on:click={() => updatePage(page - 1)}>
			<Icon icon="ooui:next-rtl" />
		</MatButton>

		<MatButton design={ButtonDesign.Icon} on:click={() => updatePage(page + 1)}>
			<Icon icon="ooui:next-ltr" />
		</MatButton>
	</footer>
</PageLayout>

<style>
	div {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, max-content));
	}

	footer {
		display: flex;
		justify-content: space-between;
	}
</style>
