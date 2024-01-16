<script lang="ts">
	import BaseTagPromise from '$lib/components/tags/BaseTagPromise.svelte';
	import { TagBackground } from 'domain-ui/tag';

	let pending = new Promise(() => {});
	let success = Promise.resolve();
	let error = Promise.reject();
</script>

<main class="container mx-auto mt-4 grid gap-4">
	<article>
		<h2>Promises</h2>

		<div class="grid gap-2">
			<BaseTagPromise status={pending} name="foo bar" color={TagBackground.AccentSolid} />

			<BaseTagPromise status={success} name="foo bar" color={TagBackground.PrimarySolid} />

			<BaseTagPromise status={error} name="foo bar" color={TagBackground.WarningSolid} />
		</div>
	</article>
</main>
