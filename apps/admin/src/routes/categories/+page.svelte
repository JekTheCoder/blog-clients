<script lang="ts">
	import type { PageData } from './$types';
	import { OutlineFormField } from 'ui/form-field';

	export let data: PageData;
</script>

<main class="container mx-auto">
	<form class="grid gap-4" on:submit|preventDefault>
		<OutlineFormField>
			<label for="">Name</label>
			<input type="text" required name="name" />
		</OutlineFormField>

		<div class="flex gap-x-2 justify-end">
			<button type="submit" class="button primary raised">Submit</button>
		</div>
	</form>

	<ul>
		{#each data.categories as category}
			<li>
				{category}
			</li>
		{/each}
	</ul>
</main>
