<script lang="ts">
	import VPostPreview from '$lib/modules/posts/preview/VPostPreview.svelte';
	import type { PageData } from './$types';
	import Header from '$lib/modules/ui/main-layout/Header.svelte';
	import PageLayout from '$lib/modules/ui/main-layout/PageLayout.svelte';
	import Icon from '$lib/modules/ui/icon/Icon.svelte';
	import { page as svPage } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data: PageData;
	$: page = Number($svPage.url.searchParams.get('page')) ?? 0;

	function updatePage(page: number) {
		goto(`?page=${page}`);
	}
</script>

<PageLayout>
	<Header slot="header" />

	<div class="gap-y-8 gap-x-4">
		{#each data.blogs as blog}
			<VPostPreview post={blog} />
		{/each}
	</div>

	<footer class="container mx-auto my-8" slot="footer">
		<button class="button icon" on:click={() => updatePage(page - 1)} disabled={page === 0}>
			<Icon icon="ooui:next-rtl" />
		</button>

		<button class="button icon" on:click={() => updatePage(page + 1)} disabled={!data.hasNext}>
			<Icon icon="ooui:next-ltr" />
		</button>
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
