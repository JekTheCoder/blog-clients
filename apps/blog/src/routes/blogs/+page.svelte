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
	import { Dialog } from 'ui/dialog';

	export let data: PageData;
	let searchParams = new URLSearchParams();
	let settingsDialog: Dialog;

	$: page = Number($svPage.url.searchParams.get('page')) ?? 0;

	function updateQuery(params: URLSearchParams) {
		goto(`?${params.toString()}`, { replaceState: true, noScroll: true, keepFocus: true });
	}

	function updatePage(page: number) {
		searchParams.set('page', page.toString());
		updateQuery(searchParams);
	}

	let timeout: NodeJS.Timeout | null = null;
	const searchHandler: FormEventHandler<HTMLInputElement> = (event) => {
		if (timeout) clearTimeout(timeout);

		const search = event.currentTarget.value;
		timeout = setTimeout(() => { searchParams.set('search', search);
			updateQuery(searchParams);
		}, 300);
	};

	const openSettings = () => {
		settingsDialog.open();
	};
</script>

<PageLayout>
	<Header slot="header" />

	<div class="grid gap-4">
		<section>
			<div class="grid grid-cols-[1fr_auto] gap-x-2">
				<search>
					<OutlineFormField>
						<svelte:fragment slot="label">Search</svelte:fragment>
						<input type="text" on:input={searchHandler} />
					</OutlineFormField>
				</search>

				<button class="button icon self-end" on:click={openSettings}>
					<Icon icon="material-symbols:settings" />
				</button>
			</div>
		</section>

		<div class="blogs gap-y-8 gap-x-4">
			{#each data.blogs as blog}
				<VPostPreview post={blog} />
			{/each}
		</div>
	</div>

	<footer class="container mx-auto my-8 stepper" slot="footer">
		<button class="button icon" on:click={() => updatePage(page - 1)} disabled={page === 0}>
			<Icon icon="ooui:next-rtl" />
		</button>

		<button class="button icon" on:click={() => updatePage(page + 1)} disabled={!data.hasNext}>
			<Icon icon="ooui:next-ltr" />
		</button>
	</footer>
</PageLayout>

<Dialog bind:this={settingsDialog}>
	<header class="dialog-header">
		<p class="text-center dialog-title">Soon!</p>
	</header>

	<footer class="dialog-footer flex justify-end">
		<button class="button basic" on:click={settingsDialog.close}>Close</button>
	</footer>
</Dialog>

<style lang="scss">
	.blogs {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, max-content));
	}

	.stepper {
		display: flex;
		justify-content: space-between;
	}
</style>
