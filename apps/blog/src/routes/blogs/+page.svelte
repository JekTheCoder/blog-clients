<script lang="ts">
	import VPostPreview from '$lib/modules/posts/preview/VPostPreview.svelte';
	import type { PageData } from './$types';
	import Header from '$lib/modules/ui/main-layout/Header.svelte';
	import PageLayout from '$lib/modules/ui/main-layout/PageLayout.svelte';
	import Icon from '$lib/modules/ui/icon/Icon.svelte';
	import { page as svPage } from '$app/stores';
	import { goto } from '$app/navigation';
	import { OutlineFormField } from 'ui/form-field';
	import type { FormEventHandler } from 'svelte/elements';

	export let data: PageData;
	let searchParams = new URLSearchParams();

	$: page = Number($svPage.url.searchParams.get('page')) ?? 0;

	function updateQuery(params: URLSearchParams) {
		goto(`?${params.toString()}`);
	}

	function updatePage(page: number) {
		searchParams.set('page', page.toString());
		updateQuery(searchParams);
	}

	let timeout: NodeJS.Timeout | null = null;
	const searchHandler: FormEventHandler<HTMLInputElement> = (event) => {
		if (timeout) clearTimeout(timeout);

		const search = event.currentTarget.value;
		timeout = setTimeout(() => {
			searchParams.set('search', search);
			updateQuery(searchParams);
		}, 300);
	};
</script>

<PageLayout>
	<Header slot="header" />

	<div class="grid gap-4">
		<section>
			<search>
				<OutlineFormField>
					<svelte:fragment slot="label">Search</svelte:fragment>
					<input type="text" on:input={searchHandler} />
				</OutlineFormField>
			</search>
		</section>

		<div class="blogs gap-y-8 gap-x-4">
			{#each data.blogs as blog}
				<VPostPreview post={blog} />
			{/each}
		</div>
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
	.blogs {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, max-content));
	}

	footer {
		display: flex;
		justify-content: space-between;
	}
</style>
