<script>
	import { FlashingDots } from 'ui/dots';
	import { OutlineFormField } from 'ui/form-field';
	import { Icon } from 'ui/icon';
</script>

<main class="container mx-auto mt-4 grid gap-4">
	<article>
		<h2>Button</h2>

		<section class="grid grid-cols-4 gap-4">
			<button class="button primary raised">Foo</button>
			<button class="button primary outlined">Foo</button>
			<button class="button accent raised">Foo</button>
			<button class="button accent outlined">Foo</button>

			<button class="button primary basic">Foo</button>
			<button class="button primary icon">
				<Icon icon="ic:baseline-home" />
			</button>
			<button class="button accent basic">Foo</button>
			<button class="button accent icon">
				<Icon icon="ic:baseline-home" />
			</button>
		</section>

		<section class="grid grid-cols-4 gap-x-4">
			<button class="button primary raised" disabled>Foo</button>
			<button class="button primary outlined" disabled>Foo</button>
			<button class="button accent raised" disabled>Foo</button>
			<button class="button accent outlined" disabled>Foo</button>

			<button class="button primary basic" disabled>Foo</button>
			<button class="button primary icon" disabled>
				<Icon icon="ic:baseline-home" />
			</button>
			<button class="button accent basic" disabled>Foo</button>
			<button class="button accent icon" disabled>
				<Icon icon="ic:baseline-home" />
			</button>
		</section>

		<section />
	</article>

	<div class="flex gap-x-4">
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
		<a class="button primary outlined" href={null}
			>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea officiis aliquam odio
			consequuntur distinctio dolore omnis quo necessitatibus! Neque, doloribus?</a
		>
	</div>

	<div class="flex gap-x-4">
		<OutlineFormField>
			<input type="text" />
		</OutlineFormField>

		<OutlineFormField>
			<input type="text" />
		</OutlineFormField>
	</div>
</main>
