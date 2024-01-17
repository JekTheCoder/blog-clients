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

			<ul class="flex gap-x-2">
				<li>
					<a href="/blogs/{blog.id}/grouping" class="link">Grouping</a>
				</li>

				<li>
					<a href="/blogs/{blog.id}/images" class="link">images</a>
				</li>
			</ul>
		</li>
	{/each}
</ul>
