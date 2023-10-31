<script lang="ts">
  let klass = '';
  export { klass as class };
</script>

<div class={'wrapper inline-block ' + klass}>
  <div class="dot-flashing-1 dot-flashing" />
  <div class="dot-flashing-2 dot-flashing" />
  <div class="dot-flashing-3 dot-flashing" />
</div>

<style lang="scss">
  $color: var(--color);
  $disabled-color: var(--disabled-color);

  $width: 10px;

  @mixin colors($theme) {
    --color: var(--#{$theme}-light-color);
    --disabled-color: var(--#{$theme}-disabled-color);
  }

  .wrapper {
    display: grid;
		width: min-content;
    grid-template-columns: repeat(3, $width);
    column-gap: 8px;
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

  @mixin point {
    position: relative;
    width: $width;
    height: $width;
    border-radius: 5px;
    animation: dot-flashing 1s infinite linear alternate;
  }

  .dot-flashing {
    @include point;
  }

  .dot-flashing-1 {
    animation-delay: 0s;
  }

  .dot-flashing-2 {
    animation-delay: 0.5s;
  }

  .dot-flashing-3 {
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
