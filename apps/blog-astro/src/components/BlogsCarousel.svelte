<script lang="ts">
import VPostPreview from '@/components/VPostPreview.svelte';
import RadioPaginator from '@/components/RadioPaginator.svelte';
import ViewMore from '@/components/ViewMore.svelte';
import type { BlogPreview } from 'backend/blogs';

export let pagesSize = 3;
export let blogs: BlogPreview[];

const isExact = blogs.length % pagesSize === 0;
const pages =
  Math.floor((blogs.length - 1) / pagesSize) + 1 + (isExact ? 1 : 0);

let page = 0;

function chunks<T>(array: T[], size: number): T[][] {
  const nChunks = Math.floor((array.length - 1) / size) + 1;
  const chunks: T[][] = [];

  for (let i = 0; i < nChunks; i++) {
    chunks.push(array.slice(i * size, i * size + size));
  }

  return chunks;
}
</script>

<div class="w-full overflow-hidden">
	<div class="flex transition-transform" style="transform: translateX(-{page * 100}%)">

		{#each chunks(blogs, pagesSize) as chunk, i}
			<ul class="chunk grid grid-cols-3 gap-x-2 min-w-full">
				{#each chunk as blog}
					<li>
						<VPostPreview post={blog} />
					</li>
				{/each}

				{#if !isExact && i === pages - 1}
					<li class="grid">
						<ViewMore />
					</li>
				{/if}
			</ul>
		{/each}

		{#if isExact}
			<div class="chunk grid gap-x-2 min-w-full">
				<ViewMore />
			</div>
		{/if}
	</div>
</div>

<footer class="mt-6">
	<RadioPaginator {pages} bind:page />
</footer>
