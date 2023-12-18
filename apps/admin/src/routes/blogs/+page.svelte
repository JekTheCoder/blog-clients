<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="text-3xl font-semibold mb-4">Blogs</h1>

<ul class="container mx-auto">
	{#each data.blogs as blog}
		<li class="shadow flex justify-between px-4 py-2">
			<p>
				{blog.title}
			</p>

			<div>
				<a href="/blogs/{blog.id}/images" class="link">images</a>
			</div>
		</li>
	{/each}
</ul>
