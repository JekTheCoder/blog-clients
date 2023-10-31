<script>
	import MaskedField from '$lib/modules/form-field/fields/MaskedField.svelte';
</script>

<main class="container mx-auto h-screen">
	<form class="h-full">
		<MaskedField>
			<input type="text" name="title" placeholder="Title" />
		</MaskedField>

		<textarea name="content" />

		<div class="flex justify-end">
			<button class="button raised primary">Save</button>
		</div>
	</form>
</main>

<style>
	form {
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 1rem;
	}

	textarea {
		resize: none;
	}
</style>
