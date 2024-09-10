<script lang="ts">
  import { TextInput } from "carbon-components-svelte";

  export let label;
  export let placeholder;
  export let isOptional: boolean = false;
</script>

<div class="w-full">
  <TextInput
    labelText={`${label}${isOptional ? " (optional)" : ""}`}
    {placeholder}
    required={!isOptional}
  />
</div>
