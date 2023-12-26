<script lang="ts">
	import '../styles/form-field.scss';
	let klass = '';
	export { klass as class };
</script>

<label class={'form-field grid gap-1 ' + klass}>
	<slot name="label" />

	<div class="control">
		<slot />
	</div>
</label>

<style lang="scss">
	@mixin outline() {
		border-radius: var(--radius, 0.5rem);
		outline: 1px solid var(--inactive-color);

		padding: 0.2rem 0.5rem;
	}

	@mixin focus-outline() {
		outline: 2px solid var(--active-color);
	}

	.control > :global(*) {
		width: 100%;
		@include outline();

		&:focus-within {
			@include focus-outline();
		}
	}

	.gap-1 {
		gap: 0.1rem;
	}
</style>
