<script lang="ts">
	import VPostPreview from '@/components/VPostPreview.svelte';
	import { Icon } from 'ui/icon';
	import { OutlineFormField } from 'ui/form-field';
	import type { FormEventHandler } from 'svelte/elements';
	import { Dialog } from 'ui/dialog';
	import { writable } from 'svelte/store';
	import { onMount, } from 'svelte';
	import { type PageLoad, load } from './blogs-data';

	let baseUrl: URL;
	export let serverData: PageLoad;
	export { baseUrl as url };

	const url = writable(new URL(baseUrl));


	let data = serverData;
	let settingsDialog: Dialog;

	$: {
		load($url).then(newData => {
			data = newData;			
		});
	}

	$: page = Number($url.searchParams.get('page')) ?? 0;

	function updatePage(page: number) {
		url.update(url => {
			url.searchParams.set('page', page.toString())
			return url;
		});
	}

	let timeout: NodeJS.Timeout | null = null;
	const searchHandler: FormEventHandler<HTMLInputElement> = (event) => {
		if (timeout) clearTimeout(timeout);

		const search = event.currentTarget.value;
		timeout = setTimeout(() => { 
			url.update(url => {
				url.searchParams.set('search', search)
				return url;
			});
		}, 300);
	};

	const openSettings = () => {
		settingsDialog.open();
	};

	onMount(() => {
		let changesUnsub: () => void;

		// const unsub = url.subscribe(() => {
		// 	changesUnsub = url.subscribe((url) => {
		// 		window.history.replaceState({}, '', url); 
		// 		data = load(url);
		// 	});
		// })

		return () => {
			// unsub();
			changesUnsub?.();
		};
	});
</script>

	<main class="grid gap-4">
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
	</main>

	<footer class="container mx-auto my-8 stepper">
		<button class="button icon" on:click={() => updatePage(page - 1)} disabled={page === 0}>
			<Icon icon="ooui:next-rtl" />
		</button>

		<button class="button icon" on:click={() => updatePage(page + 1)} disabled={!data.hasNext}>
			<Icon icon="ooui:next-ltr" />
		</button>
	</footer>

<Dialog bind:this={settingsDialog}>
	<header class="dialog-header">
		<p class="text-center dialog-title">Soon!</p>
	</header>

	<footer class="dialog-footer flex justify-end">
		<button class="button basic" on:click={settingsDialog.close}>Close</button>
	</footer>
</Dialog>

<style>
	.blogs {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, max-content));
	}

	.stepper {
		display: flex;
		justify-content: space-between;
	}
</style>
