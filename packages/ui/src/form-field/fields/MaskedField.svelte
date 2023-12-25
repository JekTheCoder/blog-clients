<script>
	import '../styles/form-field.scss';
</script>

<div class="form-field grid">
	<slot />
</div>

<style lang="scss">
	@mixin outline() {
		outline: none;

		padding: 0.2rem 0.5rem;
	}

	@mixin active-outline() {
		border-bottom: 2px solid var(--active-color);
		margin-bottom: -2px;
	}

	.form-field :global(> input) {
		background-color: transparent;
		@include outline();

		&:active,
		&:focus {
			@include active-outline();
		}
	}
</style>
