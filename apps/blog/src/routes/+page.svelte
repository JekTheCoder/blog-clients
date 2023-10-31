<script>
	import VPostPreview from '$lib/modules/posts/preview/VPostPreview.svelte';
	import MainPostPreview from '$lib/modules/posts/preview/MainPostPreview.svelte';
	import Header from '$lib/modules/ui/main-layout/Header.svelte';
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

		<MainPostPreview />

		<hr class="my-3" />

		<div class="grid grid-cols-3 gap-4">
			<!-- <VPostPreview /> -->
			<!-- <VPostPreview /> -->
			<!-- <VPostPreview /> -->
		</div>

		<a href="/blogs" class="primary button outlined w-full">
			View more
		</a>

		<footer class="flex justify-between mt-6">
			<button>prev</button>

			<fieldset>
				<input type="radio" name="page" checked />
				<input type="radio" name="page" />
				<input type="radio" name="page" />
			</fieldset>

			<button>next</button>
		</footer>
	</section>
</main>

<footer />
