<script lang="ts">
	import type { SubCategory } from 'backend/sub-categories';

	export let subCategories: SubCategory[];
</script>

<ul>
	{#each subCategories as subCategory (subCategory.id)}
		<li>
			<a href="/blogs?subCategory={subCategory.id}" class="link">
				#{subCategory.name}
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	a.link {
		&:not(:last-of-type):after {
			content: ', ';
		}
	}

	ul {
		display: flex;
		column-gap: 0.5rem;
	}
</style>
