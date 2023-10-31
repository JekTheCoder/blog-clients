<script lang="ts">
	let klass = '';
	export { klass as class };
</script>

<div class={'wrapper inline-block ' + klass}>
	<div class="dot-flashing mx-4" />
</div>

<style lang="scss">
	$color: var(--color);
	$disabled-color: var(--disabled-color);

	@mixin colors($theme) {
		--color: var(--#{$theme}-light-color);
		--disabled-color: var(--#{$theme}-disabled-color);
	}

	.wrapper {
		@include colors(primary);
	}

	.wrapper.primary {
		@include colors(primary);
	}

	.wrapper.accent {
		@include colors(accent);
	}

	.dot-flashing {
		position: relative;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		animation: dot-flashing 1s infinite linear alternate;
		animation-delay: 0.5s;
	}

	.dot-flashing::before,
	.dot-flashing::after {
		content: '';
		display: inline-block;
		position: absolute;
		top: 0;
	}
	.dot-flashing::before {
		left: -15px;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: $color;
		color: $color;
		animation: dot-flashing 1s infinite alternate;
		animation-delay: 0s;
	}
	.dot-flashing::after {
		left: 15px;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: $color;
		color: $color;
		animation: dot-flashing 1s infinite alternate;
		animation-delay: 1s;
	}

	@keyframes dot-flashing {
		0% {
			background-color: $color;
		}
		50%,
		100% {
			background-color: $disabled-color;
		}
	}
</style>
