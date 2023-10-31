<script>
	import FlashingDots from '$lib/modules/ui/dots/components/FlashingDots.svelte';
	import OutlinedFormField from '$lib/modules/ui/form-field/fields/OutlineFormField.svelte';
</script>

<main class="container mx-auto mt-4 grid gap-4">
	<div class="flex gap-x-4">
		<button class="button primary raised">Foo</button>
		<button class="button primary outlined">Foo</button>
		<button class="button accent raised">Foo</button>
		<button class="button accent outlined">Foo</button>

		<div class="flex gap-x-4 items-center">
			<FlashingDots class="primary" />
			<FlashingDots class="accent" />
		</div>
	</div>

	<div class="flex gap-x-4">
		<button class="button primary raised"
			>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea officiis aliquam odio
			consequuntur distinctio dolore omnis quo necessitatibus! Neque, doloribus?</button
		>
		<a class="button primary outlined"
			>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea officiis aliquam odio
			consequuntur distinctio dolore omnis quo necessitatibus! Neque, doloribus?</a
		>
	</div>

	<div class="flex gap-x-4">
		<OutlinedFormField>
			<input type="text" />
		</OutlinedFormField>

		<OutlinedFormField class="primary">
			<input type="text" />
		</OutlinedFormField>
	</div>
</main>
