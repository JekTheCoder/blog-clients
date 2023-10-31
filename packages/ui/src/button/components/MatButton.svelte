<script lang="ts">
  import '../styles/button.scss';
  import { ButtonDesign } from '../type';
  import type { ThemeColor } from '../../theme/type';

  export let type: HTMLButtonElement['type'] | undefined = undefined;
  export let disabled = false;

  export let color: ThemeColor | undefined | null = null;
  export let design: ButtonDesign = ButtonDesign.Basic;
</script>

<button class="button {design ?? ''} {color ?? ''}" {disabled} on:click {type}>
  <slot />
</button>

<style lang="scss">
  $disabled: var(--disabled-color);

  button.button:disabled {
    pointer-events: none;
    --color: #{$disabled};
    --hover-color: #{$disabled};
    --active-color: #{$disabled};
  }
</style>
