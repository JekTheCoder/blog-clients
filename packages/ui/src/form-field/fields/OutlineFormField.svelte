<script lang="ts">
	import '../styles/form-field.scss';
	let klass = '';
	export { klass as class };
</script>

<div class={'form-field grid ' + klass}>
	<slot />
</div>

<style lang="scss">
	@mixin outline() {
		border-radius: var(--radius, 0.5rem);
		outline: 1px solid var(--inactive-color);

		padding: 0.2rem 0.5rem;
	}

	@mixin focus-outline() {
		outline: 2px solid var(--active-color);
	}

	.form-field :global(> input) {
		@include outline();

		&:active,
		&:focus {
			@include focus-outline();
		}
	}

	.form-field :global(> textarea) {
		@include outline();

		&:active,
		&:focus {
			@include focus-outline();
		}
	}
</style>
