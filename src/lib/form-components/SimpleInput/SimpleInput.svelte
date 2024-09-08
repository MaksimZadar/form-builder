<script lang="ts">
  import { TextInput } from "carbon-components-svelte";

  export let label;
  export let placeholder;
</script>

<div class="w-full">
  <TextInput labelText={label} {placeholder} />
</div>
